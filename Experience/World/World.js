import * as THREE from "three";

import Experience from "../Experience";

import Room from "./Room";
import Floor from "./Floor";
import Environment from "./Environment";
import Controls from "./Controls";

import { EventEmitter } from "events";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.room = this.experience.room;
    this.theme = this.experience.theme;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.room = new Room();
      // this.controls = new Controls();
      this.emit("worldisready");
    });

    this.theme.on("switch", (theme) => {
      this.themeSwitcher(theme);
      this.lightsOn(theme);
    });
  }

  themeSwitcher(theme) {
    if (this.environment) {
      this.environment.themeSwitcher(theme);
    }
  }

  lightsOn(theme) {
    if (this.room.actualRoom) {
      this.room.lightsOn(theme);
    }
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}