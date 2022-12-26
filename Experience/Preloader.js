import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import { roomScale, mobileResetRoomScale, lavaLight, lampLight } from "./Utils/Manager";
import convertDivsToSpans from "./Utils/convertDivsToSpans";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;
    this.theme = this.experience.theme;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldisready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convertDivsToSpans(document.querySelector(".intro-text"));
    convertDivsToSpans(document.querySelector(".hero-main-title"));
    convertDivsToSpans(document.querySelector(".hero-main-description"));
    convertDivsToSpans(document.querySelector(".first-sub"));
    convertDivsToSpans(document.querySelector(".second-sub"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  cubeLoaderIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });
      if (this.device === "desktop") {
        this.timeline
          .to(".preloader", {
            delay: 1,
            opacity: 0,
            onComplete: () => {
              document.querySelector(".preloader").classList.add("hidden");
            },
          })
          .to(this.roomChildren.Roomcube.scale, {
            x: 0.1686525,
            y: 0.137235,
            z: 0.1372785,
            ease: "back.out(2.5)",
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
            // onComplete: resolve,
          });
      } else {
        this.timeline
          .to(this.roomChildren.Roomcube.scale, {
            x: 0.1686525,
            y: 0.137235,
            z: 0.1372785,
            ease: "back.out(2.5)",
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
            // onComplete: resolve,
          });
      }
      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(2)",
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
          },
          "visible"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "visible"
        );
    });
  }

  PostLoaderIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      this.secondTimeline
        .to(
          ".intro-text .animatedis",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(2)",
          },
          "fadeout"
        )
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 0,
          },
          "fadeout"
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "same"
        )
        .to(
          this.roomChildren.Roomcube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          "same"
        )
        .to(
          this.roomChildren.Roomcube.scale,
          {
            x: 0.985097,
            y: 0.985097,
            z: 0.985097,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 5.65,
          },
          "same"
        )
        .to(
          this.roomChildren.Roomcube.position,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          "same"
        )
        .set(this.roomChildren.Room.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          this.roomChildren.Roomcube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
          },
          "introtext"
        )
        .to(
          ".hero-main-title .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(2)",
          },
          "introtext"
        )
        .to(
          ".hero-main-description .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(2)",
          },
          "introtext"
        )
        .to(
          ".first-sub .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(2)",
          },
          "introtext"
        )
        .to(
          ".second-sub .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(2)",
          },
          "introtext"
        )
        .to(
          this.roomChildren.Bed.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          ">-0.5"
        )
        .to(
          this.roomChildren.Posters.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(.2)",
            duration: 0.5,
          },
          ">-0.4"
        )
        .to(
          this.roomChildren.Shelve.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          ">-0.4"
        )
        .to(
          this.roomChildren.Desk.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.Dresser_Items.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.Bloops001.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.Table_Items.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          ">-0.2"
        )
        .to(
          this.roomChildren.wideScreen.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          ">-0.1"
        )
        .to(
          this.roomChildren.Floor.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          ">-0.1"
        )
        .to(
          this.roomChildren.Chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.2)",
            duration: 0.5,
          },
          "chair"
        )
        .to(
          this.roomChildren.Chair.rotation,
          {
            y: 4 * Math.PI + Math.PI / 4,
            ease: "power2.out",
            duration: 1,
          },
          "chair"
        )
        .to(".arrow-svg-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playPostLoaderIntro();
    }
  }
  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playPostLoaderIntro();
    }
    this.initialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    this.scaleFlag = true;
    await this.cubeLoaderIntro();
    this.moveFlag = true;
    this.scrollEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  // Second Intro
  async playPostLoaderIntro() {
    this.moveFlag = false;
    await this.PostLoaderIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    if (this.device === "desktop") {
      this.room.scale.set(roomScale.x, roomScale.y, roomScale.z);
    } else {
      this.room.scale.set(mobileResetRoomScale.x, mobileResetRoomScale.y, mobileResetRoomScale.z);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }

    if (this.scaleFlag) {
      this.scale();
    }
  }
}
