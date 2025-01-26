AFRAME.registerComponent('electron', {
    schema: {
        position: { type: "vec3", default: { x: 0, y: 1.9, z: -2 } },
        radius: { type: "number", default: 0.1 },
        color: { type: "color", default: "#fafa37" },
        glowIntensity: { type: "number", default: 1.5 },
        isSelected: { type: "boolean", default: false },
        audioSrc: { type: "string", default: "assets/sounds/electron_hum.mp3" },
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

            // attach electron to the camera's position and direction (if selected)
            const cameraPosition = new THREE.Vector3();
            const cameraDirection = new THREE.Vector3();
            camera.object3D.getWorldPosition(cameraPosition);
            camera.object3D.getWorldDirection(cameraDirection);
            const newElectronPosition = cameraPosition.clone().add(cameraDirection.clone().multiplyScalar(-1));
            this.el.setAttribute("position", newElectronPosition);
        }
    },


});