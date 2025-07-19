// Three.js Hero Section Animated Background
const container = document.getElementById('canvas-container');
let scene, camera, renderer, particles, particleGeo, particleMat, animationId;

function initHeroBG() {
  const width = container.offsetWidth;
  const height = container.offsetHeight || 500;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.position.z = 200;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0); // transparent
  renderer.setSize(width, height);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Create animated particles
  const numParticles = 200;
  particleGeo = new THREE.BufferGeometry();
  const positions = [];
  const sizes = [];
  for (let i = 0; i < numParticles; i++) {
    positions.push(
      (Math.random() - 0.5) * width,
      (Math.random() - 0.5) * height,
      (Math.random() - 0.5) * 400
    );
    sizes.push(5 + Math.random() * 10);
  }
  particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  particleGeo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

  const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
  particleMat = new THREE.PointsMaterial({
    size: 12,
    map: sprite,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    color: 0xffcc33
  });

  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  animateHeroBG();
}

function animateHeroBG() {
  animationId = requestAnimationFrame(animateHeroBG);
  const positions = particleGeo.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.05;
    if (positions[i + 1] > 250) positions[i + 1] = -250;
    if (positions[i + 1] < -250) positions[i + 1] = 250;
  }
  particleGeo.attributes.position.needsUpdate = true;
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}

function onResizeHeroBG() {
  if (!container || !renderer || !camera) return;
  const width = container.offsetWidth;
  const height = container.offsetHeight || 500;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

window.addEventListener('resize', onResizeHeroBG);

// Only initialize if container exists and Three.js is loaded
if (container && window.THREE) {
  initHeroBG();
} 