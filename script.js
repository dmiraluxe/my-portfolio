// --- 1. INITIALIZATION & SCENE SETUP ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// --- 2. THE CYBER-LATTICE (3D Geometry) ---
// Ek immersive background ke liye hum ek abstract geometry banayenge
const geometry = new THREE.TorusKnotGeometry(12, 1.5, 150, 20);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00f2fe, 
    wireframe: true,
    transparent: true,
    opacity: 0.15
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// --- 3. DYNAMIC DATA PARTICLES (Star Field) ---
function addParticle() {
    const starGeo = new THREE.SphereGeometry(0.08, 24, 24);
    const starMat = new THREE.MeshStandardMaterial({ color: 0x4facfe });
    const star = new THREE.Mesh(starGeo, starMat);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(120));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(350).fill().forEach(addParticle);

// --- 4. CINEMATIC LIGHTING ---
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const blueLight = new THREE.PointLight(0x00f2fe, 2);
blueLight.position.set(-15, -15, 10);

scene.add(pointLight, ambientLight, blueLight);

// --- 5. INTERACTIVE MOUSE TRACKING ---
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;

    // GSAP se camera ko smooth move karte hain mouse ke saath
    gsap.to(camera.position, {
        x: mouseX * 10,
        y: -mouseY * 10,
        duration: 1.5,
        ease: "power2.out"
    });

    // TorusKnot ko halka sa tilt dete hain
    gsap.to(torusKnot.rotation, {
        y: mouseX * 2,
        x: -mouseY * 2,
        duration: 2
    });
});

// --- 6. SCROLL REVEAL ANIMATIONS (GSAP) ---
// Jaise-jaise aap niche scroll karenge, content cards "reveal" honge
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.glass-section');

sections.forEach((section) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power4.out"
    });
});

// --- 7. ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);

    // Constant slow rotation for the 3D world
    torusKnot.rotation.z += 0.001;
    
    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// --- 8. UI ENHANCEMENTS (Glitch & Button Effects) ---
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3 });
    });
});
