AFRAME.registerComponent('atom-vortex', {

    schema: {
        numberOfAtoms: { type: "int", default: 200 },
    },

    init: function () {
        const atom = document.getElementById("main-atom");

        // create unstable oxygen atoms
        for (let i = 0; i < this.data.numberOfAtoms; i++) {
            const newAtom = document.createElement("a-entity");
            newAtom.setAttribute("class", "interactive");
            newAtom.setAttribute("atom", {
                numberOfOrbitalShells: 0,
                numberOfProtons: 8,
                numberOfNeutrons: 8,
                isUnstable: true,
            });

            // assign to a random position inside the volume of a sphere, between a min and max value
            const position = this.getRandomPositionInSphere(3, 20);
            newAtom.setAttribute("position", position);

            this.el.appendChild(newAtom);
        }

        this.el.setAttribute("position", { x: 0, y: 0, z: -3 })
        this.el.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: true,
            dur: 250000,
            easing: "linear"
        });
    },

    getRandomPositionInSphere: function (min, max) {
        let x, y, z = 0;

        // ensure the random position is between min and max values
        do {
            // (random value between min and max) * (positive or negative)
            x = (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? 1 : -1);
            y = (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? 1 : -1);
            z = (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? 1 : -1);
        } while (x * x + y * y + z * z > max * max || x * x + y * y + z * z < min * min);

        return { x: x, y: y, z: z };
    }
});