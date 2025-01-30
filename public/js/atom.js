
class AtomConstants {
    static protonColor = "#3dadf2";
    static neutronColor = "#f23a29";
    static orbitalShellColor = "#808080";
    static orbitalShellRadius = 1.5;
    static nucleusOrigin = { x: 0, y: 1.6, z: -3 };
    static unstableNucleusOrigin = { x: 0, y: 1.3, z: -2 };
}

AFRAME.registerComponent('atom', {
    schema: {
        numOrbitalShells: { type: "number", default: 1 },
        nucleusRadius: { type: "number", default: 0.3 },
        isUnstable: { type: "boolean", default: false },
    },

    init: function () {
        this.offsetNucleusPosition = this.data.nucleusRadius / 2;
        const randNum = Math.random();
        const unstableColorRatio = randNum < 0.5 ? 5 : 1;
        this.colorCondition = this.data.isUnstable ? unstableColorRatio : 3;
        this.createNucleus();
        if (!this.data.isUnstable) {
            this.createOrbitalShells();
        }

        this.el.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        this.el.addEventListener('click', this.onMouseClick.bind(this));
        this.mouseEntered = false;

        this.createCollisionBox();
    },

    createNucleus: function () {
        const nucleusGroup = document.createElement('a-entity');
        nucleusGroup.setAttribute("position", this.data.isUnstable ? AtomConstants.unstableNucleusOrigin : AtomConstants.nucleusOrigin);
        nucleusGroup.setAttribute("id", "nucleusGroup");

        // create nucleus (3 protons and 3 neutrons)
        for (let i = 0; i < 6; i++) {
            const particleColor = i < this.colorCondition == 0 ? AtomConstants.protonColor : AtomConstants.neutronColor;
            let particle = document.createElement("a-entity");
            let geometry = new THREE.SphereGeometry(this.data.nucleusRadius, 32, 32);
            let material = new THREE.MeshStandardMaterial({ color: particleColor, emissive: particleColor, emissiveIntensity: 1.5 });
            let mesh = new THREE.Mesh(geometry, material);
            particle.setObject3D('mesh', mesh);
            particle.setAttribute("position", this.getNucleusPosition(this.offsetNucleusPosition, i));
            particle.setAttribute("class", "interactive");
            particle.setAttribute("id", "nucleus");
            nucleusGroup.appendChild(particle);
        }

        this.el.appendChild(nucleusGroup);
        this.el.setAttribute("id", "atom");
        this.el.setAttribute("class", "interactive");

        this.nucleusGroup = nucleusGroup;
    },

    createOrbitalShells: function () {
        for (let i = 0; i < this.data.numOrbitalShells; i++) {
            // create electron orbital shell
            const electronOrbitalShell = document.createElement("a-entity");
            let geometry = new THREE.TorusGeometry(AtomConstants.orbitalShellRadius, 0.015, 100);
            let material = new THREE.MeshStandardMaterial({ color: AtomConstants.orbitalShellColor });
            let mesh = new THREE.Mesh(geometry, material);
            electronOrbitalShell.setObject3D('mesh', mesh);
            //electronOrbitalShell.setAttribute("position", AtomConstants.nucleusOrigin);
            this.el.appendChild(electronOrbitalShell);

            electronOrbitalShell.setAttribute("id", "orbitalShell");
            electronOrbitalShell.setAttribute("class", "interactive");
            electronOrbitalShell.setAttribute("position", AtomConstants.nucleusOrigin);
            this.orbitalShell = electronOrbitalShell;
        }
    },

    createCollisionBox: function () {
        const collisionBox = document.createElement('a-entity');
        collisionBox.setAttribute('geometry', {
            primitive: 'box',
            width: this.data.nucleusRadius * 4,
            height: this.data.nucleusRadius * 4,
            depth: this.data.nucleusRadius * 4
        });
        collisionBox.setAttribute('material', { opacity: 0.0 }); // Make the box invisible
        collisionBox.setAttribute('position', this.nucleusGroup.getAttribute('position'));
        collisionBox.setAttribute('class', 'collision-box');
        collisionBox.setAttribute('body', { type: 'static' }); // Enable collision detection

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

        if (this.moveTowardsCamera) {
            const camera = document.getElementById("pov_cam");
            const cameraPosition = camera.getAttribute("position");
            const offsetCameraPosition = { x: 0, y: 0, z: 0 };
            offsetCameraPosition.x = cameraPosition.x + ElectronConstants.cameraOffsetPosition.x;
            offsetCameraPosition.y = cameraPosition.y + ElectronConstants.cameraOffsetPosition.y;
            offsetCameraPosition.z = cameraPosition.z + ElectronConstants.cameraOffsetPosition.z;
            const scene = document.querySelector("a-scene");
            const newElectron = Array.from(scene.children).filter(child => child.getAttribute("id") == "electron")[0];
            const newElectronPosition = newElectron.getAttribute("position");
            const distance = newElectronPosition.distanceTo(offsetCameraPosition);

            if (distance < 0.5) {
                this.moveTowardsCamera = false;
                attachToCamera(newElectron);
                this.el.setAttribute("visible", false);
                setTimeout(() => {
                    this.el.setAttribute("visible", true);
                }, 5000);
                return;
            }

            const direction = new THREE.Vector3();
            direction.subVectors(offsetCameraPosition, newElectronPosition).normalize();
            // Update velocity based on acceleration
            const velocity = new THREE.Vector3();
            velocity.addScaledVector(direction, 0.005 * 1000);
            newElectronPosition.addScaledVector(velocity, 0.01);
            newElectron.setAttribute("position", newElectronPosition);
        }
    },

    getNucleusPosition: function (offset, index) {
        const offsetList = [
            { x: offset, y: 0, z: 0 },
            { x: -offset, y: 0, z: 0 },
            { x: 0, y: offset, z: 0 },
            { x: 0, y: -offset, z: 0 },
            { x: 0, y: 0, z: offset },
            { x: 0, y: 0, z: -offset },
        ];
        return offsetList[index];
    },

    resetAtom: function (radius, offset) {
        this.data.nucleusRadius = radius;
        this.offsetNucleusPosition = offset;

        // Remove existing nucleus elements
        const nucleusGroup = this.el.querySelector('#nucleusGroup');
        if (nucleusGroup) {
            this.el.removeChild(nucleusGroup);
        }

        this.createNucleus();
        //this.animateAtom();
    },

    onMouseEnter: function () {
        console.log("Mouse Enter");
        if (!this.mouseEntered && this.data.isUnstable) {
            this.resetAtom(0.05, 0.1);
            this.mouseEntered = true;
        }
    },

    onMouseLeave: function () {
        console.log("Mouse Leave");
        if (this.mouseEntered && this.data.isUnstable) {
            this.resetAtom(0.1, 0.05);
            this.mouseEntered = false;
        }
    },

    onMouseClick: function () {
        if (this.data.isUnstable) {
            const newElectron = document.createElement("a-entity");
            const scene = document.querySelector("a-scene");
            newElectron.setAttribute("electron", "");
            const newElectronPosition = AtomConstants.unstableNucleusOrigin;
            newElectronPosition.y -= 0.05;
            newElectron.setAttribute("position", AtomConstants.unstableNucleusOrigin);
            scene.appendChild(newElectron);
            this.moveTowardsCamera = true;
            return;
        }
        const electronList = Array.from(document.querySelectorAll("[id^='electron']"));
        const electronOrbitalShell = document.getElementById("orbitalShell");
        const camera = document.getElementById("pov_cam");
        const selectedElectron = Array.from(camera.children).filter(child => child.getAttribute("id") == "electron")[0];
        const attachedElectrons = Array.from(electronOrbitalShell.children).filter(child => child.getAttribute("id") == "electron");

        // Remove last attached electron from orbital shell
        // When clicking atom with no selected electron
        if ((selectedElectron == null || selectedElectron.isSelected == false) && electronOrbitalShell.childElementCount >= 1) {
            if (electronList != null || electronList.childElementCount > 0) {
                let lastAttachedElectron = attachedElectrons[attachedElectrons.length - 1];
                electronOrbitalShell.removeChild(lastAttachedElectron);
                attachToCamera(lastAttachedElectron);
            }
            return;
        }

        // Attach the selected electron to the orbital shell
        if (selectedElectron != null) {
            const numAttachedElectrons = electronOrbitalShell.childElementCount;

            // Offset the spacing of the electrons on the orbital shell
            if (numAttachedElectrons < 1) {
                selectedElectron.setAttribute("position", { x: AtomConstants.orbitalShellRadius, y: 0, z: 0 });
            } else {
                electronXPosition = Math.cos(ElectronConstants.attachedSpacingAngle * numAttachedElectrons) * AtomConstants.orbitalShellRadius;
                electronYPosition = Math.sin(ElectronConstants.attachedSpacingAngle * numAttachedElectrons) * AtomConstants.orbitalShellRadius;
                selectedElectron.setAttribute("position", { x: electronXPosition, y: electronYPosition, z: 0 });
            }

            electronOrbitalShell.appendChild(selectedElectron);
        }
    }
});
