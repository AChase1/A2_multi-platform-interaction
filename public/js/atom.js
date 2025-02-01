
class AtomConstants {
    static orbitalShellColor = "#808080";
    static orbitalShellRadius = 1.5;
    static nucleusOrigin = { x: 0, y: 1.6, z: -3 };
}

AFRAME.registerComponent('atom', {
    schema: {
        numberOfOrbitalShells: { type: "number", default: 1 },
        numberOfProtons: { type: "int", default: 1 },
        numberOfNeutrons: { type: "int", default: 0 },
        isUnstable: { type: "boolean", default: false },
    },

    init: function () {
        this.destroyAtom = false;
        this.mouseEntered = false;

        this.createNucleus(1);
        if (!this.data.isUnstable) {
            this.createOrbitalShell();
            this.addElectron();
        }

        this.el.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.el.addEventListener('click', this.onMouseClick.bind(this));
    },

    createNucleus: function (nucleusRadiusScalar) {
        const nucleusGroup = document.createElement('a-entity');
        nucleusGroup.setAttribute("id", "nucleusGroup");

        // every 10 elements, increase the size of the nucleus radius 
        // to accomodate for the large number of protons
        const increments = Math.floor(this.data.numberOfProtons / 10) + 1;
        const dropletModelRadius = (increments * 0.1) * nucleusRadiusScalar;

        // create protons
        for (let i = 0; i < this.data.numberOfProtons; i++) {
            this.createNucleon(dropletModelRadius, ParticleConstants.protonColor, nucleusGroup, i);
        }

        // create neutrons
        for (let i = 0; i < this.data.numberOfNeutrons; i++) {
            this.createNucleon(dropletModelRadius, ParticleConstants.neutronColor, nucleusGroup, this.data.numberOfProtons + i);
        }

        this.el.appendChild(nucleusGroup);
        this.nucleusGroup = nucleusGroup;

        // update panel(s) with element information
        if (!this.data.isUnstable) {
            const elementPanel = document.getElementById("panel");
            const vrElementPanel = document.getElementById("vr-panel");
            if (elementPanel.components["element-panel"] != undefined && vrElementPanel.components["element-panel"] != undefined) {
                elementPanel.components["element-panel"].displayElementInfo(this.data.numberOfProtons);
                vrElementPanel.components["element-panel"].displayElementInfo(this.data.numberOfProtons);
            }
        }

    },

    createNucleon: function (dropletModelRadius, nucleonColor, nucleusGroup, index) {
        const nucleon = document.createElement("a-entity");
        nucleon.setAttribute("particle", { color: nucleonColor });
        const nucleonPosition = this.getNucleusPosition(dropletModelRadius, index, this.data.numberOfProtons + this.data.numberOfNeutrons);
        nucleon.setAttribute("position", nucleonPosition);
        nucleusGroup.appendChild(nucleon);
    },

    getNucleusPosition: function (radius, index, numParticles) {
        // generate randomly and uniformly distributed coordinates along the surface of a sphere
        // formula sourced from => https://stackoverflow.com/questions/5408276/sampling-uniformly-distributed-random-points-inside-a-spherical-volume

        // retrieve the angle from the sphere's vertical axis (polar angle)
        const phi = Math.acos(1 - 2 * (index + 1) / numParticles);

        // helps produce a more pleasing distribution
        const goldenRatio = 1 + Math.sqrt(5);

        // retrieve the angle along the horizontal plane of the sphere (azimuthal angle)
        const theta = Math.PI * goldenRatio * (index + 1);

        // calculate coordinates
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return { x: x, y: y, z: z };
    },

    createOrbitalShell: function () {
        const electronOrbitalShell = document.createElement("a-entity");

        // double the radius of the new orbital shell from the largest orbital shell radius
        const numberOfOrbitalShells = Array.from(this.el.children).filter(current => current.getAttribute("id") == "orbitalShell").length;
        let geometry = new THREE.TorusGeometry(numberOfOrbitalShells == 0 ? AtomConstants.orbitalShellRadius : AtomConstants.orbitalShellRadius * (numberOfOrbitalShells + 1), 0.015, 100);

        let material = new THREE.MeshStandardMaterial({ color: AtomConstants.orbitalShellColor });
        let mesh = new THREE.Mesh(geometry, material);
        electronOrbitalShell.setObject3D('mesh', mesh);
        this.el.appendChild(electronOrbitalShell);
        electronOrbitalShell.setAttribute("id", "orbitalShell");

        // set to current orbital shell
        this.orbitalShell = electronOrbitalShell;
    },

    tick: function () {
        this.rotateElement(this.nucleusGroup, true);
        if (!this.data.isUnstable) {
            this.rotateElement(this.orbitalShell, false);
        }
    },

    rotateElement: function (element, rotateX) {
        const rotationSpeed = 0.9;
        const rotation = element.object3D.rotation;
        if (rotateX) {
            rotation.x += rotationSpeed * (0.01);
        } else {
            rotation.y += rotationSpeed * (0.01);
        }
        element.object3D.rotation.set(rotation.x, rotation.y, rotation.z);
    },

    addElectron: function () {
        const numAttachedElectrons = Array.from(this.orbitalShell.children).filter(child => child.getAttribute("id") == "particle").length;
        let numberOfOrbitalShells = Array.from(this.el.children).filter(current => current.getAttribute("id") == "orbitalShell").length;

        // create new electron
        const newElectron = document.createElement('a-entity');
        newElectron.setAttribute('particle', { color: ParticleConstants.electronColor });

        // set to position on the orbital shell
        if (numAttachedElectrons < 1) {
            newElectron.setAttribute("position", { x: AtomConstants.orbitalShellRadius, y: 0, z: 0 });
        } else {
            // if the orbital shell has reached its maximum capacity, create a new orbital shell
            if ((Math.pow(numberOfOrbitalShells, 2) * 2) == numAttachedElectrons) {
                this.createOrbitalShell();
                numberOfOrbitalShells++;

                // move non-vr panel to be outside of the largest orbital shell
                const elementInfoPanel = document.getElementById("panel");
                elementInfoPanel.setAttribute("position", {
                    x: (numberOfOrbitalShells * AtomConstants.orbitalShellRadius) + 0.5,
                    y: 1.2,
                    z: 0,
                });
            }

            // evenly space out new electron along the orbital shell
            particleXPosition = Math.cos(ParticleConstants.attachedSpacingAngle * numAttachedElectrons) * (AtomConstants.orbitalShellRadius * numberOfOrbitalShells);
            particleYPosition = Math.sin(ParticleConstants.attachedSpacingAngle * numAttachedElectrons) * (AtomConstants.orbitalShellRadius * numberOfOrbitalShells);
            newElectron.setAttribute("position", { x: particleXPosition, y: particleYPosition, z: 0 });
        }
        this.orbitalShell.appendChild(newElectron);
    },

    resetAtom: function (nucleusRadiusScalar, playSound) {
        if (playSound) {
            const scene = document.querySelector("a-scene");
            const atomPosition = new THREE.Vector3();
            this.el.object3D.getWorldPosition(atomPosition);
            const plopSound = document.createElement('a-entity');
            plopSound.setAttribute('position', atomPosition);
            scene.appendChild(plopSound);
            plopSound.setAttribute("sound", {
                src: "#plop-sound",
                autoplay: true,
                rolloffFactor: 0.5,
                volume: 2
            });

            plopSound.addEventListener('sound-ended', () => {
                plopSound.parentNode.removeChild(plopSound);
            });
        }

        // remove existing nucleus elements
        const nucleusGroup = this.el.querySelector('#nucleusGroup');
        if (nucleusGroup) {
            this.el.removeChild(nucleusGroup);
        }

        // create a new nucleus
        this.createNucleus(nucleusRadiusScalar);
    },

    removeElectron: function () {
        // remove last attached electron
        const orbitalShells = Array.from(this.el.children).filter(child => child.getAttribute("id") == "orbitalShell");
        let attachedParticles = [];
        for (i = 0; i < orbitalShells.length; i++) {
            const particles = Array.from(orbitalShells[i].children).filter(child => child.getAttribute("id") == "particle");
            attachedParticles = attachedParticles.concat(particles);
        }
        const lastAttachedElectron = attachedParticles[attachedParticles.length - 1];
        lastAttachedElectron.parentNode.removeChild(lastAttachedElectron);

        // remove orbital shell if removed electron was the last one on the orbital shell
        if (orbitalShells.length > 1 && (Math.pow(orbitalShells.length - 1, 2) * 2) == attachedParticles.length - 1) {
            this.orbitalShell.parentNode.removeChild(this.orbitalShell);
            const orbitalShells = Array.from(this.el.children).filter(child => child.getAttribute("id") == "orbitalShell");
            this.orbitalShell = orbitalShells[orbitalShells.length - 1];
        }
    },

    adjustNeutronCount: function () {
        const elementInfo = elementInfoDictionary[this.data.numberOfProtons];
        this.data.numberOfNeutrons = elementInfo["mass"] - this.data.numberOfProtons;
    },

    changeElement: function (addProton) {
        addProton ? this.data.numberOfProtons++ : this.data.numberOfProtons--;
        this.adjustNeutronCount();
    },

    splitAtom: function () {

        // play fission explosion sound
        const scene = document.querySelector("a-scene");
        const atomPosition = new THREE.Vector3();
        this.el.object3D.getWorldPosition(atomPosition);
        const explosionSound = document.createElement('a-entity');
        explosionSound.setAttribute('position', atomPosition);
        scene.appendChild(explosionSound);
        explosionSound.setAttribute("sound", {
            src: "#fission-explosion",
            autoplay: true,
            rolloffFactor: 0.5,
        });

        explosionSound.addEventListener('sound-ended', () => {
            explosionSound.parentNode.removeChild(explosionSound);
        });

        // create fission explosion
        const newParticle = document.createElement('a-entity');
        newParticle.setAttribute('particle', { color: ParticleConstants.nuclearFissionColor });
        newParticle.setAttribute('animation', {
            property: 'scale',
            to: { x: 10, y: 10, z: 10 },
            from: { x: 1, y: 1, z: 1 },
            dur: 500,
            easing: 'easeOutQuad'
        });

        this.el.appendChild(newParticle);

        // Add event listener to delete the particle after the animation ends
        newParticle.addEventListener('animationcomplete', function () {
            if (newParticle.parentElement.getAttribute("id") != "main-atom") {
                newParticle.parentElement.parentNode.removeChild(newParticle.parentElement);
            }
            newParticle.parentNode.removeChild(newParticle);
        });
    },

    onMouseEnter: function () {
        if (!this.mouseEntered && this.data.numberOfProtons >= 2) {
            this.resetAtom(2, false);
            this.mouseEntered = true;
        }
    },

    onMouseLeave: function () {
        if (this.mouseEntered) {
            this.resetAtom(1, false);
            this.mouseEntered = false;
        }
    },

    onMouseClick: function () {
        if (this.data.isUnstable) {

            // create ejected particle
            const scene = document.querySelector("a-scene");
            const newParticle = document.createElement("a-entity");
            newParticle.setAttribute("particle", {
                color: ParticleConstants.protonColor,
                movingToCamera: true,
            });
            const atomPosition = new THREE.Vector3();
            this.el.object3D.getWorldPosition(atomPosition);
            newParticle.setAttribute("position", atomPosition);
            scene.appendChild(newParticle);

            // create fission explosion
            this.destroyAtom = true;
            this.splitAtom();

            return;
        }

        const camera = document.getElementById("pov_cam");
        const cameraPosition = new THREE.Vector3();
        camera.object3D.getWorldPosition(cameraPosition);
        const selectedParticle = Array.from(camera.children).filter(child => child.getAttribute("id") == "particle")[0];

        // remove proton from main atom
        // when clicking atom with no selected electron
        if (selectedParticle == undefined && this.data.numberOfProtons > 1) {
            this.changeElement(false);
            this.resetAtom(1, false);
            this.removeElectron();
            this.destroyAtom = false;
            this.splitAtom();
            return;
        }

        // add a proton to the main atom
        if (selectedParticle != undefined) {
            camera.removeChild(selectedParticle);
            const newParticle = document.createElement("a-entity");
            newParticle.setAttribute("particle", {
                color: ParticleConstants.protonColor,
                movingToAtom: true,
            });
            newParticle.setAttribute("position", cameraPosition);
            const scene = document.querySelector("a-scene");
            scene.appendChild(newParticle);
        }
    }
});
