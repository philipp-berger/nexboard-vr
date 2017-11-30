AFRAME.registerComponent('scene-init', {
  init: function () {
    console.log(this.el)

    var color = new THREE.Color( 0xffffff );
    console.log(this.el.renderer)
    console.log(this.el.object3DMap)

    console.log(this.el.renderer.getClearColor())
    this.el.renderer.setClearColor(color, 0.5 );

    console.log(this.el.renderer.getClearColor())
    this.el.renderer.autoclear = false
    setTimeout( () => {
      // console.log(this.el.object3DMap.mesh.material)
      // console.log(this.el.object3DMap.mesh.material.map)
      // var texture = null
    }, 500)
  }
});