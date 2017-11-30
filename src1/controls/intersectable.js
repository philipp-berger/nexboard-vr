AFRAME.registerComponent('intersectable', {
  // dependencies: ['raycaster'],
  schema: {
    hands: {type: 'selector'},
    canvas: {default: ''},
    reactComponent: {default: null},
  },
  init: function () {
    this.hands = {
      left: {
        lastPosition: null,
        position: null,
        grip: false,
      },
      right: {
        lastPosition: null,
        position: null,
        grip: false,
      }
    }
    this.el.addEventListener('raycaster-intersected', (event) => {
      // console.log('Whiteboard intersected', event, this);
      // event.detail.intersection
      this.data.reactComponent.onIntersection(event.detail.intersection)
    });

    this.el.addEventListener('hit', (event) => {
      // console.log('Whiteboard intersected', event, this);
      // event.detail.intersection
      console.log("hit element")
    });

    this.el.addEventListener('triggerdown', (event) => {
      console.log('Triggerdown:', event.detail.hand)
      this.data.reactComponent.onTriggerDown()
    })

    this.el.addEventListener('triggerup', () => {
      this.data.reactComponent.onTriggerUp()
    })

    this.el.addEventListener('gripClose', (event) => {
      console.log('Triggerdown:', event.detail.hand)
      this.hands[event.detail.hand] = {
        ...this.hands[event.detail.hand],
        grip: true,
        lastPosition: this.hands[event.detail.hand].position,
        position: event.detail.target.position
      }
    })

    this.el.addEventListener('gripOpen', () => {
      this.hands[event.detail.hand] = {
        ...this.hands[event.detail.hand],
        grip: false,
        lastPosition: this.hands[event.detail.hand].position,
        position: event.detail.target.position
      }
    })

    this.el.addEventListener('clicked', (event) => {
      this.data.reactComponent.onClick(event)
    })

    // setTimeout( () => {
    //   console.log(this.el.object3DMap.mesh)
    //   console.log(this.el.object3DMap.mesh.material)
    //   console.log(this.el.object3DMap.mesh.material.map)
    //   var texture = null
    //   // this.el.object3DMap.mesh.material.map.type = THREE.UnsignedIntType
    //   // this.el.object3DMap.mesh.material.map.format = THREE.DepthFormat
    //   this.el.object3DMap.mesh.material.map.encoding = THREE.sRGBEncoding
    // }, 500)
    // console.log(THREE.RGBFormat)
  },

  tick: function() {
    if(this.hands.left.grip && this.hands.right.grip){
      console.log("Both Hands grabbing Whiteboard", this.hands)
    }
  }
});