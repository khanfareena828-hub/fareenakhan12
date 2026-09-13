import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RefreshCw, Palette } from 'lucide-react';

interface Props {
  flavorColor?: string; // e.g. '#FFB7C5' for strawberry
  interactiveControls?: boolean;
}

export const ThreeCupcakeCanvas: React.FC<Props> = ({
  flavorColor = '#FFB7C5',
  interactiveControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFrosting, setActiveFrosting] = useState<'strawberry' | 'vanilla' | 'chocolate' | 'matcha'>('strawberry');
  const [isRotatingFast, setIsRotatingFast] = useState(false);
  const [hasExtraSprinkles, setHasExtraSprinkles] = useState(true);

  // Color mappings
  const frostingColors: Record<string, number> = {
    strawberry: 0xffadc0,
    vanilla: 0xfff3e3,
    chocolate: 0x6e4332,
    matcha: 0xb5d8a8,
  };

  const frostingMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const cupcakeGroupRef = useRef<THREE.Group | null>(null);
  const sprinklesGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (frostingMatRef.current) {
      frostingMatRef.current.color.setHex(frostingColors[activeFrosting]);
    }
  }, [activeFrosting]);

  useEffect(() => {
    if (sprinklesGroupRef.current) {
      sprinklesGroupRef.current.visible = hasExtraSprinkles;
    }
  }, [hasExtraSprinkles]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0.1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7f5, 1.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(4, 7, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    const warmFill = new THREE.DirectionalLight(0xffdfd3, 1.2);
    warmFill.position.set(-4, 3, -3);
    scene.add(warmFill);

    const softRim = new THREE.PointLight(0xff8da1, 2.2, 12);
    softRim.position.set(0, 4, -2);
    scene.add(softRim);

    // Main Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Ceramic Pink Plate / Pedestal
    const plateGroup = new THREE.Group();
    plateGroup.position.set(0, -1.05, 0);

    // Plate rim
    const plateGeo = new THREE.CylinderGeometry(2.3, 1.9, 0.18, 48);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0xffd8e2,
      roughness: 0.25,
      metalness: 0.1,
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.receiveShadow = true;
    plateGroup.add(plate);

    // Plate inner indent
    const plateInnerGeo = new THREE.CylinderGeometry(1.9, 1.7, 0.08, 48);
    const plateInnerMat = new THREE.MeshStandardMaterial({
      color: 0xffeef3,
      roughness: 0.3,
    });
    const plateInner = new THREE.Mesh(plateInnerGeo, plateInnerMat);
    plateInner.position.y = 0.06;
    plateInner.receiveShadow = true;
    plateGroup.add(plateInner);

    // Plate base foot
    const plateFootGeo = new THREE.CylinderGeometry(1.1, 1.25, 0.16, 48);
    const plateFoot = new THREE.Mesh(plateFootGeo, plateMat);
    plateFoot.position.y = -0.15;
    plateGroup.add(plateFoot);

    rootGroup.add(plateGroup);

    // --- Cupcake Object ---
    const cupcakeGroup = new THREE.Group();
    cupcakeGroup.position.set(0, -0.7, 0);
    cupcakeGroupRef.current = cupcakeGroup;
    rootGroup.add(cupcakeGroup);

    // 1. Ribbed Paper Liner
    const cupRadialSegments = 32;
    const linerGeo = new THREE.CylinderGeometry(1.02, 0.72, 1.05, cupRadialSegments, 1, false);
    // Add pleated wavy texture
    const posAttr = linerGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      const angle = Math.atan2(z, x);
      const wave = Math.sin(angle * 28) * 0.035;
      const radiusScale = 1 + wave;
      posAttr.setXYZ(i, x * radiusScale, y, z * radiusScale);
    }
    linerGeo.computeVertexNormals();

    const linerMat = new THREE.MeshStandardMaterial({
      color: 0xffded6,
      roughness: 0.6,
      bumpScale: 0.05,
    });
    const liner = new THREE.Mesh(linerGeo, linerMat);
    liner.position.y = 0.52;
    liner.castShadow = true;
    liner.receiveShadow = true;
    cupcakeGroup.add(liner);

    // 2. Sponge Cake Dome
    const spongeGeo = new THREE.SphereGeometry(0.98, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.2);
    const spongeMat = new THREE.MeshStandardMaterial({
      color: 0xd49b6a,
      roughness: 0.9,
    });
    const sponge = new THREE.Mesh(spongeGeo, spongeMat);
    sponge.position.y = 0.95;
    sponge.castShadow = true;
    cupcakeGroup.add(sponge);

    // 3. Luscious Swirled Frosting
    const frostingGroup = new THREE.Group();
    frostingGroup.position.y = 1.05;
    cupcakeGroup.add(frostingGroup);

    const frostingMat = new THREE.MeshStandardMaterial({
      color: frostingColors[activeFrosting],
      roughness: 0.38,
      metalness: 0.05,
    });
    frostingMatRef.current = frostingMat;

    // Layer 1 - Wide base swirl
    const swirlTier1Geo = new THREE.TorusGeometry(0.72, 0.38, 18, 36);
    swirlTier1Geo.rotateX(Math.PI / 2);
    const swirlTier1 = new THREE.Mesh(swirlTier1Geo, frostingMat);
    swirlTier1.position.y = 0.22;
    swirlTier1.castShadow = true;
    frostingGroup.add(swirlTier1);

    // Layer 2 - Mid swirl
    const swirlTier2Geo = new THREE.TorusGeometry(0.48, 0.34, 18, 36);
    swirlTier2Geo.rotateX(Math.PI / 2);
    const swirlTier2 = new THREE.Mesh(swirlTier2Geo, frostingMat);
    swirlTier2.position.y = 0.52;
    swirlTier2.castShadow = true;
    frostingGroup.add(swirlTier2);

    // Layer 3 - Top swirl peak
    const peakGeo = new THREE.ConeGeometry(0.36, 0.55, 24);
    const peak = new THREE.Mesh(peakGeo, frostingMat);
    peak.position.y = 0.88;
    peak.castShadow = true;
    frostingGroup.add(peak);

    // 4. Shiny Fresh Strawberry Topper
    const topperGroup = new THREE.Group();
    topperGroup.position.y = 1.22;
    frostingGroup.add(topperGroup);

    // Strawberry Body (Tapered sphere)
    const berryGeo = new THREE.SphereGeometry(0.26, 24, 24);
    const berryMat = new THREE.MeshStandardMaterial({
      color: 0xdf1f38,
      roughness: 0.22,
      metalness: 0.15,
    });
    const berry = new THREE.Mesh(berryGeo, berryMat);
    berry.scale.set(0.9, 1.25, 0.9);
    berry.rotation.z = 0.12;
    berry.castShadow = true;
    topperGroup.add(berry);

    // Strawberry Leaves
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x4aa350,
      roughness: 0.4,
    });
    for (let l = 0; l < 5; l++) {
      const leafGeo = new THREE.ConeGeometry(0.08, 0.22, 6);
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      const lAngle = (l / 5) * Math.PI * 2;
      leaf.position.set(Math.cos(lAngle) * 0.12, 0.28, Math.sin(lAngle) * 0.12);
      leaf.rotation.x = Math.sin(lAngle) * 0.7;
      leaf.rotation.z = -Math.cos(lAngle) * 0.7;
      topperGroup.add(leaf);
    }

    // 5. Sprinkles on Frosting
    const sprinklesGroup = new THREE.Group();
    sprinklesGroupRef.current = sprinklesGroup;
    frostingGroup.add(sprinklesGroup);

    const sprinkleColors = [0xffffff, 0xffd166, 0x06d6a0, 0x118ab2, 0xff70a6, 0xb388eb];
    const sprinkleGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.1, 8);

    for (let s = 0; s < 48; s++) {
      const color = sprinkleColors[s % sprinkleColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.1,
      });
      const sp = new THREE.Mesh(sprinkleGeo, mat);

      // Random position on frosting layers
      const radius = 0.35 + Math.random() * 0.45;
      const theta = Math.random() * Math.PI * 2;
      const heightVal = 0.15 + Math.random() * 0.65;

      sp.position.set(Math.cos(theta) * radius, heightVal, Math.sin(theta) * radius);
      sp.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      sp.castShadow = true;
      sprinklesGroup.add(sp);
    }

    // 6. Floating magical background particles (Hearts, Stars, Floating Sprinkles)
    const floatingDecorGroup = new THREE.Group();
    rootGroup.add(floatingDecorGroup);

    const floaters: { mesh: THREE.Mesh; speed: number; yOffset: number; rotSpeed: number }[] = [];
    const starGeo = new THREE.OctahedronGeometry(0.1, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      roughness: 0.2,
      metalness: 0.4,
    });

    for (let i = 0; i < 9; i++) {
      const star = new THREE.Mesh(starGeo, starMat);
      const ang = (i / 9) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 1.8 + Math.random() * 0.9;
      star.position.set(Math.cos(ang) * dist, 0.2 + (i % 3) * 0.7, Math.sin(ang) * dist);
      floatingDecorGroup.add(star);
      floaters.push({
        mesh: star,
        speed: 0.8 + Math.random() * 0.8,
        yOffset: star.position.y,
        rotSpeed: (Math.random() - 0.5) * 2,
      });
    }

    // Interactive mouse parallax & rotation tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseX = (clientX / rect.width) * 2 - 1;
      mouseY = -(clientY / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        cupcakeGroup.rotation.y += deltaX * 0.012;
        cupcakeGroup.rotation.x += deltaY * 0.008;
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Responsive resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth subtle floating motion
      const floatY = Math.sin(elapsedTime * 1.8) * 0.08;
      cupcakeGroup.position.y = -0.7 + floatY;

      // Gentle continuous rotation (unless user is actively dragging)
      if (!isDragging) {
        const rotSpeed = isRotatingFast ? 0.03 : 0.006;
        cupcakeGroup.rotation.y += rotSpeed;
      }

      // Parallax easing
      targetX += (mouseX * 0.4 - targetX) * 0.05;
      targetY += (mouseY * 0.25 - targetY) * 0.05;
      rootGroup.rotation.y = targetX * 0.4;
      rootGroup.rotation.x = -targetY * 0.3;

      // Animate floating stars
      floaters.forEach((item, index) => {
        item.mesh.position.y = item.yOffset + Math.sin(elapsedTime * item.speed + index) * 0.12;
        item.mesh.rotation.y += item.rotSpeed * 0.01;
        item.mesh.rotation.x += item.rotSpeed * 0.008;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotatingFast]);

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate the 3D cupcake!"
      />

      {/* Floating Pill Badges around 3D Cupcake */}
      <div className="absolute top-6 left-4 sm:left-8 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-100 shadow-soft-pink flex items-center gap-2 text-xs font-cute text-[#B84D67] pointer-events-none animate-float-slow">
        <span className="text-sm">✨</span> Handcrafted Daily
      </div>

      <div className="absolute bottom-16 right-4 sm:right-8 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-100 shadow-soft-pink flex items-center gap-2 text-xs font-cute text-[#8C5847] pointer-events-none animate-float-reverse">
        <span className="text-sm">🍓</span> Fresh Organic Strawberries
      </div>

      {/* Interactive Controls Overlay */}
      {interactiveControls && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-pink-200/80 px-4 py-2 rounded-full shadow-soft-pink flex items-center gap-3 z-10">
          <span className="text-[11px] font-bold text-[#8C5847] uppercase tracking-wider hidden sm:inline">
            Flavor:
          </span>

          <button
            id="frosting-strawberry"
            onClick={() => setActiveFrosting('strawberry')}
            title="Strawberry Frosting"
            className={`w-6 h-6 rounded-full bg-[#FFADC0] border-2 transition-transform ${
              activeFrosting === 'strawberry' ? 'scale-125 border-[#B84D67] shadow-sm' : 'border-white opacity-80'
            }`}
          />
          <button
            id="frosting-vanilla"
            onClick={() => setActiveFrosting('vanilla')}
            title="Vanilla Cream"
            className={`w-6 h-6 rounded-full bg-[#FFF3E3] border-2 transition-transform ${
              activeFrosting === 'vanilla' ? 'scale-125 border-[#D4A373] shadow-sm' : 'border-white opacity-80'
            }`}
          />
          <button
            id="frosting-chocolate"
            onClick={() => setActiveFrosting('chocolate')}
            title="Belgian Chocolate"
            className={`w-6 h-6 rounded-full bg-[#6E4332] border-2 transition-transform ${
              activeFrosting === 'chocolate' ? 'scale-125 border-[#3E2319] shadow-sm' : 'border-white opacity-80'
            }`}
          />
          <button
            id="frosting-matcha"
            onClick={() => setActiveFrosting('matcha')}
            title="Sweet Matcha"
            className={`w-6 h-6 rounded-full bg-[#B5D8A8] border-2 transition-transform ${
              activeFrosting === 'matcha' ? 'scale-125 border-[#638756] shadow-sm' : 'border-white opacity-80'
            }`}
          />

          <div className="w-[1px] h-4 bg-pink-200 mx-1" />

          {/* Extra Sprinkles Toggle */}
          <button
            id="toggle-sprinkles"
            onClick={() => setHasExtraSprinkles(!hasExtraSprinkles)}
            title="Toggle Sprinkles"
            className={`p-1 rounded-full text-xs font-cute transition-colors ${
              hasExtraSprinkles ? 'text-[#B84D67] bg-pink-50' : 'text-stone-400'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Fast Spin */}
          <button
            id="toggle-spin"
            onClick={() => setIsRotatingFast(!isRotatingFast)}
            title="Toggle Spin Speed"
            className={`p-1 rounded-full text-xs font-cute transition-colors ${
              isRotatingFast ? 'text-[#B84D67] bg-pink-50' : 'text-stone-400'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRotatingFast ? 'animate-spin' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
};
