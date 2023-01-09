import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 48;
    this.perspectiveCamera.position.y = 21;
    this.perspectiveCamera.position.z = 20;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    // this.orthographicCamera.position.y = 0;
    // this.orthographicCamera.position.z = -2.5;
    // this.orthographicCamera.rotation.x = -Math.PI / 9;

    // this.orthographicCamera.position.y = 2;
    // this.orthographicCamera.position.z = 2;
    // this.orthographicCamera.rotation.x = -Math.PI / 6;

    // this.orthographicCamera.position.y = 3;
    // this.orthographicCamera.position.z = 6;
    // this.orthographicCamera.rotation.x = -Math.PI / 12;

    // this.orthographicCamera.position.y = 1; // 1
    // this.orthographicCamera.position.z = 0; // 3
    // this.orthographicCamera.rotation.x = -Math.PI / 20;

    // y = 5.65 original
    this.orthographicCamera.position.y = 4.6;
    this.orthographicCamera.position.z = 8.2;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    // helper for camara
    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    const size = 20;
    const divisions = 20;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(divisions);
    // this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }

  resize() {
    // This handles the updating the Perpective Camera on Resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // This handles the updating the Orthographic Camera on Resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    // console.log(this.perspectiveCamera.position);
    this.controls.update();

    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}