
class AtomConstants {
    static positiveColor = "#3dadf2";
    static negativeColor = "#f23a29";
    static orbitalShellRadius = 1.5;
    static nucleusOrigin = { x: 4.0, y: 1.6, z: -2 };
    static nucleusOffset = [
        { x: 0.15, y: 0, z: 0 },
        { x: -0.15, y: 0, z: 0 },
        { x: 0, y: 0.15, z: 0 },
        { x: 0, y: -0.15, z: 0 },
        { x: 0, y: 0, z: 0.15 },
        { x: 0, y: 0, z: -0.15 },
    ];
}

AFRAME.registerComponent('atom', {
    schema: {
        numberOfShells: { type: "number", default: 1 },
        numberOfElectrons: { type: "number", default: 0 },
    },

    init: function () {
        const nucleusGroup = document.createElement('a-entity');
        nucleusGroup.setAttribute("position", AtomConstants.nucleusOrigin);

        // create nucleus
        for (let i = 0; i < 6; i++) {
            const particleColor = i < 3 == 0 ? AtomConstants.positiveColor : AtomConstants.negativeColor;
            let particle = document.createElement("a-entity");
            let geometry = new THREE.SphereGeometry(0.3, 32, 32);
            let material = new THREE.MeshStandardMaterial({ color: particleColor, emissive: particleColor, emissiveIntensity: 1.5 });
            let mesh = new THREE.Mesh(geometry, material);

            particle.setObject3D('mesh', mesh);
            const particlePosition = { x: AtomConstants.nucleusOffset[i].x, y: AtomConstants.nucleusOffset[i].y, z: AtomConstants.nucleusOffset[i].z };
            particle.setAttribute("position", particlePosition);
            particle.setAttribute("class", "interactive");
            nucleusGroup.appendChild(particle);
        }

        // Add rotation animation to the nucleus group
        nucleusGroup.setAttribute("animation", {
            property: "rotation",
            to: "360 360 0",
            loop: true,
            dur: 2500, // Duration in milliseconds
            easing: "linear"
        });

        this.el.appendChild(nucleusGroup);
        this.el.setAttribute("id", "atom");

        // create electron orbital shell
        const electronOrbitalShell = document.createElement("a-entity");
        let geometry = new THREE.TorusGeometry(AtomConstants.orbitalShellRadius, 0.025, 100);
        let material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
        let mesh = new THREE.Mesh(geometry, material);

        electronOrbitalShell.setObject3D('mesh', mesh);
        electronOrbitalShell.setAttribute("position", AtomConstants.nucleusOrigin);
        this.el.appendChild(electronOrbitalShell);
        electronOrbitalShell.setAttribute("id", "orbitalShell");
        electronOrbitalShell.setAttribute("class", "interactive");

        // Add rotation animation to the orbital shell
        electronOrbitalShell.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: true,
            dur: 5000, // Duration in milliseconds
            easing: "linear"
        });



        // event listener for clicking on atom
        this.el.addEventListener('click', () => {
            const electron = document.getElementById("interactiveElectron");
            if (electron == null) {
                console.log("Electron does not exist");
                return;
            }

            if (electron.isSelected == false) {
                console.log("Electron is not selected");
                return;
            }

            electron.setAttribute("electron", { isAttached: true, isSelected: false });
            electron.setAttribute("id", "attachedElectron");

            console.log("Electron is attached to the atom");
        });
    }
});
