AFRAME.registerComponent('element-info', {
    init: function () {
        this.createPanel();
        this.isSelected = false;
        this.angle = 0;
    },

    createPanel: function () {
        this.infoPanel = document.createElement("a-entity");
        const geometry = new THREE.BoxGeometry(1.2, 1.6, 0.05);
        const material = new THREE.MeshStandardMaterial({ color: '#ffffff' });
        const mesh = new THREE.Mesh(geometry, material);
        this.infoPanel.setObject3D('mesh', mesh);
        this.createPanelBorder();

        this.el.appendChild(this.infoPanel);

        this.el.setAttribute('class', 'interactive');

        this.el.setAttribute("position", {
            x: -2.5,
            y: 1.2,
            z: 0
        });


    },

    createPanelBorder: function () {
        this.panelBorder = document.createElement("a-entity");

        // Create a shape for the frame
        const shape = new THREE.Shape();
        shape.moveTo(-0.55, -0.75);
        shape.lineTo(0.55, -0.75);
        shape.lineTo(0.55, 0.75);
        shape.lineTo(-0.55, 0.75);
        shape.lineTo(-0.55, -0.75);

        // Create a hole in the center
        const hole = new THREE.Path();
        hole.moveTo(-0.45, -0.65);
        hole.lineTo(0.45, -0.65);
        hole.lineTo(0.45, 0.65);
        hole.lineTo(-0.45, 0.65);
        hole.lineTo(-0.45, -0.65);
        shape.holes.push(hole);

        // Create geometry from the shape with extrusion
        const extrudeSettings = {
            depth: 0.05, // Depth of the extrusion
            bevelEnabled: false
        };

        // Create geometry from the shape
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshStandardMaterial({ color: '#ff0000' });
        const mesh = new THREE.Mesh(geometry, material);
        this.panelBorder.setObject3D('mesh', mesh);
        this.panelBorder.setAttribute("position", {
            x: 0,
            y: 0,
            z: 0.05
        })

        this.infoPanel.appendChild(this.panelBorder);
    },

    tick: function (time, timeDelta) {
        const camera = document.querySelector('[camera]');
        if (camera) {
            const cameraPosition = new THREE.Vector3();
            camera.object3D.getWorldPosition(cameraPosition);

            // Make the panel face the camera
            this.el.object3D.lookAt(cameraPosition);
        }
    }
});