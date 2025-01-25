// Button click sound
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("button");
    button != null ? button.addEventListener("click", () => button.components.sound.playSound()) : console.log("Cannot find button");
});