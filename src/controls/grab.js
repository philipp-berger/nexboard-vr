/* global AFRAME */


/**
* Handles events coming from the hand-controls.
* Determines if the entity is grabbed or released.
* Updates its position to move along the controller.
*/
AFRAME.registerComponent('grab', {
  init: function () {
    const TRIGGER_ID = 1
    const GRAB_ID = 2

    console.log("init grabbed")
    this.GRABBED_STATE = 'grabbed';
    this.handType = this.el.getAttribute('hand-controls')
    console.log("Init hand", this.handType)
    // Bind event handlers
    this.onHit = this.onHit.bind(this);
    this.onGripOpen = this.onGripOpen.bind(this);
    this.onGripClose = this.onGripClose.bind(this);
    this.onPointingEnd = this.onPointingEnd.bind(this);
    this.onPointingStart = this.onPointingStart.bind(this);


    this.el.addEventListener('buttondown', (event) => {
      if(!this.intersectedElement){
        return;
      }
      switch(event.detail.id){
        case TRIGGER_ID:
          this.intersectedElement.emit('triggerdown', {...event.detail, hand: this.handType})
          break
        case GRAB_ID:
        default:
          break
      }
    })

    this.el.addEventListener('buttonup', (event) => {
      if(!this.intersectedElement){
        return;
      }

      switch(event.detail.id){
        case TRIGGER_ID:
          this.intersectedElement.emit('triggerup', {...event.detail, hand: this.handType})
          break
        case GRAB_ID:
        default:
          break
      }
    })

    this.el.addEventListener('raycaster-intersection', (event) => {
      // console.log("Raycaster intersection", event)
      if(event.detail.els.length > 0){
        this.intersectedElement = event.detail.els[0]
        // this.intersectedElement.emit('triggerup', event)
      }
    })

    this.el.addEventListener('raycaster-intersection-cleared', (event) => {
        this.intersectedElement = null
    })
  },

  update: function() {
  },

  play: function () {
    var el = this.el;
    el.addEventListener('hit', this.onHit);
    el.addEventListener('gripclose', this.onGripClose);
    el.addEventListener('gripopen', this.onGripOpen);
    el.addEventListener('thumbup', this.onGripClose);
    el.addEventListener('thumbdown', this.onGripOpen);
    el.addEventListener('pointup', this.onGripClose);
    el.addEventListener('pointdown', this.onGripOpen);
    
    // The hand is pointing with index finger without thumb raised.
    el.addEventListener('pointingstart', this.onPointingStart);
    el.addEventListener('pointingend', this.onPointingEnd);
  },

  pause: function () {
    var el = this.el;
    el.removeEventListener('hit', this.onHit);
    el.removeEventListener('gripclose', this.onGripClose);
    el.removeEventListener('gripopen', this.onGripOpen);
    el.removeEventListener('thumbup', this.onGripClose);
    el.removeEventListener('thumbdown', this.onGripOpen);
    el.removeEventListener('pointup', this.onGripClose);
    el.removeEventListener('pointdown', this.onGripOpen);

    // The hand is pointing with index finger without thumb raised.
    el.removeEventListener('pointingstart', this.onPointingStart);
    el.removeEventListener('pointingend', this.onPointingEnd);
  },

  onPointingStart: function(evt) {
    this.pointing = true
    console.log("Point start", this.pointing)
  },

  onPointingEnd: function(evt) {
    this.pointing = false
    console.log("Point end", this.pointing)
  },

  onGripClose: function (event) {
    this.grabbing = true;
    delete this.previousPosition;
    if(!this.hitEl) {return}
    this.hitEl.emit('gripClose', {...event.detail, hand: this.handType})
  },

  onGripOpen: function (evt) {
    var hitEl = this.hitEl;
    this.grabbing = false;
    if (!hitEl) { return; }
    hitEl.removeState(this.GRABBED_STATE);
    hitEl.emit('gripOpen', {...event.detail, hand: this.handType})
    this.hitEl = undefined;
  },

  onHit: function (evt) {
    var hitEl = evt.detail.el;
    if(this.pointing){
      // console.log("Hit ", hitEl)
    }
    // If the element is already grabbed (it could be grabbed by another controller).
    // If the hand is not grabbing the element does not stick.
    // If we're already grabbing something you can't grab again.
    if (!hitEl || hitEl.is(this.GRABBED_STATE) || !this.grabbing || this.hitEl) { return; }
    hitEl.addState(this.GRABBED_STATE);
    this.hitEl = hitEl;
  },

  tick: function () {
    // console.log(this.el.object3DMap)
    // try{
    //   var a = this.el.object3DMap.mesh.geometry
    // }catch(error){
    //   console.log(error)
    // }

    var hitEl = this.hitEl;
    var position, rotation;
    if (!hitEl) { return; }
    this.updateDelta();
    this.updateRotationDelta()
    position = hitEl.getAttribute('position');
    rotation = hitEl.getAttribute('rotation');

    hitEl.setAttribute('position', {
      x: position.x + this.deltaPosition.x,
      y: position.y + this.deltaPosition.y,
      z: position.z + this.deltaPosition.z
    });

    // hitEl.setAttribute('rotation', {
    //   x: rotation.x + this.deltaRotation.x,
    //   y: rotation.y + this.deltaRotation.y,
    //   z: rotation.z + this.deltaRotation.z
    // });
  },

  updateDelta: function () {
    var currentPosition = this.el.getAttribute('position');
    var previousPosition = this.previousPosition || currentPosition;
    var deltaPosition = {
      x: currentPosition.x - previousPosition.x,
      y: currentPosition.y - previousPosition.y,
      z: currentPosition.z - previousPosition.z
    };
    this.previousPosition = currentPosition;
    this.deltaPosition = deltaPosition;
  },

  updateRotationDelta: function () {
    var currentRotation = this.el.getAttribute('rotation');
    var previousRotation = this.previousRotation || currentRotation;
    var deltaRotation = {
      x: currentRotation.x - previousRotation.x,
      y: currentRotation.y - previousRotation.y,
      z: currentRotation.z - previousRotation.z
    };
    this.previousRotation = currentRotation;
    this.deltaRotation = deltaRotation;
  }
});