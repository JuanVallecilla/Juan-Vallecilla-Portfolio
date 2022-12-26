import * as THREE from "three";

const roomScale = {
  x: 0.11,
  y: 0.11,
  z: 0.11,
};

// original scale was .08
const mobileResetRoomScale = {
  x: 0.065,
  y: 0.065,
  z: 0.065,
};

const originPosition = {
  x: 0,
  y: 0,
  z: 0,
};

const lampLight = new THREE.PointLight(0xff7b19, 0, 0);
// lampLight.name = "lampLight";
lampLight.position.set(-4.45, 9.35, -7.5);

const lavaLight = new THREE.PointLight(0x4eaee7, 0, 0);
// lavaLight.name = "lavaLight";
lavaLight.position.set(8.6, 7.3, -2.5);

const circleGeometry = new THREE.CircleGeometry(5, 64);
const circleMaterialOne = new THREE.MeshStandardMaterial({ color: 0x9fd3c7 });
const circleMaterialTwo = new THREE.MeshStandardMaterial({ color: 0x385170 });
const circlematerialThree = new THREE.MeshStandardMaterial({ color: 0x142d4c });

export {
  roomScale,
  mobileResetRoomScale,
  originPosition,
  lampLight,
  lavaLight,
  circleGeometry,
  circleMaterialOne,
  circleMaterialTwo,
  circlematerialThree,
};
