
class AtomConstants {
    static protonColor = "#3dadf2";
    static neutronColor = "#f23a29";
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
    schema: {},

    init: function () {
        const nucleusGroup = document.createElement('a-entity');
        nucleusGroup.setAttribute("position", AtomConstants.nucleusOrigin);

        // create nucleus (3 protons and 3 neutrons)
        for (let i = 0; i < 6; i++) {
            const particleColor = i < 3 == 0 ? AtomConstants.protonColor : AtomConstants.neutronColor;
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
        electronOrbitalShell.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: true,
            dur: 5000,
            easing: "linear"
        });



        // event listener for clicking on atom
        this.el.addEventListener('click', () => {
            const electronList = Array.from(document.querySelectorAll("[id^='electron']"));
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

        });
    }
});
