const elementInfoDictionary = {
    1: elementMap("Hydrogen", "H", "Nonmetal", 1.008, "The simplest and most abundant element in the universe."),
    2: elementMap("Helium", "He", "Noble Gas", 4.002, "The least reactive, with the lowest melting point and boiling point of all elements."),
    3: elementMap("Lithium", "Li", "Alkali Metal", 6.94, "A metal that burns white, and was one of three elements (hydrogen and helium) produced by the Big Bang."),
    4: elementMap("Beryllium", "Be", "Alkaline Earth Metal", 9.012, "A lightweight metal where it's dust is toxic, its transparent to x-rays, and is used to build spacecrafts."),
    5: elementMap("Boron", "B", "Metalloid", 10.81, "An element essential for the growth of plants and is used in nuclear reactions."),
    6: elementMap("Carbon", "C", "Nonmetal", 12.011, "A lightweight metal where its dust is toxic, its transparent to x-rays, and is used to build spacecrafts."),
    7: elementMap("Nitrogen", "N", "Nonmetal", 14.007, "A colorless, odorless gas that makes up 78% of the Earth's atmosphere."),
    8: elementMap("Oxygen", "O", "Nonmetal", 15.999, "A highly reactive nonmetal and oxidizing agent that readily forms oxides with most elements."),
    9: elementMap("Fluorine", "F", "Halogen", 18.998, "The most reactive and electronegative of all the elements."),
    10: elementMap("Neon", "Ne", "Noble Gas", 20.180, "A colorless, odorless, inert monatomic gas under standard conditions."),
    11: elementMap("Sodium", "Na", "Alkali Metal", 22.990, "A soft, silvery-white, highly reactive metal."),
    12: elementMap("Magnesium", "Mg", "Alkaline Earth Metal", 24.305, "A shiny gray solid that is used in lightweight alloys."),
    13: elementMap("Aluminum", "Al", "Post-transition Metal", 26.982, "A silvery-white, soft, nonmagnetic, ductile metal."),
    14: elementMap("Silicon", "Si", "Metalloid", 28.085, "A hard and brittle crystalline solid with a blue-gray metallic luster."),
    15: elementMap("Phosphorus", "P", "Nonmetal", 30.974, "A reactive nonmetal that exists in several allotropic forms."),
    16: elementMap("Sulfur", "S", "Nonmetal", 32.06, "A bright yellow crystalline solid at room temperature."),
    17: elementMap("Chlorine", "Cl", "Halogen", 35.45, "A yellow-green gas that combines directly with nearly all elements."),
    18: elementMap("Argon", "Ar", "Noble Gas", 39.948, "A colorless, odorless, inert gas that makes up 0.93% of the Earth's atmosphere."),
    19: elementMap("Potassium", "K", "Alkali Metal", 39.098, "A silvery-white metal that is soft enough to be cut with a knife."),
    20: elementMap("Calcium", "Ca", "Alkaline Earth Metal", 40.078, "A reactive metal that forms a dark oxide-nitride layer when exposed to air."),
    21: elementMap("Scandium", "Sc", "Transition Metal", 44.956, "A soft metal that develops a yellow or pinkish cast when exposed to air."),
    22: elementMap("Titanium", "Ti", "Transition Metal", 47.867, "A lustrous transition metal with a silver color, low density, and high strength."),
    23: elementMap("Vanadium", "V", "Transition Metal", 50.942, "A hard, silvery-grey, ductile, and malleable transition metal."),
    24: elementMap("Chromium", "Cr", "Transition Metal", 51.996, "A steely-grey, lustrous, hard, and brittle transition metal."),
    25: elementMap("Manganese", "Mn", "Transition Metal", 54.938, "A hard, brittle, silvery metal often found in minerals in combination with iron."),
    26: elementMap("Iron", "Fe", "Transition Metal", 55.845, "A metal in the first transition series and by mass the most common element on Earth."),
    27: elementMap("Cobalt", "Co", "Transition Metal", 58.933, "A hard, lustrous, silver-gray metal."),
    28: elementMap("Nickel", "Ni", "Transition Metal", 58.693, "A silvery-white lustrous metal with a slight golden tinge."),
    29: elementMap("Copper", "Cu", "Transition Metal", 63.546, "A soft, malleable, and ductile metal with very high thermal and electrical conductivity."),
    30: elementMap("Zinc", "Zn", "Transition Metal", 65.38, "A slightly brittle metal at room temperature and has a blue-silvery appearance when oxidation is removed."),
    31: elementMap("Gallium", "Ga", "Post-transition Metal", 69.723, "A soft, silvery metal that melts at slightly above room temperature."),
    32: elementMap("Germanium", "Ge", "Metalloid", 72.63, "A lustrous, hard, grayish-white metalloid in the carbon group."),
    33: elementMap("Arsenic", "As", "Metalloid", 74.922, "A metalloid that occurs in many minerals, usually in combination with sulfur and metals."),
    34: elementMap("Selenium", "Se", "Nonmetal", 78.971, "A nonmetal with properties that are intermediate between the elements above and below in the periodic table."),
    35: elementMap("Bromine", "Br", "Halogen", 79.904, "A red-brown liquid at room temperature that evaporates readily to form a similarly colored gas."),
    36: elementMap("Krypton", "Kr", "Noble Gas", 83.798, "A colorless, odorless, tasteless noble gas."),
    37: elementMap("Rubidium", "Rb", "Alkali Metal", 85.468, "A soft, silvery-white metallic element."),
    38: elementMap("Strontium", "Sr", "Alkaline Earth Metal", 87.62, "A soft, silver-yellow, alkaline earth metal."),
    39: elementMap("Yttrium", "Y", "Transition Metal", 88.906, "A silvery-metallic transition metal."),
    40: elementMap("Zirconium", "Zr", "Transition Metal", 91.224, "A lustrous, grey-white, strong transition metal."),
    41: elementMap("Niobium", "Nb", "Transition Metal", 92.906, "A soft, grey, ductile transition metal."),
    42: elementMap("Molybdenum", "Mo", "Transition Metal", 95.95, "A silvery metal with a gray cast."),
    43: elementMap("Technetium", "Tc", "Transition Metal", 98, "A silvery-gray radioactive metal."),
    44: elementMap("Ruthenium", "Ru", "Transition Metal", 101.07, "A rare transition metal belonging to the platinum group."),
    45: elementMap("Rhodium", "Rh", "Transition Metal", 102.91, "A rare, silvery-white, hard, corrosion-resistant, and chemically inert transition metal."),
    46: elementMap("Palladium", "Pd", "Transition Metal", 106.42, "A rare and lustrous silvery-white metal."),
    47: elementMap("Silver", "Ag", "Transition Metal", 107.87, "A soft, white, lustrous transition metal."),
    48: elementMap("Cadmium", "Cd", "Transition Metal", 112.41, "A soft, bluish-white metal."),
    49: elementMap("Indium", "In", "Post-transition Metal", 114.82, "A post-transition metal that makes up 0.21 parts per million of the Earth's crust."),
    50: elementMap("Tin", "Sn", "Post-transition Metal", 118.71, "A silvery metal that characteristically has a faint yellow hue."),
    51: elementMap("Antimony", "Sb", "Metalloid", 121.76, "A lustrous gray metalloid."),
    52: elementMap("Tellurium", "Te", "Metalloid", 127.60, "A brittle, mildly toxic, rare, silver-white metalloid."),
    53: elementMap("Iodine", "I", "Halogen", 126.90, "A chemical element with the symbol I and atomic number 53."),
    54: elementMap("Xenon", "Xe", "Noble Gas", 131.29, "A colorless, dense, odorless noble gas."),
    55: elementMap("Cesium", "Cs", "Alkali Metal", 132.91, "A soft, gold-colored metal that is the most electropositive and alkaline element."),
    56: elementMap("Barium", "Ba", "Alkaline Earth Metal", 137.33, "A soft, silvery alkaline earth metal."),
    57: elementMap("Lanthanum", "La", "Lanthanide", 138.91, "A soft, ductile, silvery-white metal."),
    58: elementMap("Cerium", "Ce", "Lanthanide", 140.12, "A soft, ductile, and silvery-white metal that tarnishes when exposed to air."),
    59: elementMap("Praseodymium", "Pr", "Lanthanide", 140.91, "A soft, silvery, malleable and ductile metal."),
    60: elementMap("Neodymium", "Nd", "Lanthanide", 144.24, "A soft, silvery metal that tarnishes in air."),
    61: elementMap("Promethium", "Pm", "Lanthanide", 145, "A radioactive metal."),
    62: elementMap("Samarium", "Sm", "Lanthanide", 150.36, "A moderately hard silvery metal that readily oxidizes in air."),
    63: elementMap("Europium", "Eu", "Lanthanide", 151.96, "A moderately hard, silvery metal that readily oxidizes in air."),
    64: elementMap("Gadolinium", "Gd", "Lanthanide", 157.25, "A silvery-white metal that is malleable and ductile."),
    65: elementMap("Terbium", "Tb", "Lanthanide", 158.93, "A silvery-white, rare earth metal that is malleable, ductile, and soft enough to be cut with a knife."),
    66: elementMap("Dysprosium", "Dy", "Lanthanide", 162.50, "A rare earth element with a metallic, bright silver luster."),
    67: elementMap("Holmium", "Ho", "Lanthanide", 164.93, "A rare earth element with a metallic, bright silver luster."),
    68: elementMap("Erbium", "Er", "Lanthanide", 167.26, "A silvery-white solid metal when artificially isolated."),
    69: elementMap("Thulium", "Tm", "Lanthanide", 168.93, "A bright, silvery-gray metal."),
    70: elementMap("Ytterbium", "Yb", "Lanthanide", 173.05, "A soft, malleable, and ductile chemical element."),
    71: elementMap("Lutetium", "Lu", "Lanthanide", 174.97, "A silvery-white metal, and the last element in the lanthanide series."),
    72: elementMap("Hafnium", "Hf", "Transition Metal", 178.49, "A lustrous, silvery-gray, tetravalent transition metal."),
    73: elementMap("Tantalum", "Ta", "Transition Metal", 180.95, "A rare, hard, blue-gray, lustrous transition metal."),
    74: elementMap("Tungsten", "W", "Transition Metal", 183.84, "A rare metal found naturally on Earth almost exclusively combined with other elements."),
    75: elementMap("Rhenium", "Re", "Transition Metal", 186.21, "A silvery-gray, heavy, third-row transition metal."),
    76: elementMap("Osmium", "Os", "Transition Metal", 190.23, "A hard, brittle, bluish-white transition metal."),
    77: elementMap("Iridium", "Ir", "Transition Metal", 192.22, "A very hard, brittle, silvery-white transition metal."),
    78: elementMap("Platinum", "Pt", "Transition Metal", 195.08, "A dense, malleable, ductile, highly unreactive, precious, silverish-white transition metal."),
    79: elementMap("Gold", "Au", "Transition Metal", 196.97, "A bright, slightly reddish yellow, dense, soft, malleable, and ductile metal."),
    80: elementMap("Mercury", "Hg", "Transition Metal", 200.59, "A heavy, silvery d-block element, the only metallic element that is liquid at standard conditions for temperature and pressure."),
    81: elementMap("Thallium", "Tl", "Post-transition Metal", 204.38, "A soft gray post-transition metal that is not found free in nature."),
    82: elementMap("Lead", "Pb", "Post-transition Metal", 207.2, "A heavy metal that is denser than most common materials."),
    83: elementMap("Bismuth", "Bi", "Post-transition Metal", 208.98, "A brittle metal with a silvery white color when freshly produced, but surface oxidation can give it a pink tinge."),
    84: elementMap("Polonium", "Po", "Metalloid", 209, "A rare and highly radioactive metal with no stable isotopes."),
    85: elementMap("Astatine", "At", "Halogen", 210, "A rare and radioactive element."),
    86: elementMap("Radon", "Rn", "Noble Gas", 222, "A radioactive, colorless, odorless, tasteless noble gas."),
    87: elementMap("Francium", "Fr", "Alkali Metal", 223, "A highly radioactive metal that decays into astatine, radium, and radon."),
    88: elementMap("Radium", "Ra", "Alkaline Earth Metal", 226, "A radioactive metal that is found in trace amounts in uranium and thorium ores."),
    89: elementMap("Actinium", "Ac", "Actinide", 227, "A soft, silvery-white radioactive metal."),
    90: elementMap("Thorium", "Th", "Actinide", 232.04, "A weakly radioactive metallic chemical element."),
    91: elementMap("Protactinium", "Pa", "Actinide", 231.04, "A dense, silvery-gray actinide metal."),
    92: elementMap("Uranium", "U", "Actinide", 238.03, "A silvery-grey metal in the actinide series of the periodic table."),
    93: elementMap("Neptunium", "Np", "Actinide", 237, "A radioactive actinide metal."),
    94: elementMap("Plutonium", "Pu", "Actinide", 244, "A radioactive chemical element with a silvery-gray appearance."),
    95: elementMap("Americium", "Am", "Actinide", 243, "A radioactive metal that is used in smoke detectors."),
    96: elementMap("Curium", "Cm", "Actinide", 247, "A hard, dense, silvery metal with a high melting point."),
    97: elementMap("Berkelium", "Bk", "Actinide", 247, "A radioactive metallic element."),
    98: elementMap("Californium", "Cf", "Actinide", 251, "A radioactive metal that is used in neutron sources."),
    99: elementMap("Einsteinium", "Es", "Actinide", 252, "A synthetic element with a metallic appearance."),
    100: elementMap("Fermium", "Fm", "Actinide", 257, "A synthetic element with a metallic appearance."),
    101: elementMap("Mendelevium", "Md", "Actinide", 258, "A synthetic element with a metallic appearance."),
    102: elementMap("Nobelium", "No", "Actinide", 259, "A synthetic element with a metallic appearance."),
    103: elementMap("Lawrencium", "Lr", "Actinide", 262, "A synthetic element with a metallic appearance."),
    104: elementMap("Rutherfordium", "Rf", "Transition Metal", 267, "A synthetic element with a metallic appearance."),
    105: elementMap("Dubnium", "Db", "Transition Metal", 270, "A synthetic element with a metallic appearance."),
    106: elementMap("Seaborgium", "Sg", "Transition Metal", 271, "A synthetic element with a metallic appearance."),
    107: elementMap("Bohrium", "Bh", "Transition Metal", 270, "A synthetic element with a metallic appearance."),
    108: elementMap("Hassium", "Hs", "Transition Metal", 277, "A synthetic element with a metallic appearance."),
    109: elementMap("Meitnerium", "Mt", "Transition Metal", 278, "A synthetic element with a metallic appearance."),
    110: elementMap("Darmstadtium", "Ds", "Transition Metal", 281, "A synthetic element with a metallic appearance."),
    111: elementMap("Roentgenium", "Rg", "Transition Metal", 282, "A synthetic element with a metallic appearance."),
    112: elementMap("Copernicium", "Cn", "Transition Metal", 285, "A synthetic element with a metallic appearance."),
    113: elementMap("Nihonium", "Nh", "Post-transition Metal", 286, "A synthetic element with a metallic appearance."),
    114: elementMap("Flerovium", "Fl", "Post-transition Metal", 289, "A synthetic element with a metallic appearance."),
    115: elementMap("Moscovium", "Mc", "Post-transition Metal", 290, "A synthetic element with a metallic appearance."),
    116: elementMap("Livermorium", "Lv", "Post-transition Metal", 293, "A synthetic element with a metallic appearance."),
    117: elementMap("Tennessine", "Ts", "Halogen", 294, "A synthetic element with a metallic appearance."),
    118: elementMap("Oganesson", "Og", "Noble Gas", 294, "A synthetic element with a metallic appearance."),
}

