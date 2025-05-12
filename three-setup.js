// Three.js background setup
let scene, camera, renderer;
let particles;

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();

    // Setup camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Add renderer to DOM
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create particle system for magical ambiance
    createParticles();

    // Start animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    // Create particle positions
    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 20;

        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Create particle material
    const material = new THREE.PointsMaterial({
        color: 0x8e44ad,
        size: 0.3,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create particle system
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles slowly
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;

        // Make particles move in a wave pattern
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i] * 0.1) * 0.01;
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }

    // Render scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize Three.js when the DOM is ready
document.addEventListener('DOMContentLoaded', initThreeJS);