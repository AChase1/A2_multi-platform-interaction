
class AtomConstants {
    static orbitalShellColor = "#808080";
    static orbitalShellRadius = 1.5;
    static nucleusOrigin = { x: 0, y: 1.6, z: -3 };
}

AFRAME.registerComponent('atom', {
    schema: {
        numOrbitalShells: { type: "number", default: 1 },
        nucleonRadius: { type: "number", default: 0.1 },
        numProtons: { type: "int", default: 1 },
        numNeutrons: { type: "int", default: 0 },
        isUnstable: { type: "boolean", default: false },
    },

    init: function () {
        this.destroyAtom = false;
        this.createNucleus(1);
        if (!this.data.isUnstable) {
            this.createOrbitalShell();
            this.addElectron();
        }

        this.el.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.el.addEventListener('click', this.onMouseClick.bind(this));
        this.mouseEntered = false;

        //this.createCollisionBox();
    },

    createNucleon: function (dropletModelRadius, nucleonColor, nucleusGroup, index) {
        const nucleon = document.createElement("a-entity");
        const nucleonPosition = this.getNucleusPosition(dropletModelRadius, index, this.data.numProtons + this.data.numNeutrons);
        nucleon.setAttribute("particle", { color: nucleonColor });
        nucleon.setAttribute("position", nucleonPosition);
        nucleusGroup.appendChild(nucleon);
    },

    createNucleus: function (nucleusRadiusMultiple) {
        const nucleusGroup = document.createElement('a-entity');
        nucleusGroup.setAttribute("id", "nucleusGroup");
        const increments = Math.floor(this.data.numProtons / 10) + 1;
        const dropletModelRadius = (increments * 0.1) * nucleusRadiusMultiple;

        // create protons
        for (let i = 0; i < this.data.numProtons; i++) {
            this.createNucleon(dropletModelRadius, ParticleConstants.protonColor, nucleusGroup, i);
        }

        // create neutrons
        for (let i = 0; i < this.data.numNeutrons; i++) {
            this.createNucleon(dropletModelRadius, ParticleConstants.neutronColor, nucleusGroup, this.data.numProtons + i);
        }

        this.el.appendChild(nucleusGroup);
        this.el.setAttribute("class", "interactive");
        if (this.data.isUnstable) {
            this.el.setAttribute("id", "unstable-atom");
        } else {
            this.el.setAttribute("id", "main-atom");
        }

        if (!this.data.isUnstable) {
            const elementPanel = document.getElementById("panel");
            const vrElementPanel = document.getElementById("vr-panel");
            if (elementPanel.components["element-panel"] != undefined && vrElementPanel.components["element-panel"] != undefined) {
                elementPanel.components["element-panel"].displayElementInfo(this.data.numProtons);
                vrElementPanel.components["element-panel"].displayElementInfo(this.data.numProtons);
            }
        }
        this.nucleusGroup = nucleusGroup;
    },

    getNucleusPosition: function (radius, index, numParticles) {
        // Use a simple droplet model to arrange nucleons in a roughly spherical shape
        const phi = Math.acos(1 - 2 * (index + 1) / numParticles);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return { x: x, y: y, z: z };
    },

    createOrbitalShell: function () {

        const numOrbitalShells = Array.from(this.el.children).filter(current => current.getAttribute("id") == "orbitalShell").length;
        // create electron orbital shell
        const electronOrbitalShell = document.createElement("a-entity");
        let geometry = new THREE.TorusGeometry(numOrbitalShells == 0 ? AtomConstants.orbitalShellRadius : AtomConstants.orbitalShellRadius * (numOrbitalShells + 1), 0.015, 100);
        let material = new THREE.MeshStandardMaterial({ color: AtomConstants.orbitalShellColor });
        let mesh = new THREE.Mesh(geometry, material);
        electronOrbitalShell.setObject3D('mesh', mesh);
        this.el.appendChild(electronOrbitalShell);

        electronOrbitalShell.setAttribute("id", "orbitalShell");
        electronOrbitalShell.setAttribute("class", "interactive");
        this.orbitalShell = electronOrbitalShell;

    },

    createCollisionBox: function () {
        const collisionBox = document.createElement('a-entity');
        collisionBox.setAttribute('geometry', {
            primitive: 'sphere',
            radius: AtomConstants.orbitalShellRadius,
        });
        collisionBox.setAttribute('material', { opacity: 0.0 }); // Make the box invisible
        collisionBox.setAttribute('position', this.nucleusGroup.getAttribute('position'));
        collisionBox.setAttribute('class', 'interactive');
        //collisionBox.setAttribute('body', { type: 'static' }); // Enable collision detection

        this.el.appendChild(collisionBox);
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


    tick: function () {
        this.rotateElement(this.nucleusGroup, true);
        if (!this.data.isUnstable) {
            this.rotateElement(this.orbitalShell, false);
        }
    },



    addElectron: function () {
        const numAttachedParticles = Array.from(this.orbitalShell.children).filter(child => child.getAttribute("id") == "particle").length;
        let numOrbitalShells = Array.from(this.el.children).filter(current => current.getAttribute("id") == "orbitalShell").length;
        const newElectron = document.createElement('a-entity');
        newElectron.setAttribute('particle', { color: ParticleConstants.electronColor });
        if (numAttachedParticles < 1) {
            newElectron.setAttribute("position", { x: AtomConstants.orbitalShellRadius, y: 0, z: 0 });
        } else {
            if ((Math.pow(numOrbitalShells, 2) * 2) == numAttachedParticles) {
                this.createOrbitalShell();
                numOrbitalShells++;
                const elementInfoPanel = document.getElementById("panel");
                elementInfoPanel.setAttribute("position", {
                    x: (numOrbitalShells * AtomConstants.orbitalShellRadius) + 0.5,
                    y: 1.2,
                    z: 0,
                });
            }
            particleXPosition = Math.cos(ParticleConstants.attachedSpacingAngle * numAttachedParticles) * (AtomConstants.orbitalShellRadius * numOrbitalShells);
            particleYPosition = Math.sin(ParticleConstants.attachedSpacingAngle * numAttachedParticles) * (AtomConstants.orbitalShellRadius * numOrbitalShells);
            newElectron.setAttribute("position", { x: particleXPosition, y: particleYPosition, z: 0 });
            const testPos = new THREE.Vector3();
            newElectron.object3D.getWorldPosition(testPos)
            console.log(testPos);
        }
        this.orbitalShell.appendChild(newElectron);
    },

    resetAtom: function (nucleusRadiusMultiple) {

        // Remove existing nucleus elements
        const nucleusGroup = this.el.querySelector('#nucleusGroup');
        if (nucleusGroup) {
            this.el.removeChild(nucleusGroup);
        }

        this.createNucleus(nucleusRadiusMultiple);
    },

    adjustNeutronCount: function () {
        const elementInfo = elementInfoDictionary[this.data.numProtons];
        this.data.numNeutrons = elementInfo["mass"] - this.data.numProtons;
    },

    changeElement: function (addProton) {
        addProton ? this.data.numProtons++ : this.data.numProtons--;
        this.adjustNeutronCount();
    },

    removeElectron: function () {
        const orbitalShells = Array.from(this.el.children).filter(child => child.getAttribute("id") == "orbitalShell");
        let attachedParticles = [];
        for (i = 0; i < orbitalShells.length; i++) {
            const particles = Array.from(orbitalShells[i].children).filter(child => child.getAttribute("id") == "particle");
            attachedParticles = attachedParticles.concat(particles);
        }

        const lastAttachedElectron = attachedParticles[attachedParticles.length - 1];
        lastAttachedElectron.parentNode.removeChild(lastAttachedElectron);
        if (orbitalShells.length > 1 && (Math.pow(orbitalShells.length - 1, 2) * 2) == attachedParticles.length - 1) {
            this.orbitalShell.parentNode.removeChild(this.orbitalShell);
            const orbitalShells = Array.from(this.el.children).filter(child => child.getAttribute("id") == "orbitalShell");
            this.orbitalShell = orbitalShells[orbitalShells.length - 1];
        }
    },

    splitAtom: function () {
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
                console.log('destroyed');
                newParticle.parentElement.parentNode.removeChild(newParticle.parentElement);
            }
            newParticle.parentNode.removeChild(newParticle);
        });
    },

    onMouseEnter: function () {
        if (!this.mouseEntered && this.data.numProtons >= 2) {
            this.resetAtom(2);
            this.mouseEntered = true;
        }
    },

    onMouseLeave: function () {
        if (this.mouseEntered) {
            this.resetAtom(1);
            this.mouseEntered = false;
        }
    },

    onMouseClick: function () {
        if (this.data.isUnstable) {
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
            this.destroyAtom = true;
            this.splitAtom();

            return;
        }

        const camera = document.getElementById("pov_cam");
        const cameraPosition = new THREE.Vector3();
        camera.object3D.getWorldPosition(cameraPosition);
        const selectedParticle = Array.from(camera.children).filter(child => child.getAttribute("id") == "particle")[0];

        // Remove last attached electron from orbital shell
        // When clicking atom with no selected electron
        if (selectedParticle == undefined && this.data.numProtons > 1) {
            this.changeElement(false);
            this.resetAtom(1);
            this.removeElectron();
            this.destroyAtom = false;
            this.splitAtom();
            return;
        }

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
