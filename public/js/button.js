// On button click
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("button");
    const scene = document.querySelector("a-scene");
    if (scene == null) {
        console.log("Cannot find the scene");
        return;
    }
    if (button == null) {
        console.log("Cannot find the button");
        return;
    }

    button.addEventListener("click", () => {

        // play button click sound
        button.components.sound.playSound();

        // delete any existing electrons
        const existingElectron = document.getElementById("interactiveElectron");
        if (existingElectron != null) {
            electronComponent = existingElectron.components.electron;
            if (!electronComponent.data.isAttached) {
                console.log("Is Attached: " + electronComponent.data.isAttached);
                existingElectron.parentNode.removeChild(existingElectron);
                console.log("Electron was destroyed");
            }
        }



        // instantiate electron
        const newElectron = document.createElement("a-entity");
        newElectron.setAttribute("id", "interactiveElectron");
        newElectron.setAttribute("class", "interactive");
        newElectron.setAttribute("electron", "");
        scene.appendChild(newElectron);
        console.log("New electron created");
    });
});