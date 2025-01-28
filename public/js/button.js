// On button click
document.addEventListener("DOMContentLoaded", function () {

    button.addEventListener("click", () => {
        const scene = document.querySelector("a-scene");
        const button = document.getElementById("button");
        const camera = document.getElementById("pov_cam");
        if (scene == null) return;
        if (button == null) return;
        if (camera == null) return;

        // play button click sound
        button.components.sound.playSound();

        // delete any existing electrons
        const existingElectron = Array.from(scene.children).filter(child => child.getAttribute("id") == "electron")[0];
        const selectedElectron = Array.from(camera.children).filter(child => child.getAttribute("id") == "electron")[0];

        if (existingElectron != undefined) {
            existingElectron.parentNode.removeChild(existingElectron);
        }
        if (selectedElectron != undefined) {
            selectedElectron.parentNode.removeChild(selectedElectron);
        }


        // instantiate electron
        const newElectron = document.createElement("a-entity");
        newElectron.setAttribute("electron", "");
        scene.appendChild(newElectron);
        console.log("New electron created");
    });
});