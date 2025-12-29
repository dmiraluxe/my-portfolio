const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Cinematic Lights
const mainLight = new THREE.PointLight(0x4facfe, 2, 100);
mainLight.position.set(10, 10, 10);
scene.add(mainLight);

const blueLight = new THREE.PointLight(0x00f2fe, 1, 50);
blueLight.position.set(-10, -10, 10);
scene.add(blueLight);

// Floating Geometry (Corporate Tech Style)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x111111, 
    wireframe: true,
    transparent: true,
    opacity: 0.2
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Particle Stars
function addStar() {
  const starGeo = new THREE.SphereGeometry(0.1, 24, 24);
  const starMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeo, starMat);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(300).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.002;
  torusKnot.rotation.y += 0.005;
  renderer.render(scene, camera);
}

// Mouse Interaction
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    gsap.to(camera.position, { x: x * 5, y: -y * 5, duration: 2 });
});

animate();
