// Three.js Aurora Borealis (Northern Lights) Hero Background
const container = document.getElementById('canvas-container');
let scene, camera, renderer, auroraMesh, animationId;
let uniforms;

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

  // Aurora shader material
  uniforms = {
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2(width, height) }
  };

  const auroraMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float u_time;
      uniform vec2 u_resolution;
      
      // Aurora color palette
      vec3 auroraColor(float t) {
        return mix(
          mix(vec3(0.1, 0.8, 0.5), vec3(0.2, 0.4, 1.0), smoothstep(0.0, 0.5, t)),
          mix(vec3(0.8, 0.9, 0.3), vec3(0.9, 0.2, 0.7), smoothstep(0.5, 1.0, t)),
          smoothstep(0.3, 0.7, t)
        );
      }
      
      void main() {
        float y = vUv.y;
        float x = vUv.x;
        float t = u_time * 0.15;
        float wave = 0.0;
        float bands = 3.0;
        for (float i = 1.0; i <= bands; i += 1.0) {
          float speed = 0.2 + i * 0.07;
          float freq = 2.0 + i * 1.5;
          float amp = 0.08 + i * 0.04;
          wave += sin((x + t * speed) * freq + i * 10.0) * amp;
        }
        float aurora = smoothstep(0.45 + wave, 0.55 + wave, y);
        float fade = pow(1.0 - y, 2.0);
        vec3 color = auroraColor(x + wave + t * 0.1) * aurora * fade;
        color += vec3(0.01, 0.02, 0.05) * (1.0 - aurora); // subtle night sky
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true
  });

  // Fullscreen plane for aurora
  const geometry = new THREE.PlaneGeometry(600, 400, 64, 64);
  auroraMesh = new THREE.Mesh(geometry, auroraMaterial);
  scene.add(auroraMesh);

  animateHeroBG();
}

function animateHeroBG() {
  animationId = requestAnimationFrame(animateHeroBG);
  uniforms.u_time.value = performance.now() / 1000;
  renderer.render(scene, camera);
}

function onResizeHeroBG() {
  if (!container || !renderer || !camera) return;
  const width = container.offsetWidth;
  const height = container.offsetHeight || 500;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  if (uniforms) uniforms.u_resolution.value.set(width, height);
}

window.addEventListener('resize', onResizeHeroBG);

// Only initialize if container exists and Three.js is loaded
if (container && window.THREE) {
  initHeroBG();
} 