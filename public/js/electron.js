class ElectronConstants {
    static radius = 0.1;
    static color = "#fafa37";
    static glowIntensity = 1.5;
    static audioSrc = "assets/sounds/electron_hum.mp3";
    static startingPosition = { x: 0, y: 1.9, z: -2 };
    static attachedSpacingAngle = 10 * (Math.PI / 180);
}

AFRAME.registerComponent('electron', {
    schema: {
        position: { type: "vec3", default: ElectronConstants.startingPosition },
        radius: { type: "number", default: ElectronConstants.radius },
        color: { type: "color", default: ElectronConstants.color },
        glowIntensity: { type: "number", default: ElectronConstants.glowIntensity },
        isSelected: { type: "boolean", default: false },
        isAttached: { type: "boolean", default: false },
        audioSrc: { type: "string", default: ElectronConstants.audioSrc },
    },

    init: function () {
        this.geometry = new THREE.SphereGeometry(this.data.radius, 32, 32);
        this.material = new THREE.MeshStandardMaterial({ color: this.data.color, emissive: this.data.color, emissiveIntensity: this.data.glowIntensity });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute("position", this.data.position);
        console.log("Electron mesh created");

        // attach hum audio to electron's position
        this.audio = document.createElement("a-sound");
        this.audio.setAttribute("src", this.data.audioSrc);
        this.audio.setAttribute("autoplay", "true");
        this.audio.setAttribute("loop", "true");
        this.el.appendChild(this.audio);

        // add listener for electron interaction
        this.el.addEventListener('click', () => {
            this.data.isSelected = true;
        });
    },

    tick: function () {
        const camera = document.getElementById("pov_cam");

        if (camera == null) {
            console.log("Cannot find camera");
            return;
        }

        if (this.data.isSelected) {
            console.log('Electron is selected');
            // attach electron to the camera's position and direction (if selected)
            const cameraPosition = new THREE.Vector3();
            const cameraDirection = new THREE.Vector3();
            camera.object3D.getWorldPosition(cameraPosition);
            camera.object3D.getWorldDirection(cameraDirection);
            const newElectronPosition = cameraPosition.clone().add(cameraDirection.clone().multiplyScalar(-1));
            this.el.setAttribute("position", newElectronPosition);
        }

        if (this.data.isAttached) {
            console.log("Electron is attached");
            const orbitalShell = document.getElementById("orbitalShell");
            const atom = document.getElementById("atom");
            if (atom == null) {
                console.log("Cannot find atom");
                return;
            }

            if (orbitalShell == null) {
                console.log("Cannot find the orbital shell's position");
                return;
            }
            // Attach the electron to the orbital shell
            if (this.el.parentNode !== orbitalShell) {
                const attachedElectrons = atom.components.atom.data.numberOfElectrons;
                console.log("Electron Count: " + attachedElectrons);
                if (attachedElectrons < 1) {
                    this.el.setAttribute("position", { x: AtomConstants.orbitalShellRadius, y: 0, z: 0 });
                } else {
                    const electronCount = attachedElectrons;
                    const electronPosition = { x: 0, y: 0, z: 0 };
                    electronPosition.x = Math.cos(ElectronConstants.attachedSpacingAngle * electronCount) * AtomConstants.orbitalShellRadius;
                    electronPosition.y = Math.sin(ElectronConstants.attachedSpacingAngle * electronCount) * AtomConstants.orbitalShellRadius;
                    this.el.setAttribute("position", electronPosition);
                }

                orbitalShell.appendChild(this.el);
                atom.components.atom.data.numberOfElectrons++;
            }
        }
    },


});