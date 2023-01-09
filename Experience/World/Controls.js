import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { roomLights } from "../Utils/Light.js";
import { roomScale, originPosition, mobileResetRoomScale } from "../Utils/Manager";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.actualRoom = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;

    this.circleOne = this.experience.world.floor.circleOne;
    this.circleTwo = this.experience.world.floor.circleTwo;
    this.circleThree = this.experience.world.floor.circleThree;

    this.zoom = {
      zoomValue: this.camera.orthographicCamera.zoom,
    };

    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible";

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.setSmoothScroll();
    }
    this.setScrollTrigger();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]"),
      });
    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTrigger() {
    this.scroll = GSAP.matchMedia();
    this.scroll.add(
      {
        isDesktop: `(min-width: 969px)`,
        isMobile: `(max-width: 968px)`,
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          // console.log("Desktop Trigger");
          this.actualRoom.scale.set(roomScale.x, roomScale.y, roomScale.z);
          this.actualRoom.position.set(originPosition.x, originPosition.y, originPosition.z);
          this.camera.orthographicCamera.position.set(0, 5.65, 8.2);
          this.circleTwo.position.x = 1.8;

          //First Section ------------------------------------------
          this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-move",
              // markers: true,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          }).fromTo(
            this.actualRoom.position,
            { x: 0, y: 0, z: 0 },
            {
              x: () => {
                return this.sizes.width * 0.00125;
              },
            }
          );

          //Second Section ------------------------------------------
          this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-move",
              // markers: true,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
            .to(
              this.zoom,
              {
                zoomValue: 2.5,
                onUpdate: () => {
                  this.camera.orthographicCamera.zoom = this.zoom.zoomValue;
                  this.camera.orthographicCamera.updateProjectionMatrix();
                },
              },
              "second"
            )
            .to(
              this.actualRoom.position,
              {
                x: 0,
              },
              "second"
            );
          //Third Section ------------------------------------------
          this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              // markers: true,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
            .to(
              this.camera.orthographicCamera.rotation,
              {
                x: -0.3,
                y: 0,
                z: 0,
              },

              "third"
            )
            .to(
              this.camera.orthographicCamera.position,
              {
                x: -0.85,
                y: 0.5,
                z: 2,
              },
              "third"
            );
        } else if (isMobile) {
          // console.log("Mobile Trigger");

          this.actualRoom.scale.set(mobileResetRoomScale.x, mobileResetRoomScale.y, mobileResetRoomScale.z);
          this.actualRoom.position.set(originPosition.x, originPosition.y, originPosition.z);
          this.camera.orthographicCamera.position.set(0, 5.65, 8.2);

          //First Section ------------------------------------------
          this.MobilefirstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-move",
              // markers: true,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              // invalidateOnRefresh: true,
            },
            // remove this if I dont want first animation when scrolling
          }).to(this.actualRoom.scale, {
            x: 0.08,
            y: 0.08,
            z: 0.08,
          });
          //Second Section ------------------------------------------
          this.MobilesecondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-move",
              // markers: true,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
            .to(
              this.zoom,
              {
                zoomValue: 2, // 2.5
                onUpdate: () => {
                  this.camera.orthographicCamera.zoom = this.zoom.zoomValue;
                  this.camera.orthographicCamera.updateProjectionMatrix();
                },
              },
              "second"
            )
            .to(
              this.actualRoom.position,
              {
                x: 0.7, // .5
              },
              "second"
            );

          //Third Section ------------------------------------------
          this.MobilethirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              // markers: true,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
            .to(
              this.camera.orthographicCamera.rotation,
              {
                x: -0.3,
                y: 0,
                z: 0,
              },

              "third"
            )
            .to(
              this.camera.orthographicCamera.position,
              {
                x: 0.7, // .5
                y: 0.5, // .5
                z: 2, // 0
              },
              "third"
            );
        }
        //  Progress Bar animation ----------------------------------------
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");
          if (section.classList.contains("right")) {
            GSAP.to(section, {
              borderTopLeftRadius: 650,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                // markers: true,
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomLeftRadius: 650,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                // markers: true,
                scrub: 0.6,
              },
            });
          } else {
            GSAP.to(section, {
              borderTopRightRadius: 650,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                // markers: true,
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomRightRadius: 650,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                // markers: true,
                scrub: 0.6,
              },
            });
          }
          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              pin: this.progressWrapper,
              pinSpacing: false,
            },
          });
        });

        // Floor Animation ----------------------------------------
        this.firstCircle = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }).to(this.circleOne.scale, {
          x: 3,
          y: 3,
          z: 3,
        });
        //Second Section ------------------------------------------
        this.secondCircle = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }).to(this.circleTwo.scale, {
          x: 3,
          y: 3,
          z: 3,
        });

        //Third Section ------------------------------------------
        this.thirdCircle = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }).to(this.circleThree.scale, {
          x: 3,
          y: 3,
          z: 3,
        });

        // Console Animation --------------------------------------
        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            // markers: true,
            start: "center center",
          },
        });

        this.console = GSAP.to(this.roomChildren.Console.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2)",
          duration: 1,
        });

        this.hologram = GSAP.to(this.roomChildren.Hologram.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
        });

        this.plane = GSAP.to(this.roomChildren.Plane005.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2)",
          duration: 1,
        });

        this.secondPartTimeline.add(this.console, " -= 0.2");
        this.secondPartTimeline.add(this.hologram, " -= 0.1");
        this.secondPartTimeline.add(this.plane, "-= 0.3");
      }
    );
  }

  resize() {}

  update() {}
}
