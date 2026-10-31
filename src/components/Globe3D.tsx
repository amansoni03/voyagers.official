/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface Globe3DProps {
  className?: string;
  scrollY?: number;
}

export const Globe3D: React.FC<Globe3DProps> = ({ className = '', scrollY = 0 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const scrollYRef = useRef(scrollY);

  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability and Software WebGL
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const rendererStr = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(rendererStr));
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 640;

    // Scene setup with deep royal navy fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040d1a, 0.028);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.45, 5.2);

    // Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment Lighting (PMREM RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // Studio Rig Lighting
    const ambientLight = new THREE.AmbientLight(0x091c36, 1.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfff0d0, 0x051428, 1.6);
    scene.add(hemiLight);

    // Warm Sun Key Light
    const keyLight = new THREE.DirectionalLight(0xffeed0, 4.2);
    keyLight.position.set(5, 6, 4.5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    // Cool Deep Blue Backlight / Rim
    const rimLight = new THREE.DirectionalLight(0x3880ff, 2.8);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Golden Local Accent Light
    const goldAccent = new THREE.PointLight(0xf2cf7a, 3.5, 12);
    goldAccent.position.set(1.5, 2.5, 2.5);
    scene.add(goldAccent);

    // ==========================================
    // MASTER ASSEMBLY: REFINED ARMILLARY CELESTIAL SPHERE
    // ==========================================
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Luxury PBR Gold Materials
    const polishedGoldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5d37e,
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    const antiqueGoldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc5a052,
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 0.4,
    });

    const deepGoldBevelMaterial = new THREE.MeshStandardMaterial({
      color: 0x9e7b30,
      metalness: 0.82,
      roughness: 0.38,
    });

    // 1. Multi-tiered Antique Turned Gold Pedestal Base
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.68, 0);

    const footMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 0.12, 64), antiqueGoldMaterial);
    const tier1Mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.1, 0.14, 64), polishedGoldMaterial);
    tier1Mesh.position.y = 0.12;

    const mouldingTorus = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.07, 24, 64), polishedGoldMaterial);
    mouldingTorus.rotation.x = Math.PI / 2;
    mouldingTorus.position.y = 0.23;

    const centralStem = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.38, 0.52, 40), antiqueGoldMaterial);
    centralStem.position.y = 0.48;

    const stemBead = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), polishedGoldMaterial);
    stemBead.scale.set(1, 0.55, 1);
    stemBead.position.y = 0.65;

    const capitalDish = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.28, 0.14, 40), polishedGoldMaterial);
    capitalDish.position.y = 0.82;

    pedestalGroup.add(footMesh, tier1Mesh, mouldingTorus, centralStem, stemBead, capitalDish);
    masterGroup.add(pedestalGroup);

    // Ground Contact Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const shadowGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
    shadowGrad.addColorStop(0.45, 'rgba(4, 13, 26, 0.5)');
    shadowGrad.addColorStop(1, 'rgba(4, 13, 26, 0)');
    sCtx.fillStyle = shadowGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 3.6),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.74, 0);
    masterGroup.add(shadowMesh);

    // 2. Heavy Brass Semi-Circular Meridian Cradle
    const cradleCurve = new THREE.EllipseCurve(0, 0, 1.58, 1.58, Math.PI * 0.96, Math.PI * 2.04, false, 0);
    const cradlePoints = cradleCurve.getPoints(60);
    const cradleGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(cradlePoints.map((p) => new THREE.Vector3(p.x, p.y + 0.15, 0))),
      64,
      0.055,
      20,
      false
    );
    const cradleMesh = new THREE.Mesh(cradleGeom, polishedGoldMaterial);
    masterGroup.add(cradleMesh);

    // 3. Central Rotating Armillary System (Tilted at 23.4° Earth Axial Incline)
    const armillaryRig = new THREE.Group();
    armillaryRig.position.set(0, 0.15, 0);
    masterGroup.add(armillaryRig);

    // Axial Spindle Rod
    const polarAxis = new THREE.Group();
    polarAxis.rotation.z = THREE.MathUtils.degToRad(23.44);
    armillaryRig.add(polarAxis);

    const spindleRod = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 3.6, 32), polishedGoldMaterial);
    polarAxis.add(spindleRod);

    // North Finial (Classical Compass Spearhead)
    const finialTip = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.42, 24), polishedGoldMaterial);
    finialTip.position.set(0, 1.9, 0);
    polarAxis.add(finialTip);

    const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), polishedGoldMaterial);
    finialBall.position.set(0, 1.68, 0);
    polarAxis.add(finialBall);

    // South Finial
    const southBall = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), polishedGoldMaterial);
    southBall.position.set(0, -1.82, 0);
    polarAxis.add(southBall);

    // 4. Heavy Concentric Armillary Rings
    // A. Outer Meridian Ring (Vertical)
    const meridianRing = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.048, 20, 120), polishedGoldMaterial);
    meridianRing.rotation.y = Math.PI / 2;
    polarAxis.add(meridianRing);

    // B. Celestial Equator Ring (Horizontal Band with Bevel)
    const equatorRing = new THREE.Mesh(new THREE.TorusGeometry(1.44, 0.055, 20, 120), polishedGoldMaterial);
    equatorRing.rotation.x = Math.PI / 2;
    polarAxis.add(equatorRing);

    // Outer Equator Degree Markings Ring
    const equatorNotchRing = new THREE.Mesh(new THREE.TorusGeometry(1.47, 0.015, 16, 96), deepGoldBevelMaterial);
    equatorNotchRing.rotation.x = Math.PI / 2;
    polarAxis.add(equatorNotchRing);

    // C. Broad Ecliptic / Zodiac Ring (Tilted Ribbon)
    const eclipticRing = new THREE.Mesh(new THREE.TorusGeometry(1.36, 0.042, 20, 120), antiqueGoldMaterial);
    eclipticRing.rotation.x = Math.PI / 2;
    eclipticRing.rotation.y = THREE.MathUtils.degToRad(23.44);
    polarAxis.add(eclipticRing);

    // D. Dynamic Sweeping Outer Astronomical Hoops
    const outerHoop1 = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.024, 16, 120), polishedGoldMaterial);
    outerHoop1.rotation.set(0.6, 0.4, 0.2);
    armillaryRig.add(outerHoop1);

    const outerHoop2 = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.02, 16, 120), antiqueGoldMaterial);
    outerHoop2.rotation.set(-0.5, 0.8, -0.4);
    armillaryRig.add(outerHoop2);

    // Dynamic Inner Gyroscope Gimbal Rings
    const innerGyro1 = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.03, 16, 96), polishedGoldMaterial);
    polarAxis.add(innerGyro1);

    const innerGyro2 = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.026, 16, 96), deepGoldBevelMaterial);
    innerGyro2.rotation.y = Math.PI / 3;
    polarAxis.add(innerGyro2);

    // 5. Central Terrestrial Globe with High-Resolution Procedural Map
    const globeCanvas = document.createElement('canvas');
    globeCanvas.width = 2048;
    globeCanvas.height = 1024;
    const gCtx = globeCanvas.getContext('2d')!;

    // Deep Luminous Royal Blue Ocean Base
    const oceanGradient = gCtx.createLinearGradient(0, 0, 0, 1024);
    oceanGradient.addColorStop(0, '#040d1c');
    oceanGradient.addColorStop(0.5, '#071833');
    oceanGradient.addColorStop(1, '#040d1c');
    gCtx.fillStyle = oceanGradient;
    gCtx.fillRect(0, 0, 2048, 1024);

    // Fine Gold Longitude & Latitude Graticule
    gCtx.strokeStyle = 'rgba(197, 160, 82, 0.35)';
    gCtx.lineWidth = 1.8;

    // Latitudes
    for (let y = 64; y < 1024; y += 64) {
      gCtx.beginPath();
      gCtx.moveTo(0, y);
      gCtx.lineTo(2048, y);
      gCtx.stroke();
    }
    // Longitudes
    for (let x = 0; x <= 2048; x += 128) {
      gCtx.beginPath();
      gCtx.moveTo(x, 0);
      gCtx.lineTo(x, 1024);
      gCtx.stroke();
    }

    // Prominent Golden Equator Line
    gCtx.strokeStyle = 'rgba(245, 222, 156, 0.85)';
    gCtx.lineWidth = 3.5;
    gCtx.beginPath();
    gCtx.moveTo(0, 512);
    gCtx.lineTo(2048, 512);
    gCtx.stroke();

    // -------------------------------------------------------------------------
    // ACCURATE REAL-WORLD CONTINENTAL CARTOGRAPHY (ROYAL GOLD & NAVY)
    // Precise Equirectangular Mapping: Lon [-180, 180] -> X [0, 2048], Lat [-90, 90] -> Y [0, 1024]
    // -------------------------------------------------------------------------
    const toCanvasCoord = (lon: number, lat: number): [number, number] => {
      const clampedLon = Math.max(-179.8, Math.min(179.8, lon));
      const clampedLat = Math.max(-89.5, Math.min(89.5, lat));
      const x = ((clampedLon + 180) / 360) * 2048;
      const y = ((90 - clampedLat) / 180) * 1024;
      return [x, y];
    };

    // Draw realistic continent polygon with antique gold gradient and illuminated shorelines
    const drawContinent = (
      points: Array<[number, number]>,
      opt?: { innerHatch?: boolean; mountainRidge?: boolean }
    ) => {
      if (points.length < 3) return;
      gCtx.save();

      // Soft ambient golden shore glow
      gCtx.shadowColor = 'rgba(230, 199, 122, 0.42)';
      gCtx.shadowBlur = 10;

      // Rich Antique Gold landmass fill
      const [initX, initY] = toCanvasCoord(points[0][0], points[0][1]);
      gCtx.beginPath();
      gCtx.moveTo(initX, initY);

      for (let i = 1; i < points.length; i++) {
        const [px, py] = toCanvasCoord(points[i][0], points[i][1]);
        gCtx.lineTo(px, py);
      }
      gCtx.closePath();

      // Fill with luxurious gold gradient
      const landGrad = gCtx.createLinearGradient(0, initY - 80, 0, initY + 120);
      landGrad.addColorStop(0, '#E6C77A');
      landGrad.addColorStop(0.5, '#C5A052');
      landGrad.addColorStop(1, '#9E7D36');
      gCtx.fillStyle = landGrad;
      gCtx.fill();

      // Crisp luminous shoreline
      gCtx.shadowBlur = 0;
      gCtx.strokeStyle = '#F7E7B4';
      gCtx.lineWidth = 2.2;
      gCtx.lineJoin = 'round';
      gCtx.stroke();

      // Internal subtle bevel line
      gCtx.strokeStyle = 'rgba(255, 253, 247, 0.35)';
      gCtx.lineWidth = 1.0;
      gCtx.stroke();

      gCtx.restore();
    };

    // 1. AFRICA (Authentic shape: Horn of Africa, Cape of Good Hope, Gulf of Guinea, Maghreb)
    drawContinent([
      [-5.8, 35.8], [3.0, 36.7], [10.3, 36.8], [11.5, 33.5], [15.2, 32.3],
      [20.0, 32.1], [24.0, 32.1], [29.9, 31.2], [32.3, 31.3], [32.5, 29.9],
      [33.8, 27.8], [37.2, 19.6], [39.5, 15.6], [43.3, 12.6], [45.0, 10.4],
      [51.2, 11.8], [51.4, 10.4], [48.0, 5.0], [45.3, 2.0], [42.5, -0.4],
      [39.7, -4.0], [39.3, -6.8], [40.7, -15.0], [35.5, -19.0], [34.8, -19.8],
      [32.6, -26.0], [31.0, -29.9], [25.6, -34.0], [20.0, -34.8], [18.5, -34.3],
      [18.0, -33.0], [15.1, -26.6], [14.5, -22.9], [13.2, -12.0], [13.2, -8.8],
      [11.8, -4.8], [8.8, -0.7], [9.7, 4.0], [7.0, 4.7], [3.4, 6.4],
      [0.2, 5.5], [-4.0, 5.3], [-7.7, 4.4], [-10.8, 6.3], [-13.2, 8.5],
      [-13.7, 9.5], [-16.7, 12.0], [-17.5, 14.7], [-16.0, 18.1], [-17.0, 20.9],
      [-15.9, 23.7], [-13.2, 27.2], [-9.6, 30.4], [-7.6, 33.6], [-6.8, 34.0],
      [-5.8, 35.8]
    ]);

    // Madagascar
    drawContinent([
      [49.3, -12.0], [50.5, -15.7], [49.4, -18.2], [47.5, -23.0], [45.3, -25.6],
      [43.6, -23.4], [43.7, -20.3], [44.3, -16.0], [46.8, -15.5], [49.3, -12.0]
    ]);

    // 2. EURASIA (Europe, Scandinavia, Russia, Middle East, India, China, Indochina)
    drawContinent([
      // Europe West & North
      [-9.0, 37.0], [-9.1, 38.7], [-9.3, 42.9], [-8.0, 43.6], [-2.9, 43.3],
      [-0.6, 44.8], [-1.8, 46.5], [-4.5, 48.4], [-1.6, 49.6], [1.8, 50.9],
      [4.5, 51.9], [7.5, 53.5], [8.5, 55.5], [10.6, 57.7], [12.6, 55.7],
      [14.5, 54.0], [18.5, 54.5], [21.0, 55.5], [24.0, 57.5], [21.5, 65.0],
      [18.0, 68.0], [25.8, 71.2], [33.1, 68.9], [40.0, 67.0], [43.0, 65.5],
      [45.0, 68.0], [55.0, 68.5], [68.0, 71.0], [74.0, 66.0], [80.0, 73.0],
      [104.0, 77.5], [112.0, 74.0], [127.0, 72.0], [142.0, 72.0], [161.0, 69.5],
      [178.0, 66.5], [170.0, 63.5], [162.0, 56.5], [156.7, 50.9], [151.0, 59.5],
      [141.0, 53.0], [135.0, 48.0], [131.9, 43.1],
      // Korea & East Asia Coast
      [129.5, 41.0], [129.0, 35.1], [126.4, 34.8], [126.6, 37.5], [125.7, 39.5],
      [124.0, 40.0], [121.5, 38.8], [118.0, 39.0], [120.4, 36.1], [121.0, 33.0],
      [121.8, 31.4], [121.5, 30.0], [119.3, 26.1], [118.1, 24.5], [114.2, 22.3],
      [110.4, 21.0],
      // Indochina & Southeast Asia
      [106.7, 20.8], [108.2, 16.1], [109.2, 12.2], [107.1, 10.3], [104.5, 10.5],
      [100.5, 13.7], [99.8, 10.0], [103.8, 1.3], [102.2, 2.2], [100.3, 5.4],
      [98.4, 7.9], [96.2, 16.8], [94.0, 16.0], [92.9, 20.1], [91.8, 22.3],
      [89.5, 21.8],
      // Indian Subcontinent (Authentic Triangular Peninsula, SMS Lucknow & Voyagers Home)
      [88.1, 22.0], [85.8, 19.8], [83.3, 17.7], [81.2, 16.2], [80.3, 13.1],
      [79.8, 11.9], [79.3, 9.3], [77.5, 8.1], [76.9, 8.5], [76.3, 9.9],
      [75.8, 11.2], [74.8, 12.9], [73.8, 15.5], [72.8, 18.9], [72.7, 21.2],
      [72.1, 21.8], [70.9, 20.7], [69.6, 21.6], [68.9, 22.2], [70.2, 23.0],
      [68.7, 23.8], [67.0, 24.8], [62.3, 25.1],
      // Middle East & Mediterranean Coast
      [56.3, 27.2], [50.8, 28.9], [48.5, 30.0], [47.5, 31.0], [39.0, 33.0],
      [36.0, 35.5], [35.8, 36.6], [30.7, 36.9], [27.1, 38.4], [26.4, 40.2],
      [29.0, 41.0], [35.0, 41.8], [41.6, 41.6], [39.7, 43.6], [36.5, 45.3],
      [33.5, 44.6], [30.7, 46.5], [28.6, 44.2], [27.9, 43.2], [25.0, 41.0],
      [23.7, 37.9], [22.5, 36.4], [21.7, 38.2], [19.9, 39.6], [18.1, 42.6],
      [12.3, 45.4], [12.6, 44.1], [15.9, 41.8], [18.5, 40.1], [15.6, 38.1],
      [14.3, 40.8], [12.3, 41.7], [8.9, 44.4], [5.4, 43.3], [2.2, 41.4],
      [-0.4, 39.5], [-0.7, 37.6], [-4.4, 36.7], [-5.3, 36.1], [-6.3, 36.5],
      [-9.0, 37.0]
    ]);

    // Arabian Peninsula
    drawContinent([
      [35.0, 29.5], [38.1, 24.1], [39.2, 21.5], [42.9, 14.8], [43.4, 12.7],
      [45.0, 12.8], [49.1, 14.5], [54.1, 17.0], [59.8, 22.5], [58.6, 23.6],
      [56.4, 26.2], [54.4, 24.5], [51.5, 25.3], [48.0, 29.4], [46.0, 31.0],
      [39.0, 31.5], [35.0, 29.5]
    ]);

    // Sri Lanka (Pear-shaped island right below India)
    drawContinent([
      [80.0, 9.7], [81.2, 8.6], [81.7, 7.7], [80.6, 5.9],
      [80.2, 6.0], [79.8, 6.9], [79.8, 7.6], [80.0, 9.7]
    ]);

    // British Isles (Great Britain & Ireland)
    drawContinent([
      [1.3, 51.1], [-0.1, 50.8], [-5.7, 50.1], [-2.6, 51.5], [-5.3, 51.9],
      [-4.6, 53.3], [-4.3, 55.9], [-5.8, 57.5], [-5.0, 58.6], [-3.1, 58.6],
      [-2.1, 57.1], [-3.2, 55.9], [-1.6, 55.0], [0.3, 52.9], [1.3, 52.6],
      [1.3, 51.1]
    ]);
    drawContinent([
      [-6.3, 53.3], [-6.3, 52.3], [-8.5, 51.9], [-10.3, 52.1], [-9.1, 53.3],
      [-10.0, 54.2], [-8.5, 55.1], [-5.9, 54.6], [-6.3, 53.3]
    ]);

    // Japan Archipelago
    drawContinent([
      [140.4, 35.1], [141.0, 38.3], [141.3, 41.5], [145.2, 44.1], [144.4, 43.0],
      [140.7, 41.8], [139.0, 37.9], [136.6, 36.6], [132.5, 34.4], [130.5, 33.6],
      [131.5, 31.5], [133.5, 33.5], [136.9, 35.2], [140.4, 35.1]
    ]);

    // Indonesia & Philippines (Sumatra, Java, Borneo, Luzon)
    drawContinent([[95.3, 5.5], [98.7, 3.6], [105.8, -5.9], [102.3, -3.8], [98.6, 1.5], [95.3, 5.5]]);
    drawContinent([[105.2, -6.0], [114.4, -8.7], [112.5, -7.5], [107.0, -6.3], [105.2, -6.0]]);
    drawContinent([[109.3, 0.0], [117.5, 4.2], [118.8, 5.0], [117.2, -1.2], [114.5, -3.5], [110.0, -2.5], [109.3, 0.0]]);
    drawContinent([[120.5, 18.5], [122.5, 16.5], [124.0, 13.0], [121.5, 14.5], [120.5, 18.5]]);

    // 3. NORTH AMERICA (Alaska, Canada, Hudson Bay, US, Baja, Mexico, Florida)
    drawContinent([
      [-156.8, 71.3], [-166.2, 68.9], [-168.1, 65.6], [-165.4, 64.5], [-165.0, 62.5],
      [-158.5, 58.7], [-162.0, 55.0], [-151.0, 60.5], [-146.3, 61.1], [-139.7, 59.5],
      [-135.3, 57.0], [-130.3, 54.3], [-125.5, 49.5], [-124.0, 46.2], [-124.4, 40.4],
      [-122.5, 37.8], [-120.5, 34.4], [-117.2, 32.7], [-115.0, 30.0], [-109.9, 22.9],
      [-110.3, 24.2], [-110.9, 27.9], [-106.4, 23.2], [-105.3, 20.6], [-99.9, 16.9],
      [-95.2, 16.2], [-90.8, 13.9], [-85.4, 10.0], [-82.4, 8.3], [-80.4, 7.5],
      [-79.5, 8.9], [-77.2, 8.6], [-79.9, 9.4], [-83.1, 15.0], [-88.2, 17.5],
      [-86.8, 21.2], [-90.5, 19.8], [-96.1, 19.2], [-97.8, 22.3], [-97.1, 26.0],
      [-94.8, 29.3], [-89.2, 29.1], [-88.0, 30.7], [-82.5, 27.9], [-81.8, 24.5],
      [-80.2, 25.8], [-80.5, 28.4], [-75.5, 35.2], [-73.8, 40.7], [-70.0, 42.0],
      [-66.0, 45.0], [-63.6, 44.6], [-60.0, 46.0], [-64.5, 48.8], [-70.0, 47.0],
      [-56.0, 52.0], [-60.3, 55.5], [-64.4, 60.4], [-70.0, 62.0], [-81.0, 52.0],
      [-94.2, 58.8], [-90.7, 63.5], [-80.0, 68.0], [-85.0, 74.0], [-110.0, 71.0],
      [-135.0, 69.5], [-148.5, 70.3], [-156.8, 71.3]
    ]);

    // Greenland
    drawContinent([
      [-44.0, 59.8], [-51.7, 64.2], [-53.5, 69.2], [-56.0, 72.8], [-69.2, 77.5],
      [-39.8, 83.6], [-16.6, 81.6], [-22.0, 70.5], [-37.6, 65.6], [-44.0, 59.8]
    ]);

    // Caribbean (Cuba & Hispaniola)
    drawContinent([[-84.9, 21.9], [-82.4, 23.2], [-74.1, 20.2], [-77.0, 19.8], [-80.0, 21.4], [-84.9, 21.9]]);
    drawContinent([[-74.5, 18.6], [-72.0, 19.9], [-68.3, 18.5], [-71.0, 17.6], [-74.5, 18.6]]);

    // 4. SOUTH AMERICA (Brazil bulge, Andes spine, Patagonia, Cape Horn)
    drawContinent([
      [-77.1, 8.1], [-75.5, 10.4], [-71.7, 12.4], [-67.0, 10.6], [-60.5, 8.6],
      [-55.2, 5.8], [-51.2, 4.4], [-50.0, 0.0], [-48.5, -1.4], [-44.3, -2.5],
      [-38.5, -3.7], [-35.2, -5.5], [-34.8, -7.1], [-34.9, -8.1], [-38.5, -13.0],
      [-40.3, -20.3], [-42.0, -23.0], [-46.3, -24.0], [-48.5, -27.6], [-51.2, -30.0],
      [-53.4, -33.7], [-56.2, -34.9], [-58.4, -34.6], [-57.5, -38.0], [-62.3, -38.7],
      [-64.0, -41.0], [-63.6, -42.5], [-67.5, -46.0], [-69.2, -51.6], [-68.3, -54.8],
      [-67.3, -55.9], [-71.0, -53.0], [-75.0, -47.0], [-73.8, -41.8], [-73.1, -36.8],
      [-71.6, -33.0], [-70.4, -23.6], [-70.3, -18.5], [-76.2, -13.7], [-77.1, -12.1],
      [-79.0, -8.1], [-81.3, -4.7], [-80.0, -2.2], [-79.7, 1.0], [-77.1, 3.9],
      [-77.1, 8.1]
    ]);

    // 5. AUSTRALIA & NEW ZEALAND
    drawContinent([
      [142.5, -10.7], [141.9, -12.6], [140.8, -17.5], [137.0, -15.5], [136.5, -14.0],
      [132.0, -11.4], [130.8, -12.4], [129.0, -14.8], [122.2, -18.0], [118.6, -20.3],
      [114.1, -21.8], [113.2, -26.1], [114.6, -28.8], [115.8, -32.0], [115.1, -34.4],
      [117.9, -35.0], [121.9, -33.9], [128.9, -31.7], [133.7, -32.1], [135.9, -34.7],
      [137.8, -32.5], [138.5, -34.9], [139.8, -37.2], [143.5, -38.9], [144.9, -38.0],
      [146.4, -39.1], [150.0, -37.5], [151.2, -33.9], [153.6, -28.6], [153.0, -25.0],
      [150.5, -23.5], [146.8, -19.3], [145.8, -16.9], [142.5, -10.7]
    ]);
    // Tasmania
    drawContinent([[144.7, -40.7], [148.3, -40.8], [148.0, -42.2], [147.5, -43.6], [146.0, -43.6], [145.2, -42.2], [144.7, -40.7]]);
    // New Zealand
    drawContinent([[172.7, -34.4], [174.8, -36.9], [178.5, -37.7], [176.9, -39.5], [174.8, -41.3], [174.1, -39.0], [172.7, -34.4]]);
    drawContinent([[174.0, -41.3], [172.6, -43.5], [170.5, -45.9], [168.3, -46.6], [166.6, -44.6], [171.2, -42.5], [172.7, -40.5], [174.0, -41.3]]);

    // 6. ANTARCTICA (Realistic Polar Landmass with Antarctic Peninsula)
    drawContinent([
      [-64.0, -63.5], [-58.0, -65.5], [-62.0, -70.0], [-50.0, -74.0], [-35.0, -75.0],
      [-10.0, -70.0], [15.0, -69.0], [45.0, -67.0], [70.0, -68.0], [90.0, -66.0],
      [115.0, -66.5], [135.0, -66.0], [150.0, -68.5], [170.0, -72.0], [175.0, -78.0],
      [-170.0, -81.0], [-150.0, -76.0], [-130.0, -74.0], [-110.0, -73.0], [-90.0, -72.0],
      [-75.0, -73.0], [-64.0, -63.5]
    ]);

    // 7. GOLDEN TOPOGRAPHIC MOUNTAIN RIDGES (Himalayas, Andes, Rockies, Alps)
    const drawMountainChain = (chain: Array<[number, number]>) => {
      if (chain.length < 2) return;
      gCtx.save();
      gCtx.beginPath();
      const [sx, sy] = toCanvasCoord(chain[0][0], chain[0][1]);
      gCtx.moveTo(sx, sy);
      for (let i = 1; i < chain.length; i++) {
        const [mx, my] = toCanvasCoord(chain[i][0], chain[i][1]);
        gCtx.lineTo(mx, my);
      }
      gCtx.strokeStyle = 'rgba(255, 248, 220, 0.7)';
      gCtx.lineWidth = 2.4;
      gCtx.setLineDash([4, 3]);
      gCtx.stroke();
      gCtx.restore();
    };

    // Himalayas & Tibetan Plateau (North of India / Lucknow)
    drawMountainChain([[74.0, 34.5], [78.0, 31.0], [82.0, 29.5], [86.0, 28.0], [90.0, 27.5], [94.0, 29.0]]);
    // Andes (Western South America)
    drawMountainChain([[-74.0, 8.0], [-76.0, 0.0], [-74.0, -10.0], [-70.0, -22.0], [-70.5, -34.0], [-72.0, -45.0]]);
    // Rockies (Western North America)
    drawMountainChain([[-125.0, 56.0], [-118.0, 50.0], [-112.0, 42.0], [-106.0, 36.0]]);
    // Alps (Europe)
    drawMountainChain([[5.8, 45.2], [8.0, 46.5], [11.0, 47.0], [14.0, 46.5]]);

    // 8. SMS LUCKNOW BEACON PIN & RADIATING EXPEDITION RAYS
    // Coordinates: 80.9° E, 26.8° N (School of Management Sciences, Lucknow)
    const [lucknowX, lucknowY] = toCanvasCoord(80.9, 26.8);
    gCtx.save();

    // Radiant Gold Pulse Rings
    gCtx.strokeStyle = 'rgba(247, 231, 180, 0.85)';
    gCtx.lineWidth = 2.0;
    gCtx.beginPath();
    gCtx.arc(lucknowX, lucknowY, 14, 0, Math.PI * 2);
    gCtx.stroke();

    gCtx.strokeStyle = 'rgba(197, 160, 82, 0.5)';
    gCtx.lineWidth = 1.4;
    gCtx.beginPath();
    gCtx.arc(lucknowX, lucknowY, 26, 0, Math.PI * 2);
    gCtx.stroke();

    // Solid Beacon Core
    gCtx.fillStyle = '#FFFDF7';
    gCtx.shadowColor = '#F7E7B4';
    gCtx.shadowBlur = 12;
    gCtx.beginPath();
    gCtx.arc(lucknowX, lucknowY, 5.0, 0, Math.PI * 2);
    gCtx.fill();

    // 4-Point Golden Compass Star
    gCtx.strokeStyle = '#F7E7B4';
    gCtx.lineWidth = 2.0;
    gCtx.beginPath();
    gCtx.moveTo(lucknowX, lucknowY - 18);
    gCtx.lineTo(lucknowX, lucknowY + 18);
    gCtx.moveTo(lucknowX - 18, lucknowY);
    gCtx.lineTo(lucknowX + 18, lucknowY);
    gCtx.stroke();
    gCtx.restore();

    // Antique Cartographic Wind Roses / Compass Crosses on Oceans
    const drawCompassRose = (cx: number, cy: number, r: number) => {
      gCtx.save();
      gCtx.strokeStyle = 'rgba(197, 160, 82, 0.45)';
      gCtx.lineWidth = 1.2;
      gCtx.beginPath();
      gCtx.arc(cx, cy, r, 0, Math.PI * 2);
      gCtx.stroke();
      gCtx.beginPath();
      gCtx.moveTo(cx, cy - r * 1.4);
      gCtx.lineTo(cx, cy + r * 1.4);
      gCtx.moveTo(cx - r * 1.4, cy);
      gCtx.lineTo(cx + r * 1.4, cy);
      gCtx.stroke();
      gCtx.restore();
    };
    drawCompassRose(840, 360, 24);  // Atlantic
    drawCompassRose(1580, 560, 26); // Indian Ocean
    drawCompassRose(280, 520, 28);  // Pacific Ocean

    // Fine Constellation Stardust across Oceans
    gCtx.fillStyle = '#FFFDF7';
    for (let s = 0; s < 260; s++) {
      const sx = (Math.sin(s * 71.3) * 0.5 + 0.5) * 2048;
      const sy = (Math.cos(s * 39.7) * 0.5 + 0.5) * 1024;
      const sRad = (s % 7 === 0) ? 2.2 : 1.1;
      gCtx.beginPath();
      gCtx.arc(sx, sy, sRad, 0, Math.PI * 2);
      gCtx.fill();
    }

    const globeTexture = new THREE.CanvasTexture(globeCanvas);
    globeTexture.colorSpace = THREE.SRGBColorSpace;
    globeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const globeGeom = new THREE.SphereGeometry(0.86, 64, 48);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
      map: globeTexture,
      roughness: 0.18,
      metalness: 0.65,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      emissive: 0x06152a,
      emissiveIntensity: 0.5,
    });

    const coreGlobe = new THREE.Mesh(globeGeom, globeMaterial);
    polarAxis.add(coreGlobe);

    // Glowing Atmospheric Aura Mesh
    const atmoGeom = new THREE.SphereGeometry(0.91, 32, 32);
    const atmoMaterial = new THREE.MeshBasicMaterial({
      color: 0xe6c77a,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const atmoMesh = new THREE.Mesh(atmoGeom, atmoMaterial);
    polarAxis.add(atmoMesh);

    // 6. Orbiting Golden Celestial Satellites
    const sat1Geom = new THREE.SphereGeometry(0.045, 16, 16);
    const satMaterial = new THREE.MeshBasicMaterial({ color: 0xfff0b0 });
    const satellite1 = new THREE.Mesh(sat1Geom, satMaterial);
    armillaryRig.add(satellite1);

    const sat2Geom = new THREE.SphereGeometry(0.038, 16, 16);
    const satellite2 = new THREE.Mesh(sat2Geom, satMaterial);
    armillaryRig.add(satellite2);

    // 7. Golden Stardust Cosmic Particle Cloud
    const particleCount = 280;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      const r = 1.7 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[p * 3] = r * Math.cos(phi) * Math.cos(theta);
      particlePositions[p * 3 + 1] = r * Math.sin(phi);
      particlePositions[p * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5de9c,
      size: 0.048,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    masterGroup.add(particles);

    // ==========================================
    // INTERACTION & ANIMATION LOOP
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        targetRotY += deltaX * 0.009;
        targetRotX += deltaY * 0.009;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      } else {
        mouseX = normX * 0.4;
        mouseY = normY * 0.28;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    window.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Passive scroll listener (0 React re-renders)
    const handlePassiveScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handlePassiveScroll, { passive: true });

    // IntersectionObserver to pause Three.js rendering when off-screen
    let isGlobeVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isGlobeVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    const clock = new THREE.Clock();
    let frameId: number;

    const tick = () => {
      frameId = requestAnimationFrame(tick);

      // Skip render if off-screen to free GPU/CPU for page scrolling & flips
      if (!isGlobeVisible) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Continuous rotation of the core globe
      coreGlobe.rotation.y += delta * 0.25;
      atmoMesh.rotation.y += delta * 0.18;

      // Dynamic inner gyro rotations
      innerGyro1.rotation.x = Math.sin(time * 0.55) * 0.45;
      innerGyro1.rotation.y = time * 0.32;
      innerGyro2.rotation.z = Math.cos(time * 0.45) * 0.55;

      // Outer sweeping astronomical hoops
      outerHoop1.rotation.y = time * 0.12;
      outerHoop2.rotation.x = time * 0.09;

      // Orbiting satellites
      const sat1Angle = time * 0.85;
      satellite1.position.set(
        Math.cos(sat1Angle) * 1.72,
        Math.sin(sat1Angle * 0.8) * 0.6,
        Math.sin(sat1Angle) * 1.72
      );

      const sat2Angle = -time * 0.65;
      satellite2.position.set(
        Math.cos(sat2Angle) * 1.85,
        Math.sin(sat2Angle * 1.85) * 0.5,
        Math.sin(sat2Angle * 0.7) * 1.2
      );

      // Stardust cloud
      particles.rotation.y = time * 0.035;

      // Scroll-based rotation influence
      const scrollInfluence = (scrollYRef.current / Math.max(window.innerHeight, 1)) * 0.85;

      // Silky smooth damping for mouse parallax & drag
      const curTargetY = targetRotY + mouseX + scrollInfluence;
      const curTargetX = targetRotX - mouseY * 0.5;

      masterGroup.rotation.y = THREE.MathUtils.damp(masterGroup.rotation.y, curTargetY, 4.8, delta);
      masterGroup.rotation.x = THREE.MathUtils.damp(masterGroup.rotation.x, curTargetX, 4.8, delta);

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      window.removeEventListener('scroll', handlePassiveScroll);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      globeTexture.dispose();
      shadowTex.dispose();
      particleGeom.dispose();
      globeGeom.dispose();
      atmoGeom.dispose();
      cradleGeom.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-80 h-80 rounded-full border border-[#C5A052]/40 bg-radial from-[#0A1E3B] to-[#040D1A] flex flex-col items-center justify-center p-6 text-center shadow-2xl">
          <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#E6C77A]/60 flex items-center justify-center">
            <span className="font-serif-royal text-2xl text-[#E6C77A] font-semibold">VOYAGERS</span>
          </div>
          <span className="text-xs text-[#C5A052] mt-4 tracking-widest uppercase">Celestial Armillary Sphere</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full h-full min-h-[480px] lg:min-h-[580px] cursor-grab active:cursor-grabbing transition-transform duration-300 ${
          isInteracting ? 'scale-[1.02]' : ''
        }`}
        title="Click & Drag to rotate the Celestial Armillary Sphere"
      />

      {/* Subtle Atmospheric Backdrop Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] rounded-full bg-radial from-[#C5A052]/15 via-[#0A1E3B]/25 to-transparent blur-3xl" />
      </div>

      {/* Interactive Micro-Cue */}
      <div className="absolute bottom-2 right-4 md:right-8 pointer-events-none text-[11px] tracking-wider uppercase text-[#C5A052]/70 font-medium bg-[#07182F]/70 px-2.5 py-1 rounded-md border border-[#C5A052]/30 backdrop-blur-sm">
        ✦ Drag to rotate sphere
      </div>
    </div>
  );
};
