/* global AFRAME, THREE */

/**
 * Implement AABB collision detection for entities with a mesh.
 * (https://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box)
 * It sets the specified state on the intersected entities.
 *
 * @property {string} objects - Selector of the entities to test for collision.
 * @property {string} state - State to set on collided entities.
 *
 */
AFRAME.registerComponent('moveable', {
  schema: {
    objects: {default: ''},
    state: {default: ''}
  },

  init: function () {
    console.log(this)
    // Reorder values
    this.el.object3D.rotation.order = 'YXZ';

    this.lastPosition = new THREE.Vector3(0,0,0);
    this.position = this.el.object3D.position;
    this.lastRotation = new THREE.Vector3(0,0,0);
    this.rotation = this.el.object3D.rotation;
  },
  
  /**
   * Update list of entities to test for collision.
   */
  update: function () {
  },
  
  tick: (function () {
    var boundingBox = new THREE.Box3();
    let quat = new THREE.Quaternion();
    return function () {
      // Checks for position change
      if(this.lastPosition.x != this.position.x ||
         this.lastPosition.y != this.position.y ||
         this.lastPosition.z != this.position.z 
      ){
        this.lastPosition = {
          x: this.position.x,
          y: this.position.y,
          z: this.position.z
        }
        this.el.emit('positionChange', this.lastPosition);
      }
      
      // Checks for rotation change
      if(this.lastRotation.x != this.rotation.x ||
        this.lastRotation.y != this.rotation.y ||
        this.lastRotation.z != this.rotation.z 
      ){
        
        this.lastRotation = {
          x: this.rotation.x,
          y: this.rotation.y,
          z: this.rotation.z
        }

        const heading = convertEulerToDegree(this.lastRotation.y);
        const pitch = convertEulerToDegree(this.lastRotation.x);
        const roll = convertEulerToDegree(this.lastRotation.z);

        this.el.emit('rotationChange', new THREE.Vector3(
          pitch,
          heading,
          roll,
        ));
      }

      function convertEulerToDegree(value){
        const radians = value > 0
          ? value
          : (2 * Math.PI) + value;
        const degrees = THREE.Math.radToDeg(radians);
        return degrees
      }
    };
  })()
});