// Initialize Three.js scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    900 / 700, // Adjust aspect ratio to match the div size
    0.5,
    100
);

camera.position.z = 15;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
// document.getElementById("app").appendChild(renderer.domElement); // Append renderer to div

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

// Directional light for casting shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 1024; // default
directionalLight.shadow.mapSize.height = 1024; // default
directionalLight.shadow.camera.near = 0.9; // default
directionalLight.shadow.camera.far = 500; // default

// Create a spotlight for additional lighting
const spotLight = new THREE.SpotLight(0xffffff, 40, 1000, 4, 0.9);
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
        model.scale.set(30.5, 26.5, 28.5);
        model.position.y = -0.9;
        model.castShadow = true; // Ensure the model casts shadow
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

// controls
const controls = new THREE.OrbitControls(camera, objectRenderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;



// controls

// Array of heroic sentences
const heroicSentences = [
    "I am unstoppable!",
    "Justice will prevail!",
    "Evil beware, for I am here!",
    "With great power comes great responsibility.",
    "I fight for truth and justice!",
    "The city needs a hero, and I will answer the call.",
    "No villain can stand against me!",
    "I will protect the innocent!",
    "I am the hero this city deserves.",
    "In the face of danger, I will not falter!",
    "For honor and glory!",
    "I will never give up!",
    "My courage knows no bounds!",
    "I am a beacon of hope!",
    "Evildoers, your reign ends now!",
    "The power of justice flows through me!",
    "I will defend the weak and oppressed.",
    "Even in the darkest of times, I will shine bright!",
    "Nothing can stop me from saving the day!",
    "I am the defender of truth and righteousness!"
];

function exit() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Model is Destroyed.",
                icon: "success"
            });
            document.getElementById("app").innerHTML = "";
        }
    });
}

// Function to speak a heroic sentence
function speak() {
    // Randomly select a sentence from the array
    const randomIndex = Math.floor(Math.random() * heroicSentences.length);
    const sentence = heroicSentences[randomIndex];

    // Display the selected sentence as an alert message
    Swal.fire({
        title: sentence,
        width: 600,
        padding: "3em",
        color: "#0199e6",
        background: "#fff url(/images/trees.png)",
        backdrop: `
        rgba(1, 153, 230,0.4)
        url("/megaman/gif/megaman.gif")
        left top
        no-repeat
    `
    });
}

function spin() {
    // Set up the initial rotation values
    const initialRotationY = model.rotation.y;
    const targetRotationY = initialRotationY + Math.PI * 2; // Rotate 360 degrees (2 * Math.PI)

    // Create a Tween animation
    const tween = new tween.Tween({ rotationY: initialRotationY })
        .to({ rotationY: targetRotationY }, 2000) // 2000 milliseconds duration
        .easing(tween.Easing.Quadratic.InOut) // Use quadratic easing for smooth start and end
        .onUpdate(function () {
            // Update the rotation of the model
            model.rotation.y = this.rotationY;
        })
        .start() // Start the animation
        .onComplete(function () {
            // When the animation completes, set the rotation back to the initial value
            model.rotation.y = initialRotationY;
        });
}



let isJumping = false;

function jump() {
    if (!isJumping) {
        // Make the model jump
        model.position.y += 1; // Adjust the jump height as needed
        isJumping = true;
    } else {
        // Return the model to its normal stage
        model.position.y = -1.5; // Adjust the normal position as needed
        isJumping = false;
    }
};

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Float the model up and down
    if (model) {
        model.position.y = Math.sin(Date.now() * 0.002) * 0.5; // Adjust the floating speed and magnitude as needed
    }

    controls.update(); // Update controls
    renderer.render(scene, camera); // Render main scene
    objectRenderer.render(scene, camera); // Render object scene
}

animate();
