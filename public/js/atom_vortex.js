AFRAME.registerComponent('atom-vortex', {
    init: function () {
        this.numberOfAtoms = 255;

        for (let i = 0; i < this.numberOfAtoms; i++) {
            const newAtom = document.createElement("a-entity");
            newAtom.setAttribute("atom", {
                numOrbitalShells: 0,
                nucleusRadius: 0.1,
                isUnstable: true,
            });

            // Generate random position inside the volume of a transparent sphere where y > 0
            const position = this.getRandomPositionInSphere(3, 20);
            newAtom.setAttribute("position", position);

            // Debug log to verify the position
            console.log(`Atom ${i} position:`, position);

            this.el.appendChild(newAtom);
        }

        this.el.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: true,
            dur: 150000,
            easing: "linear"
        });
    },

    getRandomPositionInSphere: function (min, max) {
        let x, y, z;

        do {
            x = (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? 1 : -1);
            y = Math.random() * max;
            z = (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? 1 : -1);
        } while (x * x + y * y + z * z > max * max || x * x + y * y + z * z < min * min);

        return { x: x, y: y, z: z };
    }
});