import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LOGO_SVG } from "./logoSvgData";

// Site cyber palette
const PRIMARY = 0xb026ff; // #B026FF
const SECONDARY = 0xe35bff; // #E35BFF
const GLOW = 0xd646ff; // #D646FF

// Interactive 3D SYSTEM O-JDEV logo (coin + neon pedestal) rendered with Three.js.
// Transparent background so it blends with the neon hero section.
export const Logo3D = ({ className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const disposables = [];
    const track = (obj) => {
      disposables.push(obj);
      return obj;
    };

    const getSize = () => ({
      w: container.clientWidth || 1,
      h: container.clientHeight || 1,
    });
    const { w, h } = getSize();

    // --- Helpers: canvas-based textures ---
    const makeRadialTexture = (stops) => {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      stops.forEach(([o, col]) => g.addColorStop(o, col));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return track(t);
    };

    // --- Scene / camera / renderer ---
    const scene = new THREE.Scene(); // transparent
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.outline = "none";

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // keep page scroll working
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.target.set(0, 2, 0);

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const purpleLight1 = new THREE.PointLight(PRIMARY, 3.2, 18);
    purpleLight1.position.set(0, 2.5, 4);
    scene.add(purpleLight1);

    const purpleLight2 = new THREE.PointLight(PRIMARY, 2, 12);
    purpleLight2.position.set(0, -2, -3);
    scene.add(purpleLight2);

    // Magenta rim light from behind for the cyber edge glow
    const rimLight = new THREE.PointLight(SECONDARY, 2.4, 20);
    rimLight.position.set(-4, 4, -6);
    scene.add(rimLight);

    // --- Logo texture from embedded SVG ---
    const svgBlob = new Blob([LOGO_SVG], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(svgUrl, () => URL.revokeObjectURL(svgUrl));
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    track(logoTexture);

    // --- Materials (cyber tuned) ---
    const purpleMetalMaterial = track(
      new THREE.MeshStandardMaterial({ color: 0x7a1fb0, metalness: 0.9, roughness: 0.18, envMapIntensity: 1.2 })
    );
    const neonGlowMaterial = track(
      new THREE.MeshStandardMaterial({ color: PRIMARY, emissive: GLOW, emissiveIntensity: 3, roughness: 0.1 })
    );
    const darkBaseMaterial = track(
      new THREE.MeshStandardMaterial({ color: 0x120020, metalness: 0.95, roughness: 0.25, emissive: 0x250042, emissiveIntensity: 0.4 })
    );
    const faceMaterial = track(
      new THREE.MeshStandardMaterial({ map: logoTexture, roughness: 0.32, metalness: 0.18, emissive: 0x3a0a55, emissiveIntensity: 0.45 })
    );

    // --- Build logo + pedestal ---
    const grupoLogoCompleto = new THREE.Group();

    const baseMesh = new THREE.Mesh(track(new THREE.CylinderGeometry(3.5, 3.6, 0.6, 64)), darkBaseMaterial);
    baseMesh.position.y = -0.3;
    grupoLogoCompleto.add(baseMesh);

    const neonRingMesh = new THREE.Mesh(track(new THREE.CylinderGeometry(3.55, 3.55, 0.1, 64)), neonGlowMaterial);
    neonRingMesh.position.y = -0.15;
    grupoLogoCompleto.add(neonRingMesh);

    const subBaseMesh = new THREE.Mesh(track(new THREE.CylinderGeometry(3.7, 3.7, 0.05, 64)), neonGlowMaterial);
    subBaseMesh.position.y = -0.58;
    grupoLogoCompleto.add(subBaseMesh);

    const logoGroup = new THREE.Group();
    const coinGeom = track(new THREE.CylinderGeometry(3, 3, 0.3, 128));
    coinGeom.rotateX(Math.PI / 2);
    const coinMesh = new THREE.Mesh(coinGeom, [purpleMetalMaterial, faceMaterial, purpleMetalMaterial]);
    logoGroup.add(coinMesh);

    const torMesh1 = new THREE.Mesh(track(new THREE.TorusGeometry(3, 0.08, 16, 100)), purpleMetalMaterial);
    torMesh1.position.z = 0.15;
    logoGroup.add(torMesh1);

    const torMesh2 = new THREE.Mesh(track(new THREE.TorusGeometry(2.9, 0.04, 16, 100)), neonGlowMaterial);
    torMesh2.position.z = 0.16;
    logoGroup.add(torMesh2);

    // Cyber HUD scan-ring around the coin (spins independently)
    const hudRing = new THREE.Mesh(
      track(new THREE.TorusGeometry(3.45, 0.015, 8, 120, Math.PI * 1.35)),
      track(new THREE.MeshStandardMaterial({ color: SECONDARY, emissive: SECONDARY, emissiveIntensity: 2.5, roughness: 0.2 }))
    );
    hudRing.position.z = 0.16;
    logoGroup.add(hudRing);

    logoGroup.position.y = 2.8;
    logoGroup.rotation.z = THREE.MathUtils.degToRad(90);
    grupoLogoCompleto.add(logoGroup);

    scene.add(grupoLogoCompleto);

    // --- Soft additive glow halo behind the coin ---
    const haloTex = makeRadialTexture([
      [0, "rgba(214,70,255,0.85)"],
      [0.3, "rgba(176,38,255,0.45)"],
      [1, "rgba(176,38,255,0)"],
    ]);
    const halo = new THREE.Sprite(
      track(new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.9 }))
    );
    halo.position.set(0, 2.8, -0.6);
    halo.scale.set(13, 13, 1);
    scene.add(halo);

    // --- Glowing floor reflection disc ---
    const floorTex = makeRadialTexture([
      [0, "rgba(176,38,255,0.55)"],
      [0.4, "rgba(176,38,255,0.18)"],
      [1, "rgba(176,38,255,0)"],
    ]);
    const floor = new THREE.Mesh(
      track(new THREE.PlaneGeometry(20, 20)),
      track(new THREE.MeshBasicMaterial({ map: floorTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }))
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.62;
    scene.add(floor);

    // --- Floating neon particles ---
    const dotTex = makeRadialTexture([
      [0, "rgba(255,255,255,0.95)"],
      [0.35, "rgba(214,70,255,0.7)"],
      [1, "rgba(176,38,255,0)"],
    ]);
    const COUNT = 320;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cPrimary = new THREE.Color(PRIMARY);
    const cSecondary = new THREE.Color(SECONDARY);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const yy = Math.random() * 9 - 1.5;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = yy;
      positions[i * 3 + 2] = Math.sin(theta) * r;
      const col = Math.random() > 0.5 ? cPrimary : cSecondary;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    const particleGeom = track(new THREE.BufferGeometry());
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(
      particleGeom,
      track(
        new THREE.PointsMaterial({
          size: 0.16,
          map: dotTex,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
        })
      )
    );
    scene.add(particles);

    // --- Animation ---
    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      grupoLogoCompleto.rotation.y += 0.003;
      hudRing.rotation.z += 0.02;
      particles.rotation.y += 0.0007;

      const pulse = Math.sin(t * 3);
      neonGlowMaterial.emissiveIntensity = 2.6 + pulse * 0.6;
      purpleLight1.intensity = 3.2 + pulse * 0.5;
      halo.material.opacity = 0.78 + Math.sin(t * 2) * 0.12;
      halo.scale.setScalar(13 + Math.sin(t * 2) * 0.5);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- Responsiveness within the container ---
    const onResize = () => {
      const { w: nw, h: nh } = getSize();
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      controls.dispose();
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} data-testid="logo-3d" className={className} />;
};
