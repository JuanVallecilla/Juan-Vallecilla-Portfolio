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

      // if (mesh.name === "Bloops001") {
      //   mesh.material = new THREE.MeshPhysicalMaterial({
      //     color: 0xd62932,
      //     emissive: 0x000000,
      //     roughness: 0,
      //     clearcoat: 1,
      //   });
      // }

      // mesh.material.roughness = 0;
      // mesh.material.metalness = 0.375;
      // mesh.material.color.set(0x4eaee7);
      // mesh.material.ior = 1;
      // mesh.material.transmission = 1;
      // mesh.material.opacity = 1;
      // }

      // console.log(mesh);
      if (mesh.name === "wideScreen") {
        mesh.children[0].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }
      // if (mesh.name === "Console") {
      //   mesh.scale.set(0, 0, 0);
      // }
      // if (mesh.name === "Plane005") {
      //   mesh.scale.set(0, 0, 0);
      // }

      // if (mesh.name === "Circle004") {
      //   console.log(mesh);
      // }

      // ----------------------------SEETING mesh SCALE TO 0 TO SEE CUBE
      mesh.scale.set(0, 0, 0);
      if (mesh.name === "Roomcube") {
        // mesh.scale.set(1, 1, 1);
        mesh.position.set(0, -2.5, 0);
      }

      this.roomChildren[mesh.name] = mesh;
    });

    // const lampLight = new THREE.PointLight(0xff7b19, 0, 0);
    // lampLight.name = "lampLight";
    // lampLight.position.set(-4.45, 9.35, -7.5); // z:8.61693 y: 10.5677

    // const a = "nightTime";
    // this.lampLight[a] = 0.5;
    // this.lampLight.rotation.y = Math.PI / 4;

    // x: 9.51551
    // y: 7.73494 m
    // z: 3.17593 m
    // const lavaLight = new THREE.PointLight(0x4eaee7, 0, 0);
    // lavaLight.name = "lavaLight";
    // lavaLight.position.set(8.6, 7.3, -2.5);

    // this.rectLight = new THREE.RectAreaLight(0xffffff, 0, 0.1, 0.1);
    // this.rectLight.position.set(0.09485217928886414, 1, 7.753444194793701);
    // this.rectLight.rotation.x = -Math.PI / 2;

    // this.lampLight.intensity = this.lights.lampLight;

    // this.actualRoom.add(this.lavaLight);
    // this.actualRoom.add(this.rectLight);

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);

    // this.pointLightHelper = new PointLightHelper(this.lampLight, 1);
    // this.lampLight.add(this.pointLightHelper);

    // this.pointLightHelper = new PointLightHelper(this.lavaLight, 1);
    // this.lavaLight.add(this.pointLightHelper);
    // this.roomChildren["lampLight"] = lampLight;
    // this.roomChildren["lavaLight"] = lavaLight;
    this.scene.add(this.actualRoom);
    this.actualRoom.attach(lampLight);
    this.actualRoom.attach(lavaLight);
    this.actualRoom.scale.set(roomScale.x, roomScale.y, roomScale.z);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    //this.mixerPlane = new THREE.AnimationMixer(this.actualRoom);
    //this.plane = this.mixerPlane.clipAction(this.room.animations[1]);

    this.lamp = this.mixer.clipAction(this.room.animations[0]);
    this.terrain = this.mixer.clipAction(this.room.animations[1]);
    this.spaceShip = this.mixer.clipAction(this.room.animations[2]);

    this.lamp.play();
    this.terrain.play();
    this.spaceShip.play();

    // console.log(this.room);
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
