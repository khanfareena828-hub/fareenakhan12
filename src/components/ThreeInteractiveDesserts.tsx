import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Info, RotateCw } from 'lucide-react';

type DessertType = 'cake' | 'donut' | 'cookie' | 'waffle' | 'baking_tools';

export const ThreeInteractiveDesserts: React.FC = () => {
  const [selectedType, setSelectedType] = useState<DessertType>('donut');
  const containerRef = useRef<HTMLDivElement>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 4.2);
    camera.lookAt(0, 0, 0);

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
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f5, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(3, 5, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const backRim = new THREE.DirectionalLight(0xffd5df, 1.4);
    backRim.position.set(-3, -2, -3);
    scene.add(backRim);

    // Root Group for switching models
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // Helper to build model based on selectedType
    const buildModel = () => {
      // Clear previous children
      while (group.children.length > 0) {
        group.remove(group.children[0]);
      }

      if (selectedType === 'donut') {
        // Dough Torus
        const doughGeo = new THREE.TorusGeometry(1.0, 0.44, 28, 48);
        const doughMat = new THREE.MeshStandardMaterial({
          color: 0xdeb887,
          roughness: 0.65,
        });
        const donutDough = new THREE.Mesh(doughGeo, doughMat);
        donutDough.castShadow = true;
        group.add(donutDough);

        // Pink Strawberry Icing (Slightly larger partial torus on top)
        const icingGeo = new THREE.TorusGeometry(1.0, 0.46, 24, 48, Math.PI * 1.6);
        const icingMat = new THREE.MeshStandardMaterial({
          color: 0xff70a6,
          roughness: 0.25,
          metalness: 0.1,
        });
        const icing = new THREE.Mesh(icingGeo, icingMat);
        icing.rotation.x = 0.1;
        icing.position.z = 0.05;
        icing.castShadow = true;
        group.add(icing);

        // Sprinkles on donut
        const sprinkleColors = [0xffffff, 0xffbe0b, 0x3a86ff, 0x06d6a0, 0xff006e];
        for (let i = 0; i < 35; i++) {
          const spGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 8);
          const spMat = new THREE.MeshStandardMaterial({
            color: sprinkleColors[i % sprinkleColors.length],
            roughness: 0.3,
          });
          const sp = new THREE.Mesh(spGeo, spMat);
          const theta = (i / 35) * Math.PI * 2 + (Math.random() * 0.2);
          const r = 0.95 + (Math.random() - 0.5) * 0.35;
          sp.position.set(Math.cos(theta) * r, Math.sin(theta) * r, 0.36 + Math.random() * 0.12);
          sp.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          group.add(sp);
        }
      } else if (selectedType === 'cake') {
        // Tiered Cake
        // Tier 1 (Base)
        const baseGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.7, 36);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0xfff0f5,
          roughness: 0.35,
        });
        const tier1 = new THREE.Mesh(baseGeo, baseMat);
        tier1.position.y = -0.35;
        tier1.castShadow = true;
        group.add(tier1);

        // Base ribbon/cream border
        const ribbonGeo = new THREE.TorusGeometry(1.16, 0.08, 16, 36);
        ribbonGeo.rotateX(Math.PI / 2);
        const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xffa0b8 });
        const ribbon1 = new THREE.Mesh(ribbonGeo, ribbonMat);
        ribbon1.position.y = -0.68;
        group.add(ribbon1);

        // Tier 2 (Top)
        const topGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.65, 36);
        const topMat = new THREE.MeshStandardMaterial({
          color: 0xffe2eb,
          roughness: 0.35,
        });
        const tier2 = new THREE.Mesh(topGeo, topMat);
        tier2.position.y = 0.32;
        tier2.castShadow = true;
        group.add(tier2);

        // Cherries on top
        for (let c = 0; c < 5; c++) {
          const cherryGeo = new THREE.SphereGeometry(0.12, 16, 16);
          const cherryMat = new THREE.MeshStandardMaterial({
            color: 0xd90429,
            roughness: 0.2,
            metalness: 0.2,
          });
          const cherry = new THREE.Mesh(cherryGeo, cherryMat);
          const ang = (c / 5) * Math.PI * 2;
          cherry.position.set(Math.cos(ang) * 0.45, 0.72, Math.sin(ang) * 0.45);
          group.add(cherry);
        }
      } else if (selectedType === 'cookie') {
        // Chunky Chocolate Chip Cookie
        const cookieGeo = new THREE.CylinderGeometry(1.1, 1.05, 0.32, 28);
        const cookieMat = new THREE.MeshStandardMaterial({
          color: 0xc89666,
          roughness: 0.85,
        });
        const cookie = new THREE.Mesh(cookieGeo, cookieMat);
        cookie.rotation.x = 0.5;
        cookie.castShadow = true;
        group.add(cookie);

        // Chocolate chips
        for (let j = 0; j < 16; j++) {
          const chipGeo = new THREE.DodecahedronGeometry(0.12, 0);
          const chipMat = new THREE.MeshStandardMaterial({
            color: 0x3d2314,
            roughness: 0.4,
          });
          const chip = new THREE.Mesh(chipGeo, chipMat);
          const radius = Math.random() * 0.8;
          const angle = Math.random() * Math.PI * 2;
          chip.position.set(
            Math.cos(angle) * radius,
            0.15 * Math.cos(0.5) - Math.sin(angle) * radius * Math.sin(0.5) * 0.3,
            Math.sin(angle) * radius * Math.cos(0.5) + 0.15 * Math.sin(0.5)
          );
          chip.rotation.set(Math.random(), Math.random(), Math.random());
          group.add(chip);
        }
      } else if (selectedType === 'waffle') {
        // Golden Belgian Waffle
        const waffleGeo = new THREE.BoxGeometry(1.6, 0.28, 1.6);
        const waffleMat = new THREE.MeshStandardMaterial({
          color: 0xe0a96d,
          roughness: 0.7,
        });
        const waffle = new THREE.Mesh(waffleGeo, waffleMat);
        waffle.rotation.x = 0.45;
        waffle.rotation.y = 0.3;
        waffle.castShadow = true;
        group.add(waffle);

        // Butter cube on top
        const butterGeo = new THREE.BoxGeometry(0.35, 0.25, 0.35);
        const butterMat = new THREE.MeshStandardMaterial({
          color: 0xffea79,
          roughness: 0.3,
        });
        const butter = new THREE.Mesh(butterGeo, butterMat);
        butter.position.set(0.1, 0.26, 0.1);
        butter.rotation.y = 0.25;
        group.add(butter);
      } else if (selectedType === 'baking_tools') {
        // Whisk, Rolling pin & mixing bowl
        // 1. Ceramic Mixing Bowl
        const bowlGeo = new THREE.SphereGeometry(0.9, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
        const bowlMat = new THREE.MeshStandardMaterial({
          color: 0xffc4d6,
          roughness: 0.25,
          side: THREE.DoubleSide,
        });
        const bowl = new THREE.Mesh(bowlGeo, bowlMat);
        bowl.position.set(-0.5, -0.3, 0);
        bowl.rotation.x = Math.PI;
        group.add(bowl);

        // 2. Rolling Pin
        const pinGeo = new THREE.CylinderGeometry(0.16, 0.16, 1.8, 16);
        const pinMat = new THREE.MeshStandardMaterial({
          color: 0xd4a373,
          roughness: 0.5,
        });
        const pin = new THREE.Mesh(pinGeo, pinMat);
        pin.position.set(0.6, 0.2, 0.2);
        pin.rotation.z = -0.7;
        pin.rotation.x = 0.3;
        group.add(pin);

        // 3. Whisk wires
        const whiskMat = new THREE.MeshStandardMaterial({
          color: 0xb0b0b0,
          roughness: 0.2,
          metalness: 0.8,
        });
        for (let w = 0; w < 3; w++) {
          const torus = new THREE.TorusGeometry(0.35, 0.025, 12, 24);
          const wire = new THREE.Mesh(torus, whiskMat);
          wire.position.set(-0.4, 0.3, 0.3);
          wire.rotation.y = (w / 3) * Math.PI;
          wire.rotation.x = 0.5;
          group.add(wire);
        }
      }
    };

    buildModel();

    // Mouse drag rotation
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        group.rotation.y += 0.008;
      }
      group.position.y = Math.sin(elapsed * 1.5) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      ro.disconnect();
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedType]);

  const items: { type: DessertType; label: string; icon: string }[] = [
    { type: 'donut', label: 'Glazed Donut', icon: '🍩' },
    { type: 'cake', label: 'Tiered Cake', icon: '🎂' },
    { type: 'cookie', label: 'Choco Cookie', icon: '🍪' },
    { type: 'waffle', label: 'Belgian Waffle', icon: '🧇' },
    { type: 'baking_tools', label: 'Bakery Tools', icon: '🥣' },
  ];

  return (
    <div className="bg-gradient-to-b from-[#FFF0F4] to-[#FFF8F8] border border-pink-100 rounded-3xl p-6 sm:p-8 shadow-soft-pink text-center relative overflow-hidden">
      {/* Decorative cute sparkle dots */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-peach-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full border border-pink-200/60 shadow-xs mb-3">
        <Sparkles className="w-4 h-4 text-[#B84D67]" />
        <span className="text-xs font-bold uppercase tracking-wider text-[#B84D67]">
          Interactive 3D Treats Studio
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-handwriting text-[#543834] font-bold">
        Spin & Discover Fresh Delights ♡
      </h3>
      <p className="text-xs sm:text-sm text-[#8C5847] max-w-md mx-auto mt-1 mb-4 font-body">
        Drag your finger or cursor to rotate in real-time 3D WebGL!
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {items.map((item) => (
          <button
            key={item.type}
            id={`tab-3d-${item.type}`}
            onClick={() => setSelectedType(item.type)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-cute transition-all flex items-center gap-1.5 shadow-xs ${
              selectedType === item.type
                ? 'bg-[#B84D67] text-white shadow-soft-pink scale-105'
                : 'bg-white/90 text-[#8C5847] hover:bg-pink-50 border border-pink-100'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full h-64 sm:h-72 mx-auto flex items-center justify-center">
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          title="Drag to rotate!"
        />
        <div className="absolute bottom-2 right-4 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] text-[#8C5847] flex items-center gap-1 border border-pink-100 pointer-events-none">
          <RotateCw className="w-3 h-3 text-[#B84D67] animate-spin" />
          <span>360° Drag & Inspect</span>
        </div>
      </div>
    </div>
  );
};
