import * as THREE from "three";
import { AmbientLight } from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // this.gui = new GUI({ container: document.querySelector(".hero-main") });
    // this.obj = {
    //   colorObj: { r: 0, g: 0, b: 0 },
    //   intensity: 3,
    // };

    this.setSunlight();
    // this.setGUI();
  }

  // setGUI() {
  //   this.gui.addColor(this.obj, "colorObj").onChange(() => {
  //     this.sunLight.color.copy(this.obj.colorObj);
  //     this.ambientLight.color.copy(this.obj.colorObj);
  //     console.log(this.obj.colorObj);
  //   });
  //   this.gui.add(this.obj, "intensity", 0, 20).onChange(() => {
  //     this.sunLight.intensity = this.obj.intensity;
  //     this.ambientLight.intensity = this.obj.intensity;
  //   });
  // }

  // Setting scene Lighting
  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#FFFFFF", 1.5); // 3 My original Intensity
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    //Shadow Camara Helper
    // const shadowCamara = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(shadowCamara);

    this.sunLight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#FFFFFF", 0.5);
    this.scene.add(this.ambientLight);
  }

  themeSwitcher(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        b: 0.18823529411764706,
        g: 0.08235294117647059,
        r: 0.0784313725490196,
      });
      GSAP.to(this.ambientLight.color, {
        b: 0.18823529411764706,
        g: 0.08235294117647059,
        r: 0.0784313725490196,
      });

      GSAP.to(this.sunLight, {
        intensity: 4,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1.5,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      GSAP.to(this.ambientLight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      GSAP.to(this.sunLight, {
        intensity: 1.5,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.5,
      });
    }
  }

  resize() {}

  update() {}
}
