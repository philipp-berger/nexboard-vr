/* global AFRAME */

/**
* Handles events coming from the hand-controls.
* Determines if the entity is grabbed or released.
* Updates its position to move along the controller.
*/
AFRAME.registerComponent('show-on', {
  schema: {
    objects: {type: 'selectorAll'},
  },

  init: function () {
    let fuseTimeout = 3000;

    this.el.addEventListener('mouseenter', (event) => {
      console.log("mouseeneter", event.detail)
      var showCursor = this.data.objects.indexOf(event.detail.intersectedEl) >= 0
      this.el.setAttribute('visible', showCursor)
      // this.el.setAttribute('position', {z: -1 * (Math.abs(event.detail.intersection.distance)-0.3) })
    })

    this.el.addEventListener('mouseleave', (event) => {
      console.log("mouseleave", event.detail)
      this.el.setAttribute('visible', false)
      clearTimeout(this.fuseTimeout)
    })

    this.el.addEventListener('fusing', (event) => {
      let fusedElement = event.detail.intersectedEl
      this.fuseTimeout = setTimeout(() => {
          fusedElement.emit("clicked", {intersection: event.detail.intersection})
      }, fuseTimeout)
    })
  },

});