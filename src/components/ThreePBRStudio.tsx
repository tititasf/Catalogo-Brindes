import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreePBRStudioProps {
  productId: string;
  brandColor: string;
  logoText: string;
  activeTechnique: string;
  logoType?: "text" | "upload";
  logoUrl?: string;
  isExploded?: boolean;
}

export function ThreePBRStudio({
  productId,
  brandColor,
  logoText,
  activeTechnique,
  logoType = "text",
  logoUrl,
  isExploded = false,
}: ThreePBRStudioProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep refs of scene objects to update them dynamically when props change
  const logoTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const productMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);

  // Keep track of animated parts for exploded view
  const capMeshRef = useRef<THREE.Mesh | null>(null);
  const bodyMeshRef = useRef<THREE.Mesh | null>(null);
  const internalMeshRef = useRef<THREE.Mesh | null>(null);

  // Helper to draw a crisp logo onto a high-res hidden canvas for 3D projection
  const createLogoCanvasTexture = (text: string, color: string, tech: string, type: "text" | "upload", url?: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const renderTechniqueEffect = (isUpload: boolean = false) => {
      // Clear transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Technique-based styling
      let textColor = "#ffffff";
      let isMetallic = false;

      if (tech === "laser") {
        const isWood = productId.includes("bambu") || productId.includes("vinho") || productId.includes("churrasco");
        textColor = isWood ? "#241408" : "#d1d5db"; // Engraved brown vs silver metal
        isMetallic = !isWood;
      } else if (tech === "hot_stamping") {
        textColor = "#eab308"; // Gold foil
        isMetallic = true;
      } else if (tech === "debossing") {
        textColor = "#1e140c"; // Deep dark leather press
      } else {
        textColor = color; // Brand color
      }

      ctx.shadowColor = tech === "debossing" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)";
      ctx.shadowBlur = tech === "debossing" ? 12 : 4;
      ctx.shadowOffsetX = tech === "debossing" ? -4 : 1;
      ctx.shadowOffsetY = tech === "debossing" ? -4 : 1;

      if (isUpload && url) {
        // Draw image instead of text
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          // Calculate scale to fit inside 80% of canvas
          const scale = Math.min((canvas.width * 0.8) / img.width, (canvas.height * 0.8) / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          if (tech === "uv" || tech === "dtg" || tech === "sublimacao" || tech === "resinada") {
            // Keep original colors for colorful prints
            ctx.drawImage(img, x, y, w, h);
          } else {
            // Silhouette mono coloring (laser, hotstamping, etc)
            // First draw image
            ctx.drawImage(img, x, y, w, h);
            // Then colorize it using global composite operation
            ctx.globalCompositeOperation = "source-in";
            
            if (isMetallic) {
              const grad = ctx.createLinearGradient(0, y, 0, y + h);
              grad.addColorStop(0, "#ffffff");
              grad.addColorStop(0.3, textColor);
              grad.addColorStop(0.5, "#ffffff");
              grad.addColorStop(0.7, textColor);
              grad.addColorStop(1, "#111111");
              ctx.fillStyle = grad;
            } else {
              ctx.fillStyle = textColor;
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over"; // Reset
          }

          // Add QA Grid around it
          ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
          ctx.lineWidth = 2;
          ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
          
          texture.needsUpdate = true;
        };
        img.src = url;
      } else {
        // Draw Text
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const safeText = (text || "OPUS CO.").toUpperCase();
        ctx.font = "bold 64px 'Inter', sans-serif";
        
        if (isMetallic) {
          const grad = ctx.createLinearGradient(0, 300, 0, 700);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.3, textColor);
          grad.addColorStop(0.5, "#ffffff");
          grad.addColorStop(0.7, textColor);
          grad.addColorStop(1, "#111111");
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = textColor;
        }

        ctx.fillText(safeText, canvas.width / 2, canvas.height / 2 - 20);

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "500 24px 'JetBrains Mono', monospace";
        ctx.letterSpacing = "6px";
        ctx.fillText("B2B PREMIUM SHOWROOM", canvas.width / 2, canvas.height / 2 + 60);

        ctx.fillStyle = textColor;
        ctx.font = "bold 18px 'JetBrains Mono', monospace";
        ctx.fillText(`GRAVAÇÃO: ${tech.toUpperCase()}`, canvas.width / 2, canvas.height / 2 + 120);
        
        texture.needsUpdate = true;
      }
    };

    renderTechniqueEffect(type === "upload");
    return texture;
  };

  // Setup Three.js environment
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 500;
    const height = mountRef.current.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#030303");
    scene.fog = new THREE.FogExp2("#030303", 0.12);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.appendChild(renderer.domElement);

    // 4. Studio Lighting Configuration (Three-point HDRI simulation)
    const ambientLight = new THREE.AmbientLight("#111111", 1.5);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight("#ffffff", 2.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight("#ffffff", 0.8);
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    // Rim Light (custom accent synced to brand color)
    const rimLightColor = new THREE.Color(brandColor);
    const rimLight = new THREE.PointLight(rimLightColor, 3.0, 15);
    rimLight.position.set(-3, 2, 3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Floor Grid & Shadow receiver
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.9;
    floor.receiveShadow = true;
    scene.add(floor);

    // Tech grid overlay for QA feeling
    const gridHelper = new THREE.GridHelper(10, 20, "rgba(20, 184, 166, 0.3)", "rgba(255, 255, 255, 0.05)");
    gridHelper.position.y = -0.89;
    scene.add(gridHelper);

    // 5. Build High-Fidelity 3D Geometries dynamically to ensure zero alucinações
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);
    objectsGroupRef.current = objectsGroup;

    // Create dynamic brand texture
    const logoTex = createLogoCanvasTexture(logoText, brandColor, activeTechnique, logoType, logoUrl);
    if (logoTex) logoTextureRef.current = logoTex;

    // Establish PBR Material settings based on requested technique
    let metalness = 0.1;
    let roughness = 0.5;
    if (activeTechnique === "laser") {
      metalness = 0.9;
      roughness = 0.25;
    } else if (activeTechnique === "hot_stamping") {
      metalness = 0.95;
      roughness = 0.12;
    } else if (activeTechnique === "debossing") {
      metalness = 0.05;
      roughness = 0.75;
    }

    const materialColor = productId.includes("garrafa") || productId.includes("copo") ? "#111112" : "#1a1a1a";

    const productMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(materialColor),
      roughness: roughness,
      metalness: metalness,
      bumpScale: 0.05,
      envMapIntensity: 1.0,
    });
    productMaterialRef.current = productMaterial;

    // Build specific PBR parts based on product category
    if (productId.includes("garrafa") || productId.includes("copo") || productId.includes("squeeze")) {
      // Sleek Corporate Vacuum Bottle Model
      // Cylinder body
      const bodyGeo = new THREE.CylinderGeometry(0.38, 0.38, 1.4, 64);
      const bodyMesh = new THREE.Mesh(bodyGeo, productMaterial);
      bodyMesh.position.y = -0.1;
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      objectsGroup.add(bodyMesh);
      bodyMeshRef.current = bodyMesh;

      // Chrome Ring Accent
      const ringGeo = new THREE.CylinderGeometry(0.385, 0.385, 0.04, 64);
      const ringMat = new THREE.MeshStandardMaterial({ color: "#cccccc", metalness: 0.9, roughness: 0.1 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.y = 0.62;
      bodyMesh.add(ringMesh);

      // Smart LED Cap (movable in exploded views)
      const capGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.22, 64);
      const capMat = new THREE.MeshStandardMaterial({ color: "#111111", metalness: 0.8, roughness: 0.2 });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = 0.75;
      capMesh.castShadow = true;
      objectsGroup.add(capMesh);
      capMeshRef.current = capMesh;

      // Blue LED display ring inside the cap
      const displayGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.02, 32);
      const displayMat = new THREE.MeshBasicMaterial({ color: "#06b6d4" }); // Glowing teal cyan
      const displayMesh = new THREE.Mesh(displayGeo, displayMat);
      displayMesh.position.y = 0.11;
      capMesh.add(displayMesh);

      // Apply logo texturing to cylindrical body using dynamic decal mapping
      if (logoTextureRef.current) {
        // We can map the logo onto a separate slightly outer cylinder to prevent z-fighting
        const decalGeo = new THREE.CylinderGeometry(0.383, 0.383, 0.7, 64, 1, true, -Math.PI / 2.5, Math.PI / 1.25);
        const decalMat = new THREE.MeshStandardMaterial({
          map: logoTextureRef.current,
          transparent: true,
          roughness: roughness,
          metalness: metalness,
          side: THREE.DoubleSide
        });
        const decalMesh = new THREE.Mesh(decalGeo, decalMat);
        decalMesh.position.y = 0.0;
        bodyMesh.add(decalMesh);
      }

    } else if (productId.includes("powerbank") || productId.includes("caderno") || productId.includes("planner")) {
      // Rounded Notebook / Powerbank box profile
      const roundedBoxGeo = new THREE.BoxGeometry(0.75, 1.1, 0.12);
      const bodyMesh = new THREE.Mesh(roundedBoxGeo, productMaterial);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      objectsGroup.add(bodyMesh);
      bodyMeshRef.current = bodyMesh;

      // Exploded View inner battery/pages representation
      const coreGeo = new THREE.BoxGeometry(0.72, 1.05, 0.1);
      const coreMat = new THREE.MeshStandardMaterial({ 
        color: productId.includes("powerbank") ? brandColor : "#eae5da", 
        metalness: productId.includes("powerbank") ? 0.7 : 0.0, 
        roughness: 0.5 
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.z = 0;
      objectsGroup.add(coreMesh);
      internalMeshRef.current = coreMesh;

      // Apply logo texturing on the front plate of block
      if (logoTextureRef.current) {
        const logoPlateGeo = new THREE.PlaneGeometry(0.68, 0.68);
        const logoPlateMat = new THREE.MeshStandardMaterial({
          map: logoTextureRef.current,
          transparent: true,
          roughness: roughness,
          metalness: metalness,
          depthWrite: false,
        });
        const logoPlateMesh = new THREE.Mesh(logoPlateGeo, logoPlateMat);
        logoPlateMesh.position.set(0, 0, 0.062);
        bodyMesh.add(logoPlateMesh);
      }
    } else {
      // Generic high-fidelity B2B sample plate/block with chamfered edges
      const samplePlateGeo = new THREE.BoxGeometry(0.9, 0.9, 0.08);
      const bodyMesh = new THREE.Mesh(samplePlateGeo, productMaterial);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      objectsGroup.add(bodyMesh);
      bodyMeshRef.current = bodyMesh;

      if (logoTextureRef.current) {
        const logoPlateGeo = new THREE.PlaneGeometry(0.8, 0.8);
        const logoPlateMat = new THREE.MeshStandardMaterial({
          map: logoTextureRef.current,
          transparent: true,
          roughness: roughness,
          metalness: metalness,
          depthWrite: false,
        });
        const logoPlateMesh = new THREE.Mesh(logoPlateGeo, logoPlateMat);
        logoPlateMesh.position.set(0, 0, 0.042);
        bodyMesh.add(logoPlateMesh);
      }
    }

    setLoading(false);

    // 6. Smooth Custom Drag Orbit Controls without external package bugs
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = 0.007;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !objectsGroup) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      objectsGroup.rotation.y += deltaMove.x * rotationSpeed;
      objectsGroup.rotation.x += deltaMove.y * rotationSpeed;

      // Limit pitch (vertical rotation) to prevent flipping
      objectsGroup.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, objectsGroup.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile clients
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !objectsGroup || e.touches.length !== 1) return;

      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      };

      objectsGroup.rotation.y += deltaMove.x * rotationSpeed * 1.5;
      objectsGroup.rotation.x += deltaMove.y * rotationSpeed * 1.5;
      objectsGroup.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, objectsGroup.rotation.x));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    // Event listeners binding
    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    domEl.addEventListener("touchstart", handleTouchStart);
    domEl.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // 7. Animation tick loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.015;

      // Gentle auto-rotation when user is not actively dragging
      if (!isDragging && objectsGroup) {
        objectsGroup.rotation.y += 0.003;
        // Float effect
        objectsGroup.position.y = Math.sin(time) * 0.04;
      }

      // Handle Exploded View animations programmatically based on state
      if (isExploded) {
        // Cap moves up
        if (capMeshRef.current) {
          capMeshRef.current.position.y = THREE.MathUtils.lerp(capMeshRef.current.position.y, 1.4, 0.1);
        }
        // Internal cores slide out backwards/forwards
        if (internalMeshRef.current) {
          internalMeshRef.current.position.z = THREE.MathUtils.lerp(internalMeshRef.current.position.z, 0.4, 0.1);
          if (bodyMeshRef.current) {
            bodyMeshRef.current.position.z = THREE.MathUtils.lerp(bodyMeshRef.current.position.z, -0.2, 0.1);
          }
        }
      } else {
        // Return parts to original collapsed assembly
        if (capMeshRef.current) {
          capMeshRef.current.position.y = THREE.MathUtils.lerp(capMeshRef.current.position.y, 0.75, 0.1);
        }
        if (internalMeshRef.current) {
          internalMeshRef.current.position.z = THREE.MathUtils.lerp(internalMeshRef.current.position.z, 0.0, 0.1);
          if (bodyMeshRef.current) {
            bodyMeshRef.current.position.z = THREE.MathUtils.lerp(bodyMeshRef.current.position.z, 0.0, 0.1);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup loop on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      if (domEl) {
        domEl.removeEventListener("mousedown", handleMouseDown);
        domEl.removeEventListener("touchstart", handleTouchStart);
        domEl.removeEventListener("touchmove", handleTouchMove);
      }
      renderer.dispose();
      productMaterial.dispose();
      if (mountRef.current && domEl) {
        mountRef.current.removeChild(domEl);
      }
    };
  }, [productId, isExploded]);

  // Handle dynamic properties updates (avoid full recreate for minor adjustments)
  useEffect(() => {
    // 1. Update Rim Light color to simulate corporate environmental glow
    if (rimLightRef.current) {
      rimLightRef.current.color.set(brandColor);
    }

    // 2. Refresh logo text on dynamic canvas texture
    const newTex = createLogoCanvasTexture(logoText, brandColor, activeTechnique, logoType, logoUrl);
    if (newTex && logoTextureRef.current) {
      logoTextureRef.current.dispose();
      logoTextureRef.current = newTex;
      
      // Look inside group and update texture of children
      if (objectsGroupRef.current) {
        objectsGroupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const mat = child.material as THREE.MeshStandardMaterial;
            if (mat.map) {
              mat.map = newTex;
              mat.needsUpdate = true;
            }
          }
        });
      }
    }
  }, [logoText, brandColor, activeTechnique, logoType, logoUrl]);

  return (
    <div className="relative w-full h-full min-h-[340px] flex items-center justify-center bg-[#030303] overflow-hidden rounded-2xl border border-black/5 dark:border-white/5">
      {/* Dynamic 3D Mount Node */}
      <div ref={mountRef} className="w-full h-full min-h-[340px] cursor-grab active:cursor-grabbing" />

      {loading && (
        <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center space-y-3">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">
            Iniciando Studio 3D WebGL...
          </span>
        </div>
      )}

      {/* Floating Interactive Controller Overlay */}
      <div className="absolute bottom-3 right-3 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full text-[9px] font-mono text-neutral-600 dark:text-neutral-400 pointer-events-none select-none">
        ← Arraste para girar em 3D →
      </div>
    </div>
  );
}
