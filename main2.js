// Initialize Three.js scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
document.getElementById("app").appendChild(renderer.domElement);

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Create a loader for GLTF files
const loader = new THREE.GLTFLoader();

let hat;
loader.load(
  "hat/scene.gltf",
  function (gltf) {
    hat = gltf.scene;
    hat.scale.set(6.5, 6.5, 6.5);
    hat.position.y = -0.8;
    scene.add(hat);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Create a renderer for rendering the wand in the object div
const objectRenderer = new THREE.WebGLRenderer({ alpha: true });
objectRenderer.setClearColor(0x000000, 0);
objectRenderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("app").appendChild(objectRenderer.domElement);


// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Render the scene
  renderer.render(scene, camera);
  objectRenderer.render(scene, camera); // Render the scene with the hat in the object div
}

animate();