function elementMap(name, symbol, category, mass, description) {
    return {
        "name": name,
        "symbol": symbol,
        "category": category,
        "mass": mass,
        "description": description,
    }
}

class PanelConstants {
    static fontColor = '#000000';
    static textWidth = 0.8;
}

AFRAME.registerComponent('element-panel', {
    init: function () {
        this.createPanel();
        this.isSelected = false;
        this.angle = 0;
    },

    createPanel: function () {
        this.backgroundPanel = document.createElement("a-entity");
        const geometry = new THREE.BoxGeometry(1.2, 1.6, 0.05);
        const material = new THREE.MeshStandardMaterial({ color: '#ffffff' });
        const mesh = new THREE.Mesh(geometry, material);
        this.backgroundPanel.setObject3D('mesh', mesh);
        this.createPanelBorder();

        this.el.appendChild(this.backgroundPanel);

        this.el.setAttribute("position", {
            x: -2.5,
            y: 1.2,
            z: 0
        });

        this.displayElementInfo(1);
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

        this.backgroundPanel.appendChild(this.panelBorder);
    },

    defineText: function (value, position, scale) {
        const text = document.createElement("a-entity");
        text.setAttribute("id", "element-text");

        text.setAttribute("text", {
            value: value,
            color: PanelConstants.fontColor,
            width: PanelConstants.textWidth,
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

    tick: function () {
        const camera = document.getElementById('pov_cam');
        if (camera) {
            const cameraPosition = new THREE.Vector3();
            camera.object3D.getWorldPosition(cameraPosition);

            // Make the panel face the camera
            this.el.object3D.lookAt(cameraPosition);
        }
    }
});