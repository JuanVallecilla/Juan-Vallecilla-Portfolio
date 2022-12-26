import * as THREE from "three";
import Experience from "../Experience";
import { circleGeometry, circleMaterialOne, circleMaterialTwo, circlematerialThree } from "../Utils/Manager";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  setCircles() {
    // const geometry = new THREE.CircleGeometry(5, 64);
    // const materialOne = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });
    // const materialTwo = new THREE.MeshStandardMaterial({ color: 0x8395cd });
    // const materialThree = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });

    this.circleOne = new THREE.Mesh(circleGeometry, circleMaterialOne);
    this.circleTwo = new THREE.Mesh(circleGeometry, circleMaterialTwo);
    this.circleThree = new THREE.Mesh(circleGeometry, circlematerialThree);

    this.circleOne.position.y = -0.29;

    this.circleTwo.position.y = -0.28;

    this.circleThree.position.y = -0.27;

    this.circleOne.scale.set(0, 0, 0);
    this.circleTwo.scale.set(0, 0, 0);
    this.circleThree.scale.set(0, 0, 0);

    this.circleOne.rotation.x = this.circleTwo.rotation.x = this.circleThree.rotation.x = -Math.PI / 2;
    this.circleOne.receiveShadow = this.circleTwo.receiveShadow = this.circleThree.receiveShadow = true;

    this.scene.add(this.circleOne);
    this.scene.add(this.circleTwo);
    this.scene.add(this.circleThree);
  }

  resize() {}
  update() {}
}
