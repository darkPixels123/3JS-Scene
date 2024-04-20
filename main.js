// main.js

import * as THREE from "three";

let scene, camera, renderer;

function init() {

  // Initialize Three.js components
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("app").appendChild(renderer.domElement);

//   const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
//   spotLight.position.set(0, 25, 0);
//   spotLight.castShadow = true;
//   spotLight.shadow.bias = -0.0001;
//   scene.add(spotLight);

  // Create a loader for the glTF model
  const loader = new THREE.GLTFLoader().setPath("models/spaceship/");
  loader.load("/models/spaceship.glb", function (gltf) {
    // Add the loaded model to the scene
    scene.add(gltf.scene);
  });

  animate();
}

function animate() {
  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animate);
}

// Initialize the scene
init();
