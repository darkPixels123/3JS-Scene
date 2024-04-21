// Initialize Three.js scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  900 / 700, // Adjust aspect ratio to match the div size
  0.5,
  100
);
camera.position.z = 5;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
// document.getElementById("app").appendChild(renderer.domElement); // Append renderer to div

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xffffff, 40, 1000, 4,0.9);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0003;
scene.add(spotLight);

// Create a loader for GLTF files
const loader = new THREE.GLTFLoader();

let model;
loader.load(
  "./megaman/scene.gltf",
  function (gltf) {
    model = gltf.scene;
    model.scale.set(20.5, 16.5, 18.5);
    model.position.y = -1.5;
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Create another renderer for objects
const objectRenderer = new THREE.WebGLRenderer({ alpha: true });
objectRenderer.setClearColor(0x000000, 0);
objectRenderer.setSize(800, 700);

// Append objectRenderer to div
document.getElementById("app").appendChild(objectRenderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update code for animations, object movements, etc.

  // Rotate the model slowly
  // if (model) {
  //   model.rotation.y += 0.005; // Adjust the rotation speed as needed
  //   model.rotation.x += 0.002; // Adjust the rotation speed as needed
  // }

  // Float the model up and down
  if (model) {
    model.position.y = Math.sin(Date.now() * 0.002) * 0.5; // Adjust the floating speed and magnitude as needed
  }

  renderer.render(scene, camera); // Render main scene
  objectRenderer.render(scene, camera); // Render object scene
}

animate();