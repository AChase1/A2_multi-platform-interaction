AFRAME.registerComponent('atom-vortex', {
    init: function () {
        this.numberOfAtoms = 120;
        const atom = document.getElementById("main-atom");
        atom.setAttribute("position", {
            x: 0,
            y: 1.6,
            z: 0
        });
        for (let i = 0; i < this.numberOfAtoms; i++) {
            const newAtom = document.createElement("a-entity");
            newAtom.setAttribute("atom", {
                numOrbitalShells: 0,
                numProtons: 8,
                numNeutrons: 8,
                isUnstable: true,
            });

            // Generate random position inside the volume of a transparent sphere where y > 0
            const position = this.getRandomPositionInSphere(3, 20);
            newAtom.setAttribute("position", position);

            this.el.appendChild(newAtom);
        }

        this.el.appendChild(atom);
        this.el.setAttribute("position", {
            x: 0,
            y: 0,
            z: -3
        })

        this.el.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: true,
            dur: 250000,
            easing: "linear"
        });
    },

    getRandomPositionInSphere: function (min, max) {
        let x, y, z;

        do {
            x = (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? 1 : -1);
            y = (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? 1 : -1);
            z = (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? 1 : -1);
        } while (x * x + y * y + z * z > max * max || x * x + y * y + z * z < min * min);

        return { x: x, y: y, z: z };
    }
});