import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LOGO_SVG } from "./logoSvgData";

// 3D rotating SYSTEM O-JDEV logo (coin + neon pedestal) rendered with Three.js.
// Transparent background so it blends with the neon hero section.
export const Logo3D = ({ className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSize = () => ({
      w: container.clientWidth || 1,
      h: container.clientHeight || 1,
    });

    const { w, h } = getSize();

    // --- Scene / camera / renderer ---
    const scene = new THREE.Scene(); // transparent (no background)
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.outline = "none";

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // keep page scroll working
    controls.enablePan = false;
    controls.autoRotate = false;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.target.set(0, 2, 0);

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const purpleLight1 = new THREE.PointLight(0xbc00ff, 3, 15);
    purpleLight1.position.set(0, 2, 3);
    scene.add(purpleLight1);

    const purpleLight2 = new THREE.PointLight(0xbc00ff, 2, 10);
    purpleLight2.position.set(0, -2, -3);
    scene.add(purpleLight2);

    // --- Logo texture from embedded SVG ---
    const svgBlob = new Blob([LOGO_SVG], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(svgUrl, () => URL.revokeObjectURL(svgUrl));
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    // --- Materials ---
    const purpleMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a009d,
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1.0,
    });
    const neonGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xbf00ff,
      emissive: 0xbc00ff,
      emissiveIntensity: 3,
      roughness: 0.1,
    });
    const darkBaseMaterial = new THREE.MeshStandardMaterial({
      color: 0x150025,
      metalness: 0.9,
      roughness: 0.3,
    });
    const faceMaterial = new THREE.MeshStandardMaterial({
      map: logoTexture,
      roughness: 0.3,
      metalness: 0.1,
    });

    // --- Build objects ---
    const grupoLogoCompleto = new THREE.Group();

    const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.6, 0.6, 64), darkBaseMaterial);
    baseMesh.position.y = -0.3;
    grupoLogoCompleto.add(baseMesh);

    const neonRingMesh = new THREE.Mesh(new THREE.CylinderGeometry(3.55, 3.55, 0.1, 64), neonGlowMaterial);
    neonRingMesh.position.y = -0.15;
    grupoLogoCompleto.add(neonRingMesh);

    const subBaseMesh = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 3.7, 0.05, 64), neonGlowMaterial);
    subBaseMesh.position.y = -0.58;
    grupoLogoCompleto.add(subBaseMesh);

    const logoGroup = new THREE.Group();
    const coinGeom = new THREE.CylinderGeometry(3, 3, 0.3, 128);
    coinGeom.rotateX(Math.PI / 2);
    const coinMesh = new THREE.Mesh(coinGeom, [purpleMetalMaterial, faceMaterial, purpleMetalMaterial]);
    logoGroup.add(coinMesh);

    const torMesh1 = new THREE.Mesh(new THREE.TorusGeometry(3, 0.08, 16, 100), purpleMetalMaterial);
    torMesh1.position.z = 0.15;
    logoGroup.add(torMesh1);

    const torMesh2 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.04, 16, 100), neonGlowMaterial);
    torMesh2.position.z = 0.16;
    logoGroup.add(torMesh2);

    logoGroup.position.y = 2.8;
    logoGroup.rotation.z = THREE.MathUtils.degToRad(90);
    grupoLogoCompleto.add(logoGroup);

    scene.add(grupoLogoCompleto);

    // --- Animation ---
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      grupoLogoCompleto.rotation.y += 0.003;
      const time = Date.now() * 0.003;
      neonGlowMaterial.emissiveIntensity = 2.5 + Math.sin(time) * 0.5;
      purpleLight1.intensity = 3 + Math.sin(time) * 0.5;
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
      logoTexture.dispose();
      [purpleMetalMaterial, neonGlowMaterial, darkBaseMaterial, faceMaterial].forEach((m) => m.dispose());
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} data-testid="logo-3d" className={className} />;
};
