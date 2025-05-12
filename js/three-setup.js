// Enhanced 3D background for book environment
let scene, camera, renderer;
let particles, tableLighting;
let dustParticles = [];

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

    // Add ambient lighting effect for the table
    createTableLighting();

    // Create floating dust effect
    createDustParticles();

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

    // Create particle material with improved glow
    const material = new THREE.PointsMaterial({
        color: 0x8e44ad,
        size: 0.4,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });

    // Create particle system
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createTableLighting() {
    // Create a soft glow effect for the table
    const geometry = new THREE.PlaneGeometry(30, 15);
    const material = new THREE.MeshBasicMaterial({
        color: 0x8e44ad,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });

    tableLighting = new THREE.Mesh(geometry, material);
    tableLighting.position.set(0, -8, -5);
    tableLighting.rotation.x = -Math.PI / 2;
    scene.add(tableLighting);
}

function createDustParticles() {
    // Create floating dust particles for a more atmospheric effect
    const dustCount = 100;

    for (let i = 0; i < dustCount; i++) {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        // Single point per dust particle
        vertices.push(0, 0, 0);

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // Randomize dust appearance and behavior
        const size = Math.random() * 0.1 + 0.03;
        const opacity = Math.random() * 0.5 + 0.2;

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: size,
            transparent: true,
            opacity: opacity,
            blending: THREE.AdditiveBlending
        });

        const dust = new THREE.Points(geometry, material);

        // Position dust randomly around the book area
        dust.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 10 - 3,
            (Math.random() - 0.5) * 15
        );

        // Store velocity for animation
        dust.userData = {
            velocity: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.01
            },
            originalY: dust.position.y,
            amplitude: Math.random() * 0.5 + 0.2,
            frequency: Math.random() * 0.02 + 0.01
        };

        scene.add(dust);
        dustParticles.push(dust);
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles slowly
    if (particles) {
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;

        // Make particles move in a wave pattern
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i] * 0.1) * 0.005;
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }

    // Animate table lighting glow
    if (tableLighting) {
        tableLighting.material.opacity = 0.08 + Math.sin(Date.now() * 0.0005) * 0.07;
    }

    // Animate dust particles
    const time = Date.now() * 0.001;
    dustParticles.forEach(dust => {
        // Slow floating movement
        dust.position.x += dust.userData.velocity.x;
        dust.position.z += dust.userData.velocity.z;

        // Gentle up and down floating
        dust.position.y = dust.userData.originalY +
            Math.sin(time * dust.userData.frequency) * dust.userData.amplitude;

        // Reset if dust moves too far
        if (Math.abs(dust.position.x) > 20 ||
            Math.abs(dust.position.z) > 15) {
            dust.position.x = (Math.random() - 0.5) * 20;
            dust.position.z = (Math.random() - 0.5) * 15;
        }

        // Slight size pulsing
        const scale = 1 + Math.sin(time * 0.5 + dust.position.x) * 0.1;
        dust.material.size = dust.material.size * scale;

        // Fade in and out slightly
        dust.material.opacity = dust.userData.opacity *
            (0.7 + Math.sin(time * 0.3 + dust.position.z) * 0.3);
    });

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