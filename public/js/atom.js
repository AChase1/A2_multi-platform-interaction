const positiveCharge = "#3dadf2";
const negativeCharge = "#f23a29";

AFRAME.registerComponent('atom', {
    schema: {
    },

    init: function () {
        const nucleusOrigin = { x: 4.0, y: 1.6, z: -2 };
        const nucleusOffset = [
            { x: 4.15, y: 1.6, z: -2 },
            { x: 3.85, y: 1.6, z: -2 },
            { x: 4.0, y: 1.75, z: -2 },
            { x: 4.0, y: 1.45, z: -2 },
            { x: 4.0, y: 1.6, z: -2.15 },
            { x: 4.0, y: 1.6, z: -1.85 },
        ]

        // create nucleus
        for (let i = 0; i < 6; i++) {
            const particleColor = i < 3 == 0 ? positiveCharge : negativeCharge;
            let particle = document.createElement("a-entity");
            let geometry = new THREE.SphereGeometry(0.3, 32, 32);
            let material = new THREE.MeshStandardMaterial({ color: particleColor, emissive: particleColor, emissiveIntensity: 1.5 });
            let mesh = new THREE.Mesh(geometry, material);

            particle.setObject3D('mesh', mesh);
            const particlePosition = { x: nucleusOffset[i].x, y: nucleusOffset[i].y, z: nucleusOffset[i].z };
            particle.setAttribute("position", particlePosition);
            this.el.appendChild(particle);
        }

        // create electron orbital shell
        const electronOrbitalShell = document.createElement("a-entity");
        let geometry = new THREE.TorusGeometry(1.5, 0.025, 100);
        let material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
        let mesh = new THREE.Mesh(geometry, material);

        electronOrbitalShell.setObject3D('mesh', mesh);
        electronOrbitalShell.setAttribute("position", nucleusOrigin);
        this.el.appendChild(electronOrbitalShell);
    }
});
