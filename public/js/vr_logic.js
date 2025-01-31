AFRAME.registerComponent("vr-logic", {

    init: function () {
        this.el.addEventListener('enter-vr', () => this.toggleVisibility(true));
        this.el.addEventListener('exit-vr', () => this.toggleVisibility(false));
    },

    toggleVisibility: function (inVR) {
        const vrPanel = document.getElementById("vr-panel");
        const panel = document.getElementById("panel");

        if (inVR) {
            console.log("test");
            vrPanel.setAttribute("visible", true);
            panel.setAttribute("visible", false);
        } else {
            vrPanel.setAttribute("visible", false);
            panel.setAttribute("visible", true);
        }
    }
});