class ParticleConstants {
    static protonColor = "#3dadf2";
    static neutronColor = "#f23a29";
    static electronColor = "#fafa37";
    static nuclearFissionColor = "#f2cd13";
    static audioSrc = "assets/sounds/electron_hum.mp3";
    static startingPosition = { x: 0, y: 1.9, z: -2 };
    static attachedSpacingAngle = 10 * (Math.PI / 180);
    static cameraOffsetPosition = { x: 0.7, y: -0.6, z: -1.0 };
}

AFRAME.registerComponent('particle', {
    schema: {
        radius: { type: "number", default: 0.1 },
        color: { type: "color" },
        position: { type: "vec3", default: { x: 0, y: 0, z: 0 } },
        glowIntensity: { type: "number", default: 1.5 },
        movingToAtom: { type: "boolean", default: false },
        movingToCamera: { type: "boolean", default: false },
    },

    init: function () {
        // create 3D particle (sphere)
        this.geometry = new THREE.SphereGeometry(this.data.radius, 32, 32);
        this.material = new THREE.MeshStandardMaterial({ color: this.data.color, emissive: this.data.color, emissiveIntensity: this.data.glowIntensity });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute("class", "interactive");
        this.el.setAttribute("id", "particle");
    },

    // handle motion of particle 
    tick: function () {
        if (this.data.movingToCamera) {
            this.moveToCamera();
        }

        if (this.data.movingToAtom) {
            this.moveToAtom();
        }
    },

    moveToCamera: function () {
        const camera = document.getElementById("pov_cam");
        const cameraPosition = camera.getAttribute("position");
        const ejectedParticlePosition = this.el.getAttribute("position");

        const distance = ejectedParticlePosition.distanceTo(cameraPosition);

        if (distance < 0.5) {
            // attach to camera
            this.data.movingToCamera = false;
            camera.appendChild(this.el);
            this.el.setAttribute("position", ParticleConstants.cameraOffsetPosition);
            return;
        }

        this.updateParticlePosition(cameraPosition, ejectedParticlePosition);
    },

    moveToAtom: function () {
        const atom = document.getElementById("main-atom");
        const atomPosition = new THREE.Vector3();
        atom.object3D.getWorldPosition(atomPosition);

        const selectedParticlePosition = this.el.getAttribute("position");

        const distance = selectedParticlePosition.distanceTo(atomPosition);

        if (distance < 0.1) {
            // attach to atom, add +1 proton to atom
            this.data.movingToAtom = false;
            this.el.parentNode.removeChild(this.el);
            atom.components["atom"].changeElement(true);
            atom.components["atom"].resetAtom(1, true);
            atom.components["atom"].addElectron();
            return;
        }

        this.updateParticlePosition(atomPosition, selectedParticlePosition);
    },

    updateParticlePosition: function (destinationPosition, currentPosition) {
        const direction = new THREE.Vector3();
        direction.subVectors(destinationPosition, currentPosition).normalize();
        const velocity = new THREE.Vector3();
        velocity.addScaledVector(direction, 10);
        currentPosition.addScaledVector(velocity, 0.01);
        this.el.setAttribute("position", currentPosition);
    }
});
