AFRAME.registerComponent('element-panel', {
    schema: {
        position: { type: "vec3", default: { x: -2.5, y: 1.2, z: 0 } }
    },

    init: function () {
        this.createBackgroundPanel();
        this.createPanelBorder();
        this.displayElementInfo(1);
    },

    createBackgroundPanel: function () {
        this.backgroundPanel = document.createElement("a-entity");
        const geometry = new THREE.BoxGeometry(1.2, 1.6, 0.05);
        const material = new THREE.MeshStandardMaterial({ color: '#ffffff' });
        const mesh = new THREE.Mesh(geometry, material);
        this.backgroundPanel.setObject3D('mesh', mesh);
        this.el.appendChild(this.backgroundPanel);
        this.el.setAttribute("position", this.data.position);
    },

    createPanelBorder: function () {
        this.panelBorder = document.createElement("a-entity");

        // create a 2D rectangle using a path
        const rectangleX = 0.55;
        const rectangleY = 0.75;
        const shape = new THREE.Shape();
        shape.moveTo(-rectangleX, -rectangleY);
        shape.lineTo(rectangleX, -rectangleY);
        shape.lineTo(rectangleX, rectangleY);
        shape.lineTo(-rectangleX, rectangleY);
        shape.lineTo(-rectangleX, -rectangleY);

        // create a smaller 2D rectangle using a path
        const borderSize = 0.1;
        const holeX = rectangleX - borderSize;
        const holeY = rectangleY - borderSize;
        const hole = new THREE.Path();
        hole.moveTo(-holeX, -holeY);
        hole.lineTo(holeX, -holeY);
        hole.lineTo(holeX, holeY);
        hole.lineTo(-holeX, holeY);
        hole.lineTo(-holeX, -holeY);

        // create a hole in the larger rectangle with the smaller one
        shape.holes.push(hole);

        // extrude the rectangle to make it 3D
        const extrudeSettings = { depth: 0.05, bevelEnabled: false };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshStandardMaterial({ color: '#ff0000' });
        const mesh = new THREE.Mesh(geometry, material);
        this.panelBorder.setObject3D('mesh', mesh);
        this.panelBorder.setAttribute("position", { x: 0, y: 0, z: 0.05 });
        this.backgroundPanel.appendChild(this.panelBorder);
    },

    displayElementInfo: function (numberOfProtons) {
        this.destroyOldInfo();

        const elementInfo = elementInfoDictionary[numberOfProtons];
        this.defineText(numberOfProtons, { x: -0.36, y: 0.52, z: 0.08 }, { x: 2.5, y: 2.5, z: 1 });
        this.defineText(elementInfo["mass"], { x: 0.3, y: 0.52, z: 0.08 }, { x: 2.5, y: 2.5, z: 1 });
        this.defineText(elementInfo["symbol"], { x: 0, y: 0.2, z: 0.08 }, { x: 8, y: 8, z: 1 });
        this.defineText(elementInfo["name"], { x: 0, y: -0.05, z: 0.08 }, { x: 4, y: 4, z: 1 });
        this.defineText(elementInfo["category"], { x: 0, y: -0.25, z: 0.08 }, { x: 2, y: 2, z: 1 });
        this.defineText(elementInfo["description"], { x: 0, y: -0.45, z: 0.08 }, { x: 1, y: 1, z: 1 });

        this.updateColors(elementInfo["category"]);
    },

    defineText: function (value, position, scale) {
        const text = document.createElement("a-entity");
        text.setAttribute("id", "element-text");
        text.setAttribute("text", {
            value: value,
            color: "#000000",
            width: 0.8,
            align: 'center'
        });
        text.setAttribute("position", position);
        text.setAttribute("scale", scale);
        this.el.appendChild(text);
    },

    destroyOldInfo: function () {
        const oldInfoElements = Array.from(this.el.children).filter(child => child.getAttribute("id") == "element-text");
        for (i = 0; i < oldInfoElements.length; i++) {
            oldInfoElements[i].parentNode.removeChild(oldInfoElements[i]);
        }
    },

    updatePanels: function (backgroundColor, borderColor) {
        this.backgroundPanel.setAttribute("material", { color: backgroundColor });
        this.panelBorder.setAttribute("material", { color: borderColor });
    },

    updateColors: function (category) {
        switch (category) {
            case "Nonmetal":
                this.updatePanels("#fefec0", "#cccc9b");
                break;
            case "Alkali Metal":
                this.updatePanels("#ffc7c7", "#cc9f9f");
                break;
            case "Alkaline Earth Metal":
                this.updatePanels("#d2d2ff", "#a7a7cc");
                break;
            case "Transition Metal":
                this.updatePanels("#b9dcff", "#95b0cc");
                break;
            case "Post-transition Metal":
                this.updatePanels("#bfffbd", "#99cc97");
                break;
            case "Metalloid":
                this.updatePanels("#dfedb9", "#afba91");
                break;
            case "Halogen":
                this.updatePanels("#cccc95", "#999970");
                break;
            case "Noble Gas":
                this.updatePanels("#ffe3ba", "#ccb695");
                break;
            case "Lanthanide":
                this.updatePanels("#b8ffff", "#93cccc");
                break;
            case "Actinide":
                this.updatePanels("#c2ffeb", "#9bccbc");
                break;
            default:
                this.updatePanels("#ffffff", "#000000");
        }
    },

    tick: function () {

        // make the panel face the camera
        const camera = document.getElementById('pov_cam');
        const cameraPosition = new THREE.Vector3();
        camera.object3D.getWorldPosition(cameraPosition);
        this.el.object3D.lookAt(cameraPosition);
    }
});