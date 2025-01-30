class ElectronConstants {
    static radius = 0.1;
    static color = "#fafa37";
    static glowIntensity = 1.5;
    static audioSrc = "assets/sounds/electron_hum.mp3";
    static startingPosition = { x: 0, y: 1.9, z: -2 };
    static attachedSpacingAngle = 10 * (Math.PI / 180);
    static cameraOffsetPosition = { x: 0.7, y: -0.6, z: -1.0 };
}

AFRAME.registerComponent('electron', {
    schema: {
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
        console.log("Electron mesh created");

        // attach hum audio to electron's position
        this.audio = document.createElement("a-sound");
        this.audio.setAttribute("src", this.data.audioSrc);
        this.audio.setAttribute("autoplay", "true");
        this.audio.setAttribute("loop", "true");
        this.el.appendChild(this.audio);

        this.el.setAttribute("class", "interactive");
        this.el.setAttribute("id", "electron");

        // add listener for electron interaction
        this.el.addEventListener('click', () => attachToCamera(this.el));
    },
});

function attachToCamera(electron) {
    const camera = document.getElementById("pov_cam");
    if (camera == null) return;
    camera.appendChild(electron);
    electron.setAttribute("position", ElectronConstants.cameraOffsetPosition);
};