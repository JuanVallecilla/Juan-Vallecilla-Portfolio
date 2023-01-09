import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { PointLightHelper } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
// import { roomLights } from "../Utils/Light";
import { roomScale, lampLight, lavaLight } from "../Utils/Manager";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.theme = this.experience.theme;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMovement();
  }

  setModel() {
    this.actualRoom.children.forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (mesh instanceof THREE.Group) {
        mesh.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (mesh.name === "Hologram") {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: 0x4eaee7,
          metalness: 0.575,
          roughness: 0.8,
          opacity: 1,
          transmission: 0.7,
          ior: 1,
        });
        mesh.scale.set(0, 0, 0);
      }

      // console.log(mesh);
      if (mesh.name === "wideScreen") {
        mesh.children[0].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      // ----------------------------SEETING mesh SCALE TO 0 TO SEE CUBE
      mesh.scale.set(0, 0, 0);
      if (mesh.name === "Roomcube") {
        // mesh.scale.set(1, 1, 1);
        mesh.position.set(0, -2.5, 0);
      }

      this.roomChildren[mesh.name] = mesh;
    });

    this.scene.add(this.actualRoom);
    this.actualRoom.attach(lampLight);
    this.actualRoom.attach(lavaLight);
    this.actualRoom.scale.set(roomScale.x, roomScale.y, roomScale.z);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);

    this.lamp = this.mixer.clipAction(this.room.animations[0]);
    this.terrain = this.mixer.clipAction(this.room.animations[1]);
    this.spaceShip = this.mixer.clipAction(this.room.animations[2]);

    this.lamp.play();
    this.terrain.play();
    this.spaceShip.play();
  }

  onMouseMovement() {
    window.addEventListener("mousemove", (e) => {
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  lightsOn(theme) {
    if (theme === "dark") {
      lampLight.intensity = 0.8;
      lavaLight.intensity = 0.5;
    } else {
      lampLight.intensity = 0;
      lavaLight.intensity = 0;
    }
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

    this.actualRoom.rotation.y = this.lerp.current;

    this.mixer.update(this.time.delta * 0.0008);
    // this.mixerPlane.update(this.time.delta * 0.005);
  }
}
