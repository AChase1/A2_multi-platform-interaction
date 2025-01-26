// On button click
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("button");
    const scene = document.querySelector("a-scene");
    if (scene != null) {
        if (button != null) {

            button.addEventListener("click", () => {

                // play button click sound
                button.components.sound.playSound();

                // delete any existing electrons
                const existingElectron = document.getElementById("interactiveElectron");
                if (existingElectron != null) {
                    scene.removeChild(existingElectron);
                    console.log("Electron was destroyed");
                }

                // instantiate electron
                const newElectron = document.createElement("a-entity");
                newElectron.setAttribute("id", "interactiveElectron");
                newElectron.setAttribute("sound", "src:assets/sounds/electron_hum.mp3; loop:true; autoplay:true; volume:0.3");
                newElectron.setAttribute("position", "0 1.9 -2");
                newElectron.setAttribute("geometry", "primitive:sphere; radius:0.1;");
                newElectron.setAttribute("material", "color:#fafa37");
                scene.appendChild(newElectron);
                console.log("New electron created");
            });
        } else {
            console.log("Cannot find button");
        }
    } else {
        console.log("Cannot find the scene");
    }
});