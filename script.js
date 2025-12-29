// 3D Background Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Adding Floating Particles (representing Data & Finance nodes)
const geometry = new THREE.SphereGeometry(0.25, 24, 24);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

function addStar() {
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.x += 0.001;
    scene.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// Certificate Interaction (GSAP)
function zoomCert(certType) {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    gsap.from(".modal-content", { duration: 0.5, scale: 0, opacity: 0, ease: "back" });
    
    // Aap yahan actual PDF link ya Image use kar sakti hain
    document.getElementById("cert-viewer").innerHTML = `Viewing ${certType} Certificate Details`;
}

// Close Modal logic
document.querySelector(".close").onclick = () => {
    gsap.to(".modal-content", { duration: 0.3, scale: 0, opacity: 0, onComplete: () => {
        document.getElementById("modal").style.display = "none";
    }});
};
