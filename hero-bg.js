// Three.js Hero Section Animated 3D Constellation/Network Effect
const container = document.getElementById('canvas-container');
let scene, camera, renderer, particles, particleGeo, particleMat, animationId, linesMesh;
let mouse = { x: 0, y: 0 };
let target = { x: 0, y: 0 };

function initHeroBG() {
  const width = container.offsetWidth;
  const height = container.offsetHeight || 500;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.position.z = 300;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0); // transparent
  renderer.setSize(width, height);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Create 3D particles
  const numParticles = 180;
  particleGeo = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];
  for (let i = 0; i < numParticles; i++) {
    positions.push(
      (Math.random() - 0.5) * 600,
      (Math.random() - 0.5) * 400,
      (Math.random() - 0.5) * 800
    );
    // Colorful particles
    const color = new THREE.Color();
    color.setHSL(Math.random(), 0.7, 0.7);
    colors.push(color.r, color.g, color.b);
  }
  particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
  particleMat = new THREE.PointsMaterial({
    size: 14,
    map: sprite,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexColors: true,
    opacity: 0.85
  });

  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Lines geometry for connections
  linesMesh = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.25, transparent: true })
  );
  scene.add(linesMesh);

  // Mouse move for parallax
  window.addEventListener('mousemove', onMouseMoveParallax);

  animateHeroBG();
}

function animateHeroBG() {
  animationId = requestAnimationFrame(animateHeroBG);

  // Animate particles slowly in 3D space
  const positions = particleGeo.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 2] += Math.sin(Date.now() * 0.0002 + i) * 0.05;
    if (positions[i + 2] > 400) positions[i + 2] = -400;
    if (positions[i + 2] < -400) positions[i + 2] = 400;
  }
  particleGeo.attributes.position.needsUpdate = true;

  // Update lines between close particles
  updateConstellationLines();

  // Parallax camera movement
  target.x += (mouse.x - target.x) * 0.05;
  target.y += (mouse.y - target.y) * 0.05;
  camera.position.x = target.x * 50;
  camera.position.y = target.y * 30;
  camera.lookAt(scene.position);

  particles.rotation.y += 0.0007;
  renderer.render(scene, camera);
}

function updateConstellationLines() {
  const positions = particleGeo.attributes.position.array;
  const numParticles = positions.length / 3;
  const maxDist = 120; // distance threshold for connecting lines
  const linePositions = [];

  for (let i = 0; i < numParticles; i++) {
    const ix = i * 3;
    for (let j = i + 1; j < numParticles; j++) {
      const jx = j * 3;
      const dx = positions[ix] - positions[jx];
      const dy = positions[ix + 1] - positions[jx + 1];
      const dz = positions[ix + 2] - positions[jx + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < maxDist) {
        linePositions.push(
          positions[ix], positions[ix + 1], positions[ix + 2],
          positions[jx], positions[jx + 1], positions[jx + 2]
        );
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  linesMesh.geometry.dispose();
  linesMesh.geometry = lineGeometry;
}

function onMouseMoveParallax(event) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  mouse.x = (event.clientX / width) * 2 - 1;
  mouse.y = -(event.clientY / height) * 2 + 1;
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