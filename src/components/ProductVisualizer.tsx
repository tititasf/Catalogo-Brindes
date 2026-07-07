import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Cpu, Layers, Sparkles } from "lucide-react";
import { Product, PersonalizationTechnique } from "../types";
import { ThreePBRStudio } from "./ThreePBRStudio";

interface ProductVisualizerProps {
  product: Product;
  activeTechnique: PersonalizationTechnique;
  brandColor: string;
  logoText: string;
  logoType: "text" | "upload";
  logoUrl?: string;
  isExploded?: boolean;
  showCustomized: boolean;
  perspectiveId?: string;
  viewMode?: "vector" | "photo" | "3d";
  logoSizeMultiplier?: number;
  logoRotationOffset?: number;
  logoOffsetX?: number;
  logoOffsetY?: number;
  showTechnicalGrid?: boolean;
  onChangeViewMode?: (mode: "vector" | "photo" | "3d") => void;
}

export const ProductVisualizer: React.FC<ProductVisualizerProps> = ({
  product,
  activeTechnique,
  brandColor,
  logoText,
  logoType,
  logoUrl,
  isExploded = false,
  showCustomized,
  perspectiveId,
  viewMode = "photo",
  logoSizeMultiplier = 1,
  logoRotationOffset = 0,
  logoOffsetX = 0,
  logoOffsetY = 0,
  showTechnicalGrid = false,
  onChangeViewMode,
}) => {
  const [imageError, setImageError] = React.useState(false);

  // Determine actual color of the product
  // If the product supports color swatches, we can use the brandColor as a tint or pick the closest suggestion
  const baseColor = product.colors && product.colors.length > 0 ? product.colors[0] : "#1e293b";
  // If the user entered a custom brand color, let's use it to accent the product!
  const accentColor = brandColor || "#3b82f6";

  // Mapping of premium, high-resolution Unsplash photo mockups for all 20 products
  const PRODUCT_PHOTOS: Record<string, {
    url: string;
    defaultX: number; // percentage from left (0-100)
    defaultY: number; // percentage from top (0-100)
    defaultWidth: number; // width relative to canvas (0-100)
    defaultHeight: number; // height relative to canvas (0-100)
    defaultRotation: number; // default rotation angle (degrees)
    blendMode?: React.CSSProperties["mixBlendMode"];
  }> = {
    "mochila-executiva": {
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 58,
      defaultWidth: 20,
      defaultHeight: 10,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "garfa-termica-led": {
      url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800",
      defaultX: 49,
      defaultY: 55,
      defaultWidth: 16,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "garrafa-termica-led": {
      url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800",
      defaultX: 49,
      defaultY: 55,
      defaultWidth: 16,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "caderno-moleskine": {
      url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      defaultX: 51,
      defaultY: 50,
      defaultWidth: 24,
      defaultHeight: 15,
      defaultRotation: -2,
      blendMode: "multiply"
    },
    "kit-welcome-onboarding": {
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 48,
      defaultWidth: 22,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "powerbank-magsafe": {
      url: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 52,
      defaultWidth: 18,
      defaultHeight: 10,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "copo-termico-stanley": {
      url: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 46,
      defaultWidth: 18,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "fone-tws-pro": {
      url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 55,
      defaultWidth: 15,
      defaultHeight: 8,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "caneta-rollerball": {
      url: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800",
      defaultX: 48,
      defaultY: 46,
      defaultWidth: 12,
      defaultHeight: 8,
      defaultRotation: -40,
      blendMode: "multiply"
    },
    "ecobag-heavy": {
      url: "https://images.unsplash.com/photo-1597484211625-2487e6beec31?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 56,
      defaultWidth: 25,
      defaultHeight: 16,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "kit-churrasco-couro": {
      url: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 50,
      defaultWidth: 20,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "necessaire-viagem": {
      url: "https://images.unsplash.com/photo-1522337360788-8b13edd793be?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 52,
      defaultWidth: 18,
      defaultHeight: 10,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "hub-usbc-multi": {
      url: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 48,
      defaultWidth: 14,
      defaultHeight: 8,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "guarda-chuva-portatil": {
      url: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=800",
      defaultX: 45,
      defaultY: 55,
      defaultWidth: 20,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "camiseta-egipcia": {
      url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 42,
      defaultWidth: 15,
      defaultHeight: 10,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "caixa-som-waterproof": {
      url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 45,
      defaultWidth: 15,
      defaultHeight: 10,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "lanyard-acetinado": {
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 48,
      defaultWidth: 18,
      defaultHeight: 10,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "planner-anual": {
      url: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 48,
      defaultWidth: 20,
      defaultHeight: 12,
      defaultRotation: 12,
      blendMode: "multiply"
    },
    "squeeze-silicone": {
      url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 55,
      defaultWidth: 16,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "base-wireless-bambu": {
      url: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 50,
      defaultWidth: 18,
      defaultHeight: 10,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "kit-vinho-eletrico": {
      url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 50,
      defaultWidth: 20,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "camisa-polo-piquet": {
      url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800",
      defaultX: 38,
      defaultY: 34,
      defaultWidth: 12,
      defaultHeight: 8,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "sacola-juta-premium": {
      url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
      defaultX: 49,
      defaultY: 54,
      defaultWidth: 22,
      defaultHeight: 12,
      defaultRotation: 0,
      blendMode: "multiply"
    },
    "bone-trucker-premium": {
      url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 48,
      defaultWidth: 18,
      defaultHeight: 10,
      defaultRotation: 0,
      blendMode: "normal"
    },
    "faixa-cetim-decorativa": {
      url: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 50,
      defaultWidth: 25,
      defaultHeight: 6,
      defaultRotation: 35,
      blendMode: "normal"
    },
    "avental-sarja-gourmet": {
      url: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&q=80&w=800",
      defaultX: 50,
      defaultY: 56,
      defaultWidth: 18,
      defaultHeight: 11,
      defaultRotation: 0,
      blendMode: "multiply"
    }
  };

  const renderProductPhoto = () => {
    const photoConfig = PRODUCT_PHOTOS[product.id] || PRODUCT_PHOTOS["mochila-executiva"];
    const imageUrl = photoConfig.url;

    // Calculate dynamic positioning parameters
    const finalX = photoConfig.defaultX + logoOffsetX;
    const finalY = photoConfig.defaultY + logoOffsetY;
    const finalWidth = photoConfig.defaultWidth * logoSizeMultiplier;
    const finalHeight = photoConfig.defaultHeight * logoSizeMultiplier;
    const finalRotation = photoConfig.defaultRotation + logoRotationOffset;

    // Build responsive text styling overlay
    let logoStyle: React.CSSProperties = {
      mixBlendMode: photoConfig.blendMode || "normal",
      transition: "all 0.2s ease-out",
    };

    let filter = "";
    let fill = "#ffffff";
    let textShadow = "none";
    let gradientStyle: React.CSSProperties = {};

    switch (activeTechnique) {
      case "laser": {
        const isWoodOrBambu = product.id.includes("bambu") || product.id.includes("vinho") || product.id.includes("churrasco");
        fill = isWoodOrBambu ? "#221102" : "#e2e8f0"; // carbonized brown vs bright silver metal
        filter = isWoodOrBambu 
          ? "drop-shadow(0.5px 0.5px 0px rgba(255,255,255,0.06)) contrast(1.15)" 
          : "drop-shadow(0.5px 0.5px 0.5px rgba(255,255,255,0.3))";
        logoStyle.mixBlendMode = isWoodOrBambu ? "multiply" : "color-dodge";
        logoStyle.opacity = isWoodOrBambu ? 0.92 : 0.82;
        break;
      }
      case "hot_stamping": {
        // Render rich metallic golden stamp
        fill = "#e0b443";
        filter = "drop-shadow(0.5px 1px 1px rgba(0,0,0,0.5))";
        gradientStyle = {
          backgroundImage: "linear-gradient(135deg, #b8860b 0%, #ffd700 25%, #daa520 50%, #fff8dc 75%, #b8860b 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        };
        logoStyle.mixBlendMode = "normal";
        break;
      }
      case "debossing": {
        // Shadowed leather-carving indented effect
        fill = "rgba(0,0,0,0.72)";
        filter = "blur(0.15px) drop-shadow(0.5px 0.5px 0px rgba(255,255,255,0.18))";
        logoStyle.mixBlendMode = "multiply";
        break;
      }
      case "uv": {
        fill = accentColor;
        filter = "drop-shadow(0.5px 0.5px 0.2px rgba(255,255,255,0.25)) drop-shadow(1px 1px 1px rgba(0,0,0,0.35))";
        logoStyle.mixBlendMode = "normal";
        break;
      }
      case "silk": {
        fill = accentColor === "#3b82f6" ? "#ffffff" : accentColor;
        filter = "drop-shadow(0.5px 0.5px 0.5px rgba(0,0,0,0.25))";
        logoStyle.mixBlendMode = "normal";
        break;
      }
      case "bordado": {
        fill = "#f3f4f6";
        filter = "drop-shadow(1px 2px 2px rgba(0,0,0,0.5)) url(#stitch-texture)";
        logoStyle.mixBlendMode = "normal";
        break;
      }
      case "dtg": {
        fill = accentColor;
        filter = "opacity(0.88) url(#garment-texture)";
        logoStyle.mixBlendMode = "multiply";
        break;
      }
      case "resinada": {
        fill = accentColor;
        filter = "drop-shadow(1.5px 2px 3px rgba(0,0,0,0.45))";
        break;
      }
      case "sublimacao": {
        fill = "#f43f5e";
        gradientStyle = {
          backgroundImage: "linear-gradient(45deg, #2563eb, #ec4899, #eab308)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        };
        logoStyle.mixBlendMode = "multiply";
        break;
      }
      default: {
        fill = accentColor;
        break;
      }
    }

    const displayText = logoText || "EXCLUSIVO";

    // Cylindrical warping calculation (Technical Art approach)
    const isCylindrical = product.id.includes("garrafa") || product.id.includes("copo") || product.id.includes("squeeze");
    const warp3DStyle: React.CSSProperties = isCylindrical ? {
      transform: `translate(-50%, -50%) rotate(${finalRotation}deg) perspective(350px) rotateY(${logoRotationOffset * 0.4}deg) scaleX(0.86)`,
      WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.1) 100%)",
      maskImage: "linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 22%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.1) 100%)",
    } : {
      transform: `translate(-50%, -50%) rotate(${finalRotation}deg)`,
    };

    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#070707] flex items-center justify-center shadow-inner group">
        
        {/* Real Product Image from Unsplash or high-fidelity placeholder fallback */}
        {!imageError ? (
          <img
            src={imageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-102"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0c0c0e] flex flex-col items-center justify-between p-6 border border-white/5 rounded-2xl w-full h-full">
            {/* Top info */}
            <div className="w-full flex justify-between items-center text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
              <span>Estúdio de Validação Digital</span>
              <span>DIM: {product.dimensions || "STANDARD"}</span>
            </div>
            {/* Center geometric element (simulates product shape) */}
            <div 
              className="w-32 h-32 rounded-2xl border border-dashed border-gold/30 flex items-center justify-center relative shadow-2xl"
              style={{
                background: `radial-gradient(circle, ${brandColor}20 0%, transparent 80%)`
              }}
            >
              <div className="absolute inset-0 border border-white/5 rounded-2xl m-2 bg-neutral-950/40 flex items-center justify-center">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest text-center leading-normal">
                  Mockup Geométrico<br/>
                  <strong className="text-gold/60 font-semibold">Alta Precisão</strong>
                </span>
              </div>
            </div>
            {/* Bottom info */}
            <div className="w-full flex justify-between items-center text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
              <span>Lote Mínimo: {product.minimumQuantity} un</span>
              <span>Matéria: {product.material.split(" ")[0]}</span>
            </div>
          </div>
        )}

        {/* 1. THE B2B COLOR HACK OVERLAY (Smart Template Zone) */}
        {brandColor && (
          <div 
            style={{
              position: "absolute",
              left: `${photoConfig.defaultX}%`,
              top: `${photoConfig.defaultY}%`,
              width: `${photoConfig.defaultWidth * 2.8}%`,
              height: `${photoConfig.defaultHeight * 2.8}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${brandColor}75 0%, ${brandColor}15 45%, transparent 75%)`,
              mixBlendMode: "color", // Mathematical overlay
              pointerEvents: "none",
              zIndex: 2,
              opacity: 0.65,
            }}
          />
        )}

        {/* Dynamic Customizable Branding Overlay Container */}
        {showCustomized && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div 
              style={{
                position: "absolute",
                left: `${finalX}%`,
                top: `${finalY}%`,
                width: `${finalWidth}%`,
                height: `${finalHeight}%`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                ...warp3DStyle,
                ...logoStyle
              }}
            >
              {logoType === "upload" && logoUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={logoUrl}
                    alt="Custom Logo"
                    className="w-full h-full object-contain"
                    style={{ filter }}
                    referrerPolicy="no-referrer"
                  />
                  {/* High-Fidelity shadow/texture duplicate overlay to absorb fabric grain */}
                  <img
                    src={imageUrl}
                    alt="Fabric Texture Pass"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-55"
                    style={{
                      clipPath: "inset(0% 0% 0% 0% round 4px)",
                      filter: "contrast(1.2) brightness(0.9)",
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="relative text-center select-none w-full flex flex-col justify-center items-center">
                  <span 
                    className="font-sans font-extrabold uppercase leading-none truncate w-full block tracking-[0.18em]"
                    style={{ 
                      color: gradientStyle.backgroundImage ? undefined : fill,
                      fontSize: `${Math.max(6, 11 * logoSizeMultiplier)}px`,
                      filter,
                      ...gradientStyle
                    }}
                  >
                    {displayText}
                  </span>
                  <span 
                    className="font-mono font-medium leading-none block tracking-[0.3em]"
                    style={{ 
                      color: gradientStyle.backgroundImage ? undefined : fill,
                      fontSize: `${Math.max(3, 4.5 * logoSizeMultiplier)}px`,
                      opacity: 0.72,
                      marginTop: "3px",
                      filter,
                      ...gradientStyle
                    }}
                  >
                    CO. DESIGN
                  </span>

                  {/* Dynamic Micro Shadow projection layer for physical depth */}
                  <div 
                    className="absolute inset-0 bg-black/10 mix-blend-color-burn filter blur-[0.5px] pointer-events-none rounded"
                    style={{ opacity: activeTechnique === "debossing" ? 0.8 : 0.2 }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Atmospheric lighting reflex for photorealism */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-white/8 pointer-events-none mix-blend-overlay" />
      </div>
    );
  };

  // Render the logo text or preset graphic
  const renderLogoOverlay = (width: number, height: number, x: number, y: number, rotation: number = 0, style: React.CSSProperties = {}) => {
    if (!showCustomized) return null;

    // Design the logo style based on activeTechnique
    let filter = "";
    let fill = "#ffffff";
    let textShadow = "none";
    let bgGradient = "none";
    let textTransform: "none" | "uppercase" = "uppercase";

    switch (activeTechnique) {
      case "laser":
        // Laser engraving on metal reveals raw silver/copper beneath
        // Laser on wood/bambu burns it (dark brown)
        const isWoodOrBambu = product.id.includes("bambu") || product.id.includes("vinho") || product.id.includes("churrasco");
        fill = isWoodOrBambu ? "#3f2305" : "#d1d5db"; // charcoal dark-brown vs metallic light silver
        filter = isWoodOrBambu ? "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))" : "drop-shadow(0.5px 0.5px 0.5px rgba(255,255,255,0.4))";
        textShadow = isWoodOrBambu ? "none" : "0px 0px 1px rgba(0,0,0,0.4)";
        break;
      case "hot_stamping":
        // Gold gradient
        fill = "url(#gold-gradient)";
        filter = "drop-shadow(1px 1px 1.5px rgba(0,0,0,0.4))";
        break;
      case "debossing":
        // Darkened inset shade
        fill = "rgba(0,0,0,0.45)";
        filter = "blur(0.2px) drop-shadow(-0.5px -0.5px 0.5px rgba(255,255,255,0.15))";
        break;
      case "uv":
        // Full color high definition - use brandColor with high saturation
        fill = accentColor;
        filter = "drop-shadow(1px 1px 1px rgba(0,0,0,0.25))";
        break;
      case "silk":
        // Clean screen print - solid white or brand color
        fill = accentColor === "#3b82f6" ? "#ffffff" : accentColor;
        filter = "drop-shadow(0.5px 0.5px 0px rgba(0,0,0,0.15))";
        break;
      case "bordado":
        // Thick embroidery satin thread texture
        fill = "#f1f5f9";
        filter = "drop-shadow(1px 1px 1px rgba(0,0,0,0.3)) url(#stitch-texture)";
        break;
      case "dtg":
        // Ink merged with garment, slightly faded
        fill = accentColor;
        filter = "opacity(0.85) url(#garment-texture)";
        break;
      case "resinada":
        // Gel dome sheen
        fill = accentColor;
        filter = "drop-shadow(2px 2px 3px rgba(0,0,0,0.35))";
        break;
      case "sublimacao":
        fill = "url(#sublimation-rainbow)";
        break;
      case "tampografia":
      default:
        fill = accentColor;
        break;
    }

    const displayText = logoText || "EXCLUSIVO";

    return (
      <g transform={`translate(${x}, ${y}) rotate(${rotation})`} style={{ pointerEvents: "none" }}>
        {/* Custom Gradients defined inside the main SVG */}
        {logoType === "upload" && logoUrl ? (
          <image
            href={logoUrl}
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid Meet"
            style={{ filter }}
          />
        ) : (
          <g>
            {/* Ambient bounding shape of the logo depending on the style */}
            {activeTechnique === "resinada" && (
              <rect
                x={-width / 2 - 8}
                y={-height / 4 - 4}
                width={width + 16}
                height={height / 2 + 8}
                rx={6}
                fill="url(#resin-dome)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={0.5}
                filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.3))"
              />
            )}
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className="font-mono text-[9px] tracking-[0.2em] font-bold"
              fill={activeTechnique === "resinada" ? "#ffffff" : fill}
              style={{
                filter,
                textShadow,
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.25em",
                ...style,
              }}
            >
              {displayText}
            </text>
            <text
              x="0"
              y="14"
              textAnchor="middle"
              className="font-sans text-[5px] tracking-[0.4em] font-medium opacity-65"
              fill={activeTechnique === "resinada" ? "rgba(255,255,255,0.7)" : fill}
              style={{ filter, fontSize: "4.5px" }}
            >
              CO. DESIGN
            </text>
          </g>
        )}
      </g>
    );
  };

  // Switch renderer for each of the 20 products
  const renderProductSVG = () => {
    // Generate reusable filters and gradients
    const renderDefs = () => (
      <defs>
        {/* Brushed metal or textured gradients */}
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BF953F" />
          <stop offset="25%" stopColor="#FCF6BA" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="75%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>

        <linearGradient id="silver-metal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="25%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="75%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        <linearGradient id="bambu-grain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6C280" />
          <stop offset="35%" stopColor="#D9B166" />
          <stop offset="70%" stopColor="#EAC786" />
          <stop offset="100%" stopColor="#C49B4F" />
        </linearGradient>

        <linearGradient id="leather-brown" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5C3D2E" />
          <stop offset="40%" stopColor="#3D251E" />
          <stop offset="80%" stopColor="#2E1A16" />
          <stop offset="100%" stopColor="#1E100D" />
        </linearGradient>

        <linearGradient id="sublimation-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="33%" stopColor="#ec4899" />
          <stop offset="66%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        <radialGradient id="resin-dome" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </radialGradient>

        <radialGradient id="soft-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity={0.15} />
          <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
        </radialGradient>

        {/* Ambient shadow filter */}
        <filter id="drop-shadow" x="-10%" y="-10%" width="120%" height="135%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.22" />
        </filter>

        <filter id="light-shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.1" />
        </filter>

        {/* Dynamic embroidery/fabric stitch filter simulation */}
        <filter id="stitch-texture" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>

        {/* Garment / cotton weave filter simulation */}
        <filter id="garment-texture" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" result="noise" />
          <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="1" result="light">
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" in2="light" />
        </filter>
      </defs>
    );

    switch (product.id) {
      case "mochila-executiva": {
        // MOCHILA EXECUTIVA
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {/* Background Accent glow */}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Handle */}
            <path d="M120,55 C120,40 180,40 180,55" fill="none" stroke="#2a2a2a" strokeWidth="8" strokeLinecap="round" />
            <path d="M125,55 C125,45 175,45 175,55" fill="none" stroke="#121212" strokeWidth="4" strokeLinecap="round" />

            {/* Shoulder strap connections */}
            <rect x="100" y="55" width="20" height="20" rx="3" fill="#1e1e1e" />
            <rect x="180" y="55" width="20" height="20" rx="3" fill="#1e1e1e" />

            {/* Main backpack shape */}
            <path d="M100,58 C85,90 80,180 80,225 C80,245 95,255 150,255 C205,255 220,245 220,225 C220,180 215,90 200,58 C185,50 115,50 100,58 Z" fill="#2d3748" />
            
            {/* Back fabric highlight (Slate shaded) */}
            <path d="M105,62 C92,92 88,178 88,222 C88,238 100,247 150,247 C200,247 212,238 212,222 C212,178 208,92 195,62 Z" fill="#1e293b" opacity="0.9" />

            {/* Front Panel pocket curve */}
            <path d="M92,105 C92,105 150,115 208,105 C210,130 210,210 204,228 C198,242 185,245 150,245 C115,245 102,242 96,228 C90,210 90,130 92,105 Z" fill="#0f172a" />
            
            {/* Matte accent border around pocket */}
            <path d="M92,105 C92,105 150,115 208,105" fill="none" stroke="#334155" strokeWidth="2.5" />
            
            {/* Horizontal reflective safety strip (reacts subtly to HEX color) */}
            <path d="M105,145 L195,145" stroke={accentColor} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M105,145 L195,145" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

            {/* Metal zipper heads */}
            <circle cx="206" cy="104" r="3" fill="#94a3b8" />
            <line x1="206" y1="104" x2="206" y2="114" stroke="#64748b" strokeWidth="1.5" />

            {/* Logo positions:
                Perspective 1: Embroidered on the Front pocket center
                Perspective 2: Laser marked on a sleek side metal tag rebitada
            */}
            {perspectiveId === "tag" ? (
              <>
                {/* Laser Tag plate representation */}
                <rect x="75" y="160" width="10" height="28" rx="2" fill="url(#silver-metal)" stroke="#000000" strokeWidth="0.5" />
                <circle cx="80" cy="164" r="1" fill="#1a1a1a" />
                <circle cx="80" cy="184" r="1" fill="#1a1a1a" />
                {renderLogoOverlay(20, 8, 80, 174, 90, { fontSize: "4px", letterSpacing: "0.1em" })}
              </>
            ) : (
              // Standard embroidered center logo on the pocket
              renderLogoOverlay(70, 30, 150, 195, 0, { fontSize: "11px", letterSpacing: "0.22em" })
            )}
          </svg>
        );
      }
      case "garfa-termica-led":
      case "garrafa-termica-led": {
        // GARRAFA TÉRMICA LED
        const paintColor = baseColor === "#FFFFFF" ? "#f8fafc" : baseColor;
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {/* Back glow */}
            {showCustomized && <circle cx="150" cy="160" r="100" fill="url(#soft-glow)" />}
            
            {/* Shadow of bottle */}
            <ellipse cx="150" cy="265" rx="35" ry="8" fill="rgba(0,0,0,0.25)" />

            {/* Steel neck base */}
            <path d="M125,100 C125,90 175,90 175,100 Z" fill="url(#silver-metal)" />
            
            {/* Steel ring neck accent */}
            <rect x="123" y="100" width="54" height="6" rx="1" fill="url(#silver-metal)" stroke="#475569" strokeWidth="0.25" />

            {/* Main bottle cylinder */}
            <path d="M120,105 C120,105 125,120 120,150 L120,250 C120,260 125,263 150,263 C175,263 180,260 180,250 L180,150 C175,120 180,105 180,105 Z" fill={paintColor} />
            
            {/* Cylindrical Highlight */}
            <path d="M120,150 L120,250 C120,258 123,261 135,262 C135,262 130,220 130,150 C130,120 128,106 128,106" fill="rgba(255,255,255,0.18)" />
            <path d="M180,150 L180,250 C180,258 177,261 165,262 C165,262 170,220 170,150 C170,120 172,106 172,106" fill="rgba(0,0,0,0.15)" />

            {/* Smart LED Cap */}
            <path d="M124,75 C124,65 176,65 176,75 L176,92 C176,96 170,98 150,98 C130,98 124,96 124,92 Z" fill="#1e293b" />
            <path d="M126,75 C126,67 174,67 174,75 L174,90 L126,90 Z" fill="#09090b" />
            
            {/* Metallic rim of Cap */}
            <path d="M124,92 L176,92" stroke="url(#silver-metal)" strokeWidth="2.5" />

            {/* LED Screen Circular Display */}
            <ellipse cx="150" cy="80" rx="18" ry="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
            {/* Glowing active temp ring */}
            <ellipse cx="150" cy="80" rx="14" ry="5" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.8" className="animate-pulse" />
            {/* Glowing LED Temperature text */}
            <text x="150" y="82" textAnchor="middle" fill={accentColor} style={{ fontFamily: "var(--font-mono), monospace", fontSize: "7px", fontWeight: "bold" }}>
              55°C
            </text>

            {/* Branding placement:
                Perspective 1: Laser engraving (removing paint, exposing steel) or UV Full Color on cylinder center
                Perspective 2: Laser zoom or close-up detail
            */}
            {perspectiveId === "detail" ? (
              // Render larger close-up engraving on body
              renderLogoOverlay(85, 35, 150, 180, 0, { fontSize: "14px", letterSpacing: "0.25em" })
            ) : (
              // Standard body logo
              renderLogoOverlay(60, 25, 150, 185, 0, { fontSize: "10px", letterSpacing: "0.22em" })
            )}
          </svg>
        );
      }
      case "caderno-moleskine": {
        // CADERNO MOLESKINE
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {/* Background Glow */}
            {showCustomized && <circle cx="150" cy="150" r="105" fill="url(#soft-glow)" />}
            
            {/* Spine shadow */}
            <rect x="75" y="60" width="8" height="185" rx="3" fill="rgba(0,0,0,0.3)" />

            {/* Moleskine book backing sheets (Paper edges) */}
            <rect x="88" y="63" width="138" height="178" rx="4" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1" />
            <line x1="226" y1="70" x2="226" y2="235" stroke="#d6d3d1" strokeWidth="2" strokeDasharray="1,1" />

            {/* Hard Cover front (using selected base color) */}
            <rect x="80" y="60" width="144" height="183" rx="6" fill={baseColor} />
            
            {/* Cover sheen / 3D edge highlight */}
            <rect x="82" y="62" width="140" height="179" rx="5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            {/* Shadow border for depth */}
            <rect x="80" y="60" width="144" height="183" rx="6" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />

            {/* Elegant vertical ribbon bookmark dangling (reacts to brand/accent HEX) */}
            <path d="M190,240 C190,240 193,260 185,275 C182,280 188,283 192,275 C196,260 196,240 196,240 Z" fill={accentColor} opacity="0.85" />

            {/* Vertical elastic band (matte dark fabric) */}
            <rect x="200" y="60" width="11" height="183" fill="#1e293b" opacity="0.95" />
            {/* Band lines texture */}
            <line x1="202" y1="60" x2="202" y2="243" stroke="#0f172a" strokeWidth="0.75" />
            <line x1="209" y1="60" x2="209" y2="243" stroke="#0f172a" strokeWidth="0.75" />

            {/* Spine seam indentation */}
            <line x1="88" y1="60" x2="88" y2="243" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
            <line x1="89" y1="60" x2="89" y2="243" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

            {/* Custom Branding:
                Perspective 1: Deep Debossing (carved in cover)
                Perspective 2: Hot Stamping gold/silver in the bottom corner
            */}
            {perspectiveId === "cover-gold" ? (
              // Bottom corner Hot Stamping (forced gold styling overlay)
              renderLogoOverlay(48, 18, 140, 215, 0, { fontSize: "7px", letterSpacing: "0.15em" })
            ) : (
              // Standard center cover Debossing (low opacity dark overlay with offset)
              renderLogoOverlay(64, 25, 145, 145, 0, { fontSize: "11px", letterSpacing: "0.22em" })
            )}
          </svg>
        );
      }
      case "kit-welcome-onboarding": {
        // KIT WELCOME ONBOARDING
        // Contains: Box, Mug, Notebook, Pen
        const explodeY = isExploded ? 50 : 0;
        const explodeX = isExploded ? 60 : 0;

        return (
          <svg viewBox="0 0 320 320" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            
            {/* Box Outer Base - cartonagem preta */}
            <g id="box-base" transform={`translate(0, ${isExploded ? 10 : 0})`}>
              {/* Outer bottom shadow */}
              <rect x="50" y="80" width="220" height="160" rx="4" fill="#09090b" />
              {/* Box wall edge thickness */}
              <rect x="52" y="82" width="216" height="156" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="1" />
              {/* Box interior EVA cavity */}
              <rect x="60" y="90" width="200" height="140" rx="2" fill="#09090b" />
              {/* EVA Texture grids */}
              <rect x="62" y="92" width="196" height="136" rx="1" fill="none" stroke="#121214" strokeWidth="2.5" strokeDasharray="1,2" opacity="0.3" />
            </g>

            {/* Interactive Exploded Items */}
            {/* ITEM 1: Caneca de Cerâmica (matte, nested inside or flying left-bottom) */}
            <g id="kit-mug" transform={`translate(${-explodeX * 1.1}, ${explodeY * 0.9})`}>
              {/* Mug Cavity cutout in EVA when exploded */}
              {!isExploded && <rect x="75" y="150" width="55" height="60" rx="4" fill="#020202" stroke="#27272a" strokeWidth="0.5" />}
              
              {/* Mug representation */}
              <g transform="translate(72, 145)">
                {/* Handle */}
                <path d="M15,12 C2,12 2,38 15,38" fill="none" stroke="#27272a" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M15,14 C5,14 5,36 15,36" fill="none" stroke="#18181b" strokeWidth="2.5" />
                {/* Body */}
                <rect x="15" y="6" width="38" height="42" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="0.5" />
                <ellipse cx="34" cy="6" rx="19" ry="3" fill="#09090b" stroke="#3f3f46" strokeWidth="0.5" />
                {/* Accent inside color */}
                <ellipse cx="34" cy="6" rx="16" ry="2" fill={accentColor} opacity="0.7" />
                
                {/* Small engraving on mug */}
                {showCustomized && (
                  <text x="34" y="28" textAnchor="middle" fill="#d1d5db" style={{ fontFamily: "var(--font-mono)", fontSize: "3.5px", letterSpacing: "0.1em" }}>
                    {logoText ? logoText.slice(0, 8) : "EXCLUSIVO"}
                  </text>
                )}
              </g>
              {isExploded && (
                <text x="50" y="212" className="fill-slate-400 font-sans text-[6px] tracking-widest uppercase font-bold text-center">
                  Caneca Cerâmica Matte
                </text>
              )}
            </g>

            {/* ITEM 2: Caderno de Bolso (nested inside or flying right-top) */}
            <g id="kit-notebook" transform={`translate(${explodeX * 1.1}, ${-explodeY * 0.9})`}>
              {/* Notebook cavity in EVA */}
              {!isExploded && <rect x="155" y="105" width="85" height="110" rx="4" fill="#020202" stroke="#27272a" strokeWidth="0.5" />}
              
              {/* Moleskine Mini */}
              <g transform="translate(155, 105)">
                {/* Cover */}
                <rect x="3" y="2" width="76" height="102" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="0.5" />
                {/* Band */}
                <rect x="62" y="2" width="6" height="102" fill="#09090b" />
                {/* Ribbon marcadora */}
                <path d="M50,104 C50,104 52,112 48,118 Z" fill={accentColor} />

                {/* Cover logo */}
                {showCustomized && (
                  <text x="38" y="54" textAnchor="middle" fill="url(#gold-gradient)" style={{ fontFamily: "var(--font-sans)", fontSize: "5.5px", letterSpacing: "0.15em", fontWeight: "bold" }}>
                    {logoText ? logoText.slice(0, 10) : "EXCLUSIVO"}
                  </text>
                )}
              </g>
              {isExploded && (
                <text x="250" y="98" className="fill-slate-400 font-sans text-[6px] tracking-widest uppercase font-bold">
                  Moleskine Soft Touch
                </text>
              )}
            </g>

            {/* ITEM 3: Caneta Rollerball Metálica */}
            <g id="kit-pen" transform={`translate(${explodeX * 0.2}, ${explodeY * 1.3})`}>
              {!isExploded && <rect x="145" y="215" width="105" height="10" rx="2" fill="#020202" stroke="#27272a" strokeWidth="0.5" />}
              
              {/* Rollerball representation */}
              <g transform="translate(148, 217)">
                {/* Pen Body */}
                <rect x="2" y="1" width="94" height="4" rx="1.5" fill="#111827" stroke="#4b5563" strokeWidth="0.5" />
                {/* Silver clips */}
                <rect x="74" y="0.5" width="16" height="1.5" fill="url(#silver-metal)" />
                <rect x="86" y="0" width="3" height="4.5" fill="url(#silver-metal)" />
              </g>
              {isExploded && (
                <text x="245" y="240" className="fill-slate-400 font-sans text-[6px] tracking-widest uppercase font-bold">
                  Caneta Metal
                </text>
              )}
            </g>

            {/* Box Lid (Magnetic top cover) flying up-left when exploded */}
            <g id="box-lid" transform={`translate(${-explodeX * 1.2}, ${-explodeY * 1.2})`} style={{ opacity: isExploded ? 0.9 : 0 }}>
              {/* Deep wood/rigid cover layout */}
              <rect x="10" y="10" width="180" height="130" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1" filter="url(#light-shadow)" />
              <rect x="15" y="15" width="170" height="120" rx="3" fill="#09090b" />
              
              {/* Magnetic lock detail */}
              <rect x="184" y="65" width="8" height="20" rx="2" fill="url(#silver-metal)" />

              {/* Box Cover Premium Hot Stamping (Main Brand overlay on Box lid) */}
              {renderLogoOverlay(90, 35, 100, 75, 0, { fontSize: "11px", letterSpacing: "0.22em" })}
            </g>

            {/* Explode connective indicator lines */}
            {isExploded && (
              <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2" fill="none">
                <line x1="100" y1="180" x2="160" y2="160" />
                <line x1="200" y1="150" x2="160" y2="160" />
                <line x1="190" y1="220" x2="160" y2="160" />
              </g>
            )}

            {/* Box Front Cover Logo representation when CLOSED/Standard */}
            {!isExploded && renderLogoOverlay(100, 40, 160, 48, 0, { fontSize: "11px", letterSpacing: "0.22em" })}
          </svg>
        );
      }
      case "powerbank-magsafe": {
        // POWER BANK MAGSAFE
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="105" fill="url(#soft-glow)" />}
            
            {/* Rubber block body */}
            <rect x="85" y="70" width="130" height="165" rx="14" fill="#121214" stroke="#2d2d30" strokeWidth="1" />
            <rect x="87" y="72" width="126" height="161" rx="12" fill="#1c1c1f" />

            {/* MagSafe Magnet Ring */}
            <circle cx="150" cy="132" r="30" fill="none" stroke="#2d2d30" strokeWidth="4.5" />
            <circle cx="150" cy="132" r="30" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.6" />
            {/* MagSafe bottom line orientation */}
            <line x1="150" y1="162" x2="150" y2="182" stroke="#2d2d30" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="150" y1="162" x2="150" y2="182" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

            {/* Smart Digital Power Display */}
            <rect x="180" y="82" width="24" height="10" rx="2" fill="#09090b" />
            <text x="192" y="89" textAnchor="middle" fill={accentColor} style={{ fontFamily: "var(--font-mono)", fontSize: "6px", fontWeight: "bold" }}>
              98%
            </text>

            {/* Charging indicator LED dot */}
            <circle cx="174" cy="87" r="1.5" fill="#22c55e" className="animate-ping" />
            <circle cx="174" cy="87" r="1.5" fill="#22c55e" />

            {/* Logo overlay on the flat lower area */}
            {renderLogoOverlay(64, 25, 150, 205, 0, { fontSize: "8.5px", letterSpacing: "0.2em" })}
          </svg>
        );
      }
      case "copo-termico-stanley": {
        // COPO TÉRMICO (ESTILO STANLEY)
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Steel top rim */}
            <path d="M100,75 L200,75 L195,95 L105,95 Z" fill="url(#silver-metal)" stroke="#475569" strokeWidth="0.5" />
            <ellipse cx="150" cy="75" rx="50" ry="4" fill="#334155" />

            {/* Clear plastic/acrylic lid protruding */}
            <path d="M110,75 C110,65 190,65 190,75 Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />

            {/* Tumbler body tapering downwards */}
            <path d="M105,95 L118,245 C119,252 125,255 150,255 C175,255 181,252 182,245 L195,95 Z" fill={baseColor} />

            {/* Shadow overlay and realistic vertical highlight */}
            <path d="M105,95 L118,245 C118,245 130,220 130,120 C130,105 125,95 125,95" fill="rgba(255,255,255,0.18)" />
            <path d="M195,95 L182,245 C182,245 170,220 170,120 C170,105 175,95 175,95" fill="rgba(0,0,0,0.12)" />

            {/* Metal steel bottom cap */}
            <path d="M119,242 L181,242 L180,255 C180,255 175,258 150,258 C125,258 120,255 120,255 Z" fill="url(#silver-metal)" />

            {/* Branding area in the center */}
            {renderLogoOverlay(64, 25, 150, 155, 0, { fontSize: "11px", letterSpacing: "0.22em" })}
          </svg>
        );
      }
      case "fone-tws-pro": {
        // FONE DE OUVIDO TWS
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="105" fill="url(#soft-glow)" />}
            
            {/* Charger case bottom shadow */}
            <ellipse cx="150" cy="235" rx="50" ry="12" fill="rgba(0,0,0,0.2)" />

            {/* Elite Case shape with rich gradients */}
            <rect x="95" y="80" width="110" height="140" rx="42" fill={baseColor} stroke="#2d2d30" strokeWidth="1" />
            <rect x="97" y="82" width="106" height="136" rx="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

            {/* Closing seam / Hinge cut line */}
            <line x1="95" y1="125" x2="205" y2="125" stroke="#09090b" strokeWidth="2" />
            <line x1="96" y1="125" x2="204" y2="125" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

            {/* Charger active LED light status (pulses sutilly with brand color) */}
            <circle cx="150" cy="152" r="3" fill={accentColor} className="animate-pulse" />
            <circle cx="150" cy="152" r="1.5" fill="#ffffff" />

            {/* Dynamic Logo placement on lower front shell */}
            {renderLogoOverlay(54, 22, 150, 180, 0, { fontSize: "8px", letterSpacing: "0.18em" })}
          </svg>
        );
      }
      case "caneta-rollerball": {
        // CANETA ROLLERBALL METÁLICA
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Horizontal Pen shadow */}
            <ellipse cx="150" cy="170" rx="100" ry="5" fill="rgba(0,0,0,0.25)" />

            <g transform="translate(40, 140) rotate(-10, 110, 20)">
              {/* Metallic body pen tip */}
              <path d="M10,13 L35,13 L35,21 L10,21 L5,17 Z" fill="url(#silver-metal)" />
              {/* Ink tip */}
              <polygon points="5,16 5,18 0,17" fill="#09090b" />

              {/* Main heavy pen body segment */}
              <rect x="35" y="11" width="100" height="12" rx="1" fill={baseColor === "#FFFFFF" ? "#1e293b" : baseColor} />
              
              {/* Chrome decorative band divider */}
              <rect x="135" y="10" width="6" height="14" fill="url(#silver-metal)" stroke="#475569" strokeWidth="0.25" />

              {/* Removable Cap segment */}
              <rect x="141" y="11" width="75" height="12" rx="2" fill={baseColor === "#FFFFFF" ? "#0f172a" : baseColor} />

              {/* Chrome End cap */}
              <path d="M216,12 L224,13 L224,21 L216,22 Z" fill="url(#silver-metal)" />

              {/* Sleek metal clip */}
              <rect x="155" y="6" width="35" height="4" rx="1" fill="url(#silver-metal)" stroke="#475569" strokeWidth="0.25" />
              <rect x="186" y="5" width="5" height="7" rx="0.5" fill="url(#silver-metal)" />

              {/* Branding:
                  Perspective 1: Laser on clip
                  Perspective 2: Laser on central cap
              */}
              {perspectiveId === "clip" ? (
                renderLogoOverlay(25, 4, 172, 8, 0, { fontSize: "3px", letterSpacing: "0.08em" })
              ) : (
                renderLogoOverlay(42, 10, 90, 17, 0, { fontSize: "6px", letterSpacing: "0.15em" })
              )}
            </g>
          </svg>
        );
      }
      case "ecobag-heavy": {
        // ECOBAG ALGODÃO CRU
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Long Cotton shoulder straps hanging */}
            <path d="M100,100 C100,30 130,20 130,100" fill="none" stroke="#d6cfbe" strokeWidth="11" strokeLinecap="round" />
            <path d="M170,100 C170,30 200,30 200,100" fill="none" stroke="#d6cfbe" strokeWidth="11" strokeLinecap="round" />

            <path d="M100,100 C100,35 130,25 130,100" fill="none" stroke="#c0b9a8" strokeWidth="5" strokeLinecap="round" />
            <path d="M170,100 C170,35 200,35 200,100" fill="none" stroke="#c0b9a8" strokeWidth="5" strokeLinecap="round" />

            {/* Ecobag body (slight trapezoidal shape with creases) */}
            <path d="M80,100 L220,100 C220,100 230,220 225,245 C222,260 210,265 150,265 C90,265 78,260 75,245 C70,220 80,100 80,100 Z" fill="#eaddca" stroke="#dcd0b8" strokeWidth="1" />

            {/* Fabric texture weave creases overlay */}
            <path d="M80,100 C92,130 90,240 100,255" fill="none" stroke="#dcd0b8" strokeWidth="1.5" opacity="0.7" />
            <path d="M220,100 C208,130 210,240 200,255" fill="none" stroke="#dcd0b8" strokeWidth="1.5" opacity="0.7" />
            
            {/* Horizontal stitch lines on top hem */}
            <path d="M80,107 L220,107" stroke="#bdaf93" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M80,111 L220,111" stroke="#bdaf93" strokeWidth="1" strokeDasharray="2,2" />

            {/* Brand Logo printed on full organic center canvas */}
            {renderLogoOverlay(90, 35, 150, 180, 0, { fontSize: "14px", letterSpacing: "0.25em", fill: accentColor })}
          </svg>
        );
      }
      case "kit-churrasco-couro": {
        // KIT CHURRASCO EM ESTOJO DE COURO
        const explodeY = isExploded ? 50 : 0;
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}

            {/* Estojo de Couro (Brown leather sheath case) */}
            <g id="leather-sheath" transform={`translate(0, ${isExploded ? 30 : 0})`}>
              <rect x="75" y="55" width="150" height="200" rx="14" fill="url(#leather-brown)" stroke="#23140d" strokeWidth="1.5" />
              
              {/* Gold/Cream Contrast Stitching along edge */}
              <rect x="80" y="60" width="140" height="190" rx="11" fill="none" stroke="#d9b166" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.75" />

              {/* Decorative Leather flaps */}
              <path d="M75,100 L225,100" stroke="#1d100a" strokeWidth="3" />
              <path d="M150,55 L150,255" stroke="#1d100a" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.4" />

              {/* Sheath brand plaque (Debossing deep leather stamp) */}
              {renderLogoOverlay(75, 28, 150, 185, 0, { fontSize: "10px", letterSpacing: "0.22em" })}
            </g>

            {/* Exploded Tools (Faca e Garfo flying upwards) */}
            <g id="barbecue-tools" transform={`translate(0, ${-explodeY * 1.2})`} style={{ opacity: isExploded ? 1 : 0.4, pointerEvents: "none" }}>
              {/* Knife */}
              <g transform="translate(90, 45) rotate(-15)">
                {/* Steel blade */}
                <path d="M10,5 L35,5 C55,5 75,10 90,0 C75,15 50,18 10,18 Z" fill="url(#silver-metal)" stroke="#475569" strokeWidth="0.5" />
                {/* Wood handle */}
                <rect x="-35" y="5" width="45" height="13" rx="3" fill="#4a2c11" stroke="#2a1402" strokeWidth="0.5" />
                {/* Brass handle rivets */}
                <circle cx="-25" cy="11" r="1.5" fill="#d9b166" />
                <circle cx="-5" cy="11" r="1.5" fill="#d9b166" />

                {/* Laser on Knife Blade */}
                {showCustomized && isExploded && (
                  <text x="35" y="11" fill="rgba(0,0,0,0.5)" style={{ fontFamily: "var(--font-mono)", fontSize: "4px", fontWeight: "bold" }}>
                    {logoText ? logoText.slice(0, 8) : "EXCLUSIVO"}
                  </text>
                )}
              </g>

              {/* Fork */}
              <g transform="translate(160, 45) rotate(15)">
                {/* Long thin steel shafts */}
                <path d="M0,11 L60,11" stroke="url(#silver-metal)" strokeWidth="3" />
                {/* Fork tines */}
                <path d="M60,11 C65,11 75,5 85,3" stroke="url(#silver-metal)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M60,11 C65,11 75,17 85,19" stroke="url(#silver-metal)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                
                {/* Handle */}
                <rect x="-45" y="5" width="45" height="12" rx="3" fill="#4a2c11" stroke="#2a1402" strokeWidth="0.5" />
                <circle cx="-35" cy="11" r="1.5" fill="#d9b166" />
                <circle cx="-15" cy="11" r="1.5" fill="#d9b166" />
              </g>
            </g>
          </svg>
        );
      }
      case "necessaire-viagem": {
        // NECESSAIRE VIAGEM
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Soft geometric leather/polyester shape */}
            <path d="M60,110 L240,110 C240,110 250,150 245,215 C242,230 230,235 150,235 C70,235 58,230 55,215 C50,150 60,110 60,110 Z" fill={baseColor === "#FFFFFF" ? "#cbd5e1" : baseColor} />

            {/* Sealed top zippers */}
            <path d="M64,110 L236,110" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M64,110 L236,110" stroke="url(#silver-metal)" strokeWidth="1" strokeDasharray="1,1" />

            {/* Loop handle on left edge */}
            <path d="M57,140 C35,140 35,180 57,180" fill="none" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />

            {/* Horizontal stitch divider line */}
            <path d="M57,165 C57,165 150,175 243,165" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />

            {/* Customizable leather plaque label tag */}
            {perspectiveId === "tag-emboss" ? (
              <>
                <rect x="110" y="180" width="80" height="24" rx="4" fill="url(#leather-brown)" stroke="#1d100a" strokeWidth="1" />
                {renderLogoOverlay(60, 18, 150, 194, 0, { fontSize: "7px", letterSpacing: "0.15em" })}
              </>
            ) : (
              // Standard body logo print
              renderLogoOverlay(70, 24, 150, 142, 0, { fontSize: "9px", letterSpacing: "0.2em" })
            )}
          </svg>
        );
      }
      case "hub-usbc-multi": {
        // HUB USB-C MULTIPORTAS
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Hub body angled dynamically */}
            <g transform="translate(60, 110) rotate(-15)">
              {/* Hub casing block */}
              <rect x="0" y="0" width="180" height="65" rx="8" fill="url(#silver-metal)" stroke="#334155" strokeWidth="1" />
              {/* Chamfered shine edges */}
              <rect x="2" y="2" width="176" height="61" rx="6" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

              {/* USB Female ports cutouts */}
              <rect x="20" y="56" width="24" height="6" fill="#1e293b" rx="1" />
              <rect x="60" y="56" width="24" height="6" fill="#1e293b" rx="1" />
              <rect x="100" y="56" width="24" height="6" fill="#1e293b" rx="1" />

              {/* HDMI port side detail */}
              <polygon points="178,20 178,45 174,40 174,25" fill="#0f172a" />

              {/* LED power indicator dot */}
              <circle cx="15" cy="32" r="2.5" fill="#22c55e" className="animate-pulse" />
              <circle cx="15" cy="32" r="1" fill="#ffffff" />

              {/* Short braided USB-C cable connector coming out */}
              <path d="M0,32 C-25,32 -35,50 -60,50" fill="none" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <rect x="-72" y="44" width="14" height="12" rx="2" fill="#334155" />
              <rect x="-82" y="47" width="10" height="6" rx="1" fill="url(#silver-metal)" />

              {/* Laser marked logo in center of block */}
              {renderLogoOverlay(80, 24, 95, 36, 0, { fontSize: "9px", letterSpacing: "0.22em" })}
            </g>
          </svg>
        );
      }
      case "guarda-chuva-portatil": {
        // GUARDA CHUVA PORTÁTIL
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Elegant closed sleeve/umbrella or open layout. Let's do a stunning closed executive sleeve profile */}
            <g transform="translate(110, 50)">
              {/* Sleeve casing using base color */}
              <rect x="20" y="10" width="40" height="180" rx="10" fill={baseColor} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
              
              {/* Sleeve folds / fabric details */}
              <path d="M20,60 C30,65 50,65 60,60" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
              <path d="M20,120 C30,125 50,125 60,120" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />

              {/* Matte black handle base */}
              <rect x="25" y="190" width="30" height="35" rx="5" fill="#18181b" />
              <rect x="25" y="190" width="30" height="10" fill="#09090b" />
              
              {/* Chrome loop hanger ring */}
              <path d="M40,225 C30,245 50,245 40,225" fill="none" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Automatic push button */}
              <rect x="37" y="198" width="6" height="8" rx="1" fill="url(#silver-metal)" />

              {/* Branding:
                  Perspective 1: Silk screen on central sleeve panel
                  Perspective 2: Suttle logo on top hem
              */}
              {perspectiveId === "cover-silk" ? (
                renderLogoOverlay(32, 12, 40, 32, 0, { fontSize: "5px", letterSpacing: "0.1em" })
              ) : (
                renderLogoOverlay(36, 16, 40, 95, 90, { fontSize: "8.5px", letterSpacing: "0.22em" })
              )}
            </g>
          </svg>
        );
      }
      case "camiseta-egipcia": {
        // CAMISETA ALGODÃO EGÍPCIO
        const fabricColor = baseColor === "#FFFFFF" ? "#f8fafc" : baseColor;
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Highly detailed t-shirt vector path with shadows */}
            <path d="M70,80 L100,70 C110,75 140,78 150,78 C160,78 190,75 200,70 L230,80 L250,125 L215,135 L210,120 L210,250 C210,256 200,260 150,260 C100,260 90,256 90,250 L90,120 L85,135 L50,125 Z" fill={fabricColor} />
            
            {/* Crew neck collar */}
            <path d="M118,73 C118,85 182,85 182,73" fill="none" stroke="#cbd5e1" strokeWidth="4.5" />
            <path d="M120,73 C120,83 180,83 180,73" fill="none" stroke="#94a3b8" strokeWidth="1" />

            {/* Sleeve crease lines */}
            <path d="M85,105 C75,115 72,120 72,120" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2.5" />
            <path d="M215,105 C225,115 228,120 228,120" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2.5" />

            {/* Drape wrinkles shadows */}
            <path d="M92,230 C120,240 180,240 208,230" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="3" />
            <path d="M100,140 C115,150 135,152 150,148 C165,144 185,146 200,152" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

            {/* Direct-To-Garment (DTG) chest branding overlay */}
            {perspectiveId === "neck-silk" ? (
              // Inner collar branding tag simulation
              <g transform="translate(150, 92)">
                <rect x="-20" y="-12" width="40" height="18" rx="2" fill="rgba(0,0,0,0.05)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                <text x="0" y="-2" textAnchor="middle" fill="#94a3b8" style={{ fontFamily: "var(--font-sans)", fontSize: "4px", fontWeight: "bold" }}>
                  EGYPTIAN COTTON
                </text>
                <text x="0" y="3" textAnchor="middle" fill={accentColor} style={{ fontFamily: "var(--font-mono)", fontSize: "3.5px" }}>
                  {logoText ? logoText.slice(0, 10).toUpperCase() : "CO. DESIGN"}
                </text>
              </g>
            ) : (
              // Main chest logo print
              renderLogoOverlay(85, 30, 150, 155, 0, { fontSize: "12px", letterSpacing: "0.25em", fill: accentColor })
            )}
          </svg>
        );
      }
      case "caixa-som-waterproof": {
        // CAIXA DE SOM BLUETOOTH WATERPROOF
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Speaker body lying sideways rounded barrel */}
            <g transform="translate(70, 110)">
              <rect x="0" y="0" width="160" height="80" rx="35" fill="#18181b" stroke="#27272a" strokeWidth="1" />
              
              {/* Mesh fabric texture body center */}
              <rect x="25" y="1" width="110" height="78" fill="#111827" />
              {/* Dotted serigraphy lattice for grill */}
              <rect x="25" y="1" width="110" height="78" fill="none" stroke="#1f2937" strokeWidth="2" strokeDasharray="1,1" opacity="0.4" />

              {/* Rubber shock ends */}
              <path d="M25,0 C10,0 0,20 0,40 C0,60 10,80 25,80 Z" fill="#27272a" />
              <path d="M135,0 C150,0 160,20 160,40 C160,60 150,80 135,80 Z" fill="#27272a" />

              {/* Control buttons molded in rubber ends (reacts to brand accent) */}
              <g stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8">
                {/* Minus */}
                <line x1="8" y1="35" x2="14" y2="35" />
                {/* Plus */}
                <line x1="146" y1="35" x2="152" y2="35" />
                <line x1="149" y1="32" x2="149" y2="38" />
              </g>

              {/* PU Polyurethane Resin Badge (Center) */}
              {renderLogoOverlay(48, 18, 80, 40, 0, { fontSize: "7px", letterSpacing: "0.15em" })}
            </g>
          </svg>
        );
      }
      case "cordao-lanyard-acetinado": {
        // CORDÃO LANYARD ACETINADO
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Interlacing loops of the ribbon lanyard */}
            <path d="M90,50 C120,50 120,200 150,200 C180,200 180,50 210,50" fill="none" stroke="#cbd5e1" strokeWidth="22" strokeLinecap="round" />
            <path d="M90,50 C120,50 120,200 150,200 C180,200 180,50 210,50" fill="none" stroke={accentColor === "#3b82f6" ? "url(#sublimation-rainbow)" : accentColor} strokeWidth="18" strokeLinecap="round" />

            {/* Inner shadows/creases */}
            <path d="M90,50 C120,50 120,200 150,200 C180,200 180,50 210,50" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6" strokeLinecap="round" />

            {/* Metal heavy snap lobster hook bottom connection */}
            <g transform="translate(138, 195)">
              {/* Clasp crimp band */}
              <rect x="5" y="2" width="14" height="12" rx="1" fill="url(#silver-metal)" />
              {/* Ring */}
              <circle cx="12" cy="22" r="7" fill="none" stroke="url(#silver-metal)" strokeWidth="3.5" />
              {/* Snap clip */}
              <path d="M12,27 L12,45 C7,45 6,38 12,38 L18,38" fill="none" stroke="url(#silver-metal)" strokeWidth="3" />
            </g>

            {/* Safety clip at top shoulder loops */}
            <rect x="80" y="45" width="20" height="10" rx="2" fill="#1e293b" />
            <rect x="200" y="45" width="20" height="10" rx="2" fill="#1e293b" />

            {/* Repeating sublimated client brand logotype on left ribbon segment */}
            {showCustomized && (
              <g transform="translate(100, 110) rotate(78)">
                <text x="0" y="0" textAnchor="middle" fill="#ffffff" style={{ fontFamily: "var(--font-sans)", fontSize: "5.5px", fontWeight: "bold", letterSpacing: "0.2em" }}>
                  {logoText ? logoText.toUpperCase() : "EXCLUSIVO"}
                </text>
              </g>
            )}
            {showCustomized && (
              <g transform="translate(200, 110) rotate(-78)">
                <text x="0" y="0" textAnchor="middle" fill="#ffffff" style={{ fontFamily: "var(--font-sans)", fontSize: "5.5px", fontWeight: "bold", letterSpacing: "0.2em" }}>
                  {logoText ? logoText.toUpperCase() : "EXCLUSIVO"}
                </text>
              </g>
            )}
          </svg>
        );
      }
      case "planner-anual": {
        // PLANNER CORPORATIVO ANUAL
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Book back block paper edges */}
            <rect x="85" y="62" width="138" height="178" rx="4" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1" />
            
            {/* Cover board utilizing chosen color */}
            <rect x="80" y="60" width="140" height="182" rx="5" fill={baseColor} />
            <rect x="80" y="60" width="140" height="182" rx="5" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

            {/* Wire-O Metal Binding Oculto details on spine edge */}
            <g transform="translate(64, 65)">
              {[...Array(14)].map((_, i) => (
                <path
                  key={i}
                  d={`M12,${i * 12} C22,${i * 12 - 2} 24,${i * 12 + 6} 12,${i * 12 + 8}`}
                  fill="none"
                  stroke="url(#silver-metal)"
                  strokeWidth="2.5"
                />
              ))}
              {/* Black inner spine backing */}
              <rect x="16" y="-5" width="6" height="174" fill="#0f172a" />
            </g>

            {/* Elastic strap matching brand accent */}
            <rect x="195" y="60" width="8" height="182" fill={accentColor} opacity="0.85" />
            <line x1="199" y1="60" x2="199" y2="242" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* Branding options:
                Perspective 1: Hot Stamping silver center
                Perspective 2: UV Gloss pattern
            */}
            {renderLogoOverlay(64, 25, 142, 140, 0, { fontSize: "10px", letterSpacing: "0.22em" })}
          </svg>
        );
      }
      case "squeeze-silicone": {
        // SQUEEZE DE VIDRO COM LUVA SILICONE
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Drop shadow ellipse */}
            <ellipse cx="150" cy="265" rx="30" ry="7" fill="rgba(0,0,0,0.2)" />

            {/* Clear Borosilicate glass bottle body */}
            <rect x="120" y="90" width="60" height="165" rx="10" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            {/* Water transparency inside bottle */}
            <rect x="122" y="110" width="56" height="143" rx="8" fill={accentColor} opacity="0.15" />

            {/* Heavy Protective Silicone Sleeve on lower body */}
            <path d="M120,165 L180,165 L180,248 C180,252 175,255 150,255 C125,255 120,252 120,248 Z" fill={baseColor === "#A855F7" ? "#8b5cf6" : baseColor} />
            {/* Sleeve vertical lines details */}
            <line x1="135" y1="175" x2="135" y2="245" stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="150" y1="175" x2="150" y2="245" stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="165" y1="175" x2="165" y2="245" stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Eco Bamboo Wood cap with seal */}
            <rect x="125" y="60" width="50" height="25" rx="3" fill="url(#bambu-grain)" stroke="#a16207" strokeWidth="0.5" />
            {/* Bamboo rings texture */}
            <ellipse cx="150" cy="65" rx="22" ry="3" fill="none" stroke="#78350f" strokeWidth="0.5" opacity="0.6" />
            
            {/* Polyester holding strap hanging off cap */}
            <path d="M172,72 C200,72 200,105 172,105" fill="none" stroke="#334155" strokeWidth="5.5" strokeLinecap="round" />

            {/* Custom branding:
                Perspective 1: Bamboo Laser engraved Cap
                Perspective 2: Silk print on Silicone sleeve
            */}
            {perspectiveId === "bamboo-laser" ? (
              // Laser Burned Wood Cap logo
              renderLogoOverlay(36, 12, 150, 75, 0, { fontSize: "4.5px", letterSpacing: "0.08em" })
            ) : (
              // Silk printed logo on Silicone Sleeve body
              renderLogoOverlay(48, 18, 150, 205, 0, { fontSize: "7px", letterSpacing: "0.15em" })
            )}
          </svg>
        );
      }
      case "base-wireless-bambu": {
        // BASE CARREGADORA BAMBU
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {showCustomized && <circle cx="150" cy="150" r="110" fill="url(#soft-glow)" />}
            
            {/* Rounded bamboo charging pad disk (3D slant perspective) */}
            <ellipse cx="150" cy="165" rx="90" ry="60" fill="url(#bambu-grain)" stroke="#a16207" strokeWidth="1" />
            {/* Thickness edge side */}
            <path d="M60,165 C60,205 240,205 240,165 L240,175 C240,215 60,215 60,175 Z" fill="#b45309" />
            
            {/* Organic Wood grains pattern curves */}
            <path d="M70,150 C120,180 180,180 230,150" fill="none" stroke="#78350f" strokeWidth="1" opacity="0.15" />
            <path d="M65,170 C110,200 190,200 235,170" fill="none" stroke="#78350f" strokeWidth="1" opacity="0.12" />

            {/* Qi center induction circle (discrete engraved groove) */}
            <ellipse cx="150" cy="165" rx="55" ry="36" fill="none" stroke="#78350f" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.35" />

            {/* Premium laser burned brand branding */}
            {renderLogoOverlay(64, 25, 150, 165, 0, { fontSize: "9px", letterSpacing: "0.2em" })}
          </svg>
        );
      }
      case "kit-vinho-eletrico": {
        // KIT VINHO E SACA-ROLHAS ELÉTRICO
        const explodeY = isExploded ? 55 : 0;
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}

            {/* Luxury Pinus Wooden Box Case */}
            <g id="wooden-vinho-box" transform={`translate(0, ${isExploded ? 30 : 0})`}>
              {/* Outer wood case */}
              <rect x="65" y="60" width="170" height="185" rx="6" fill="#e9d3b0" stroke="#b45309" strokeWidth="1.5" />
              {/* Wood grain pattern */}
              <line x1="75" y1="65" x2="75" y2="240" stroke="#78350f" strokeWidth="1" opacity="0.1" />
              <line x1="225" y1="65" x2="225" y2="240" stroke="#78350f" strokeWidth="1" opacity="0.1" />
              
              {/* Brass envelhecido hinges latch */}
              <rect x="142" y="240" width="16" height="8" rx="1" fill="#c2410c" />
              
              {/* Velvet Interior EVA cutouts when closed */}
              {!isExploded && <rect x="75" y="70" width="150" height="165" rx="4" fill="#18181b" />}

              {/* Box Cover branding deeply laser burned */}
              {renderLogoOverlay(85, 30, 150, 152, 0, { fontSize: "11px", letterSpacing: "0.22em" })}
            </g>

            {/* Electric opener & accessories floating */}
            <g id="wine-tools" transform={`translate(0, ${-explodeY * 1.2})`} style={{ opacity: isExploded ? 1 : 0.4, pointerEvents: "none" }}>
              {/* Electric Opener (Sleek anodized metal cylinder) */}
              <g transform="translate(90, 45)">
                <rect x="0" y="0" width="22" height="100" rx="4" fill="#3f3f46" stroke="#52525b" strokeWidth="0.5" />
                {/* Metallic button */}
                <rect x="7" y="40" width="8" height="15" rx="1.5" fill="url(#silver-metal)" />
                {/* Transparent bottom showing coil */}
                <rect x="2" y="70" width="18" height="26" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />
                {/* Spiral worm coil */}
                <path d="M11,72 L11,94" stroke="#18181b" strokeWidth="3" strokeDasharray="1,2" />

                {/* Micro logo on opener casing */}
                {showCustomized && (
                  <text x="11" y="22" textAnchor="middle" fill="#d1d5db" style={{ fontFamily: "var(--font-sans)", fontSize: "2.5px" }}>
                    {logoText ? logoText.slice(0, 8).toUpperCase() : "OPUS"}
                  </text>
                )}
              </g>

              {/* Aerator Pourer spigot */}
              <g transform="translate(145, 60) rotate(15)">
                <polygon points="5,0 15,0 20,45 0,45" fill="rgba(255,255,255,0.4)" stroke="rgba(255,255,255,0.6)" />
                <rect x="3" y="45" width="14" height="15" fill="#18181b" />
              </g>

              {/* Foil cutter disk */}
              <circle cx="185" cy="115" r="15" fill="#27272a" />
              <circle cx="185" cy="115" r="8" fill="#18181b" />
            </g>
          </svg>
        );
      }
      case "camisa-polo-piquet": {
        // CAMISA POLO PIQUET PREMIUM
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {/* Folder layout of polo shirt */}
            <g id="polo-body">
              {/* Main torso body */}
              <path d="M75,90 L225,90 L225,245 L75,245 Z" fill={baseColor} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              {/* Sleeve Left */}
              <path d="M75,90 L40,115 L55,145 L75,130 Z" fill={baseColor} brightness="0.95" />
              {/* Sleeve Right */}
              <path d="M225,90 L260,115 L245,145 L225,130 Z" fill={baseColor} brightness="0.95" />
              
              {/* Fold lines/shadows */}
              <line x1="75" y1="130" x2="225" y2="130" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
              <line x1="100" y1="90" x2="100" y2="245" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
              <line x1="200" y1="90" x2="200" y2="245" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />

              {/* Ribbed sleeve cuffs detail */}
              <line x1="41" y1="116" x2="54" y2="144" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
              <line x1="259" y1="116" x2="246" y2="144" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />

              {/* Placket neck with buttons */}
              <rect x="138" y="90" width="24" height="48" fill="rgba(0,0,0,0.12)" />
              <line x1="150" y1="90" x2="150" y2="138" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              {/* Real micro buttons */}
              <circle cx="150" cy="102" r="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="150" cy="116" r="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.5" />
              <circle cx="150" cy="130" r="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="0.5" />

              {/* Stiff structured collar points */}
              <polygon points="108,90 150,110 138,90" fill={baseColor} filter="url(#light-shadow)" />
              <polygon points="192,90 150,110 162,90" fill={baseColor} filter="url(#light-shadow)" />
              <path d="M108,90 Q150,68 192,90 Z" fill="rgba(0,0,0,0.15)" />

              {/* Piquet fabric micro weave mesh indicator */}
              <rect x="80" y="145" width="140" height="90" fill="rgba(255,255,255,0.03)" filter="url(#garment-texture)" opacity="0.15" />

              {/* Brand Logo Overlay on left chest pocket area */}
              {renderLogoOverlay(48, 18, 114, 134, 0, { fontSize: "7px", letterSpacing: "0.15em" })}
            </g>
          </svg>
        );
      }
      case "sacola-juta-premium": {
        // SACOLA DE JUTA E ALGODÃO
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            {/* Jute bag body */}
            <g id="jute-bag">
              {/* Rope Handles */}
              <path d="M110,85 Q110,35 125,35 T140,85" fill="none" stroke="#d4af37" strokeWidth="7" strokeLinecap="round" opacity="0.75" />
              <path d="M160,85 Q160,35 175,35 T190,85" fill="none" stroke="#d4af37" strokeWidth="7" strokeLinecap="round" opacity="0.75" />
              
              {/* Main Jute Body */}
              <rect x="75" y="80" width="150" height="155" rx="10" fill="#d8b4fe" style={{ fill: "#d4b281" }} stroke="#a16207" strokeWidth="1" />
              {/* Raw jute criss-cross weave pattern overlay */}
              <rect x="78" y="83" width="144" height="149" rx="8" fill="rgba(255,255,255,0.04)" filter="url(#garment-texture)" opacity="0.32" />
              
              {/* Luxury cotton pocket on front side */}
              <rect x="95" y="125" width="110" height="95" rx="5" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="1" filter="url(#light-shadow)" />
              {/* Pocket stitches line */}
              <rect x="98" y="128" width="104" height="89" rx="3" fill="none" stroke="#d6d3d1" strokeWidth="0.8" strokeDasharray="3,2" />

              {/* Brand Logo Overlay on off-white pocket center */}
              {renderLogoOverlay(64, 25, 150, 172, 0, { fontSize: "8.5px", letterSpacing: "0.22em" })}
            </g>
          </svg>
        );
      }
      case "bone-trucker-premium": {
        // BONÉ TRUCKER PREMIUM
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            <g id="trucker-cap" transform="translate(0, 10)">
              {/* Back mesh panels of cap */}
              <path d="M80,180 C80,110 110,95 150,95 C190,95 220,110 220,180 Z" fill="#27272a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              {/* Mesh texturizer */}
              <path d="M80,180 C80,110 110,95 150,95 C190,95 220,110 220,180 Z" fill="rgba(255,255,255,0.06)" filter="url(#garment-texture)" opacity="0.4" />

              {/* Stiff front canvas panel */}
              <path d="M90,180 C90,115 110,100 150,100 C190,100 210,115 210,180 Z" fill={baseColor} />

              {/* Visor / Brim curved */}
              <path d="M70,182 C70,182 110,215 150,215 C190,215 230,182 230,182 C230,182 190,192 150,192 C110,192 70,182 70,182 Z" fill={baseColor} brightness="0.82" filter="url(#light-shadow)" />
              {/* Brim stitch lines */}
              <path d="M85,186 Q150,208 215,186" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4,2" />
              <path d="M95,190 Q150,212 205,190" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4,2" />

              {/* Squatchee button on very top */}
              <circle cx="150" cy="95" r="7" fill={baseColor} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

              {/* High-definition premium 3D Embroidery logo in center */}
              {renderLogoOverlay(55, 20, 150, 142, 0, { fontSize: "8px", letterSpacing: "0.2em" })}
            </g>
          </svg>
        );
      }
      case "faixa-cetim-decorativa": {
        // FAIXA / FITA DE CETIM DE LUXO
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            <g id="satin-ribbon">
              {/* Spool center core structure */}
              <ellipse cx="150" cy="180" rx="65" ry="15" fill="#52525b" stroke="#71717a" strokeWidth="1" />
              
              {/* Rolled Ribbon layers of satin */}
              <path d="M85,120 L215,120 L215,180 L85,180 Z" fill={baseColor} />
              {/* Satin glossy reflex lines */}
              <linearGradient id="gloss-rib" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                <stop offset="25%" stopColor="rgba(255,255,255,0.25)" stopOpacity="0.4" />
                <stop offset="50%" stopColor="rgba(0,0,0,0.1)" />
                <stop offset="75%" stopColor="rgba(255,255,255,0.25)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
              </linearGradient>
              <rect x="85" y="120" width="130" height="60" fill="url(#gloss-rib)" />

              {/* Spool base and top lips */}
              <ellipse cx="150" cy="120" rx="70" ry="16" fill="#18181b" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <ellipse cx="150" cy="180" rx="72" ry="16" fill="#18181b" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

              {/* Unrolled gorgeous wavy ribbon displaying the gold foil hot stamping */}
              <path d="M40,215 Q110,185 150,225 T260,195 L255,215 Q190,245 150,205 T40,235 Z" fill={baseColor} filter="url(#light-shadow)" />
              <path d="M40,215 Q110,185 150,225 T260,195 L255,215 Q190,245 150,205 T40,235 Z" fill="url(#gloss-rib)" opacity="0.6" />

              {/* Brand stamp layered over the unrolled segment */}
              {renderLogoOverlay(48, 15, 150, 215, -10, { fontSize: "7px", letterSpacing: "0.18em" })}
            </g>
          </svg>
        );
      }
      case "avental-sarja-gourmet": {
        // AVENTAL GOURMET DE SARJA E COURO
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full" filter="url(#drop-shadow)">
            {renderDefs()}
            <g id="gourmet-apron">
              {/* PU Leather neck suspender loop */}
              <path d="M105,95 Q150,40 195,95" fill="none" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
              
              {/* Bib / Apron body shape */}
              <path d="M100,90 L200,90 L225,160 L225,255 L75,255 L75,160 Z" fill={baseColor} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              {/* Sarja diagonal weave texture */}
              <path d="M100,90 L200,90 L225,160 L225,255 L75,255 L75,160 Z" fill="rgba(255,255,255,0.02)" filter="url(#garment-texture)" opacity="0.2" />

              {/* Stitched hems border details */}
              <path d="M102,94 L198,94 L221,158 L221,251 L79,251 L79,158 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="3,1" />

              {/* Large Divided Utility Pocket */}
              <rect x="90" y="175" width="120" height="60" rx="3" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="150" y1="175" x2="150" y2="235" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3,1" />
              {/* Rivets at pocket corners */}
              <circle cx="93" cy="178" r="2.5" fill="url(#gold-gradient)" />
              <circle cx="207" cy="178" r="2.5" fill="url(#gold-gradient)" />
              <circle cx="150" cy="178" r="1.5" fill="url(#gold-gradient)" />

              {/* Beautiful stitched leather branding tag on C-Level chest */}
              <rect x="120" y="115" width="60" height="25" rx="3.5" fill="url(#leather-brown)" stroke="#78350f" strokeWidth="0.8" filter="url(#light-shadow)" />
              {/* Leather stitch border line */}
              <rect x="122" y="117" width="56" height="21" rx="2.5" fill="none" stroke="#b45309" strokeWidth="0.6" strokeDasharray="2,1" opacity="0.7" />

              {/* Custom Laser engraved brand applied over leather patch */}
              {renderLogoOverlay(48, 16, 150, 126, 0, { fontSize: "6.5px", letterSpacing: "0.18em", fill: "url(#gold-gradient)" })}
            </g>
          </svg>
        );
      }
      default:
        return (
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <rect x="50" y="50" width="200" height="200" rx="10" fill={baseColor} />
            {renderLogoOverlay(64, 25, 150, 150, 0)}
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full aspect-square flex flex-col items-center justify-center select-none">
      
      {/* Floating glassmorphic view mode toggle bar */}
      <div className="absolute top-2 right-2 z-10 flex bg-black/75 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-lg gap-1">
        <button
          onClick={() => onChangeViewMode?.("photo")}
          className={`flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider py-1 px-2.5 rounded-full transition-all duration-300 ${
            viewMode === "photo"
              ? "bg-gold text-black font-bold shadow-md shadow-gold/20 scale-102"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
          title="Ver Mockup em Alta Resolução"
        >
          <Camera size={11} className={viewMode === "photo" ? "text-black" : "text-gold"} />
          Foto Estúdio
        </button>
        <button
          onClick={() => onChangeViewMode?.("vector")}
          className={`flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider py-1 px-2.5 rounded-full transition-all duration-300 ${
            viewMode === "vector"
              ? "bg-gold text-black font-bold shadow-md shadow-gold/20 scale-102"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
          title="Ver Vetor Técnico 3D"
        >
          <Cpu size={11} className={viewMode === "vector" ? "text-black" : "text-gold"} />
          Vetor Técnico
        </button>
        <button
          onClick={() => onChangeViewMode?.("3d")}
          className={`flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider py-1 px-2.5 rounded-full transition-all duration-300 ${
            viewMode === "3d"
              ? "bg-gold text-black font-bold shadow-md shadow-gold/20 scale-102"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          }`}
          title="Ver Visualizador 3D PBR Real"
        >
          <Sparkles size={11} className={viewMode === "3d" ? "text-black" : "text-gold"} />
          Estúdio 3D PBR
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${product.id}-${isExploded ? "exploded" : "neutral"}-${perspectiveId || "default"}-${viewMode}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full h-full flex items-center justify-center"
        >
          {viewMode === "3d" ? (
            <ThreePBRStudio
              productId={product.id}
              brandColor={brandColor}
              logoText={logoText}
              activeTechnique={activeTechnique}
              isExploded={isExploded}
            />
          ) : viewMode === "photo" ? (
            renderProductPhoto()
          ) : (
            renderProductSVG()
          )}
        </motion.div>
      </AnimatePresence>

      {/* Technical Blueprint Overlay */}
      {showTechnicalGrid && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl border-2 border-dashed border-teal-500/30">
          {/* Blueprint Grid background */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                radial-gradient(circle, rgba(20, 184, 166, 0.4) 1px, transparent 1px),
                linear-gradient(to right, rgba(20, 184, 166, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px, 40px 40px, 40px 40px"
            }}
          />

          {/* Crosshairs */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-teal-500/25 border-dashed" />
          <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-teal-500/25 border-dashed" />

          {/* Dynamic Bounding Box around the Logo's estimated coordinate area */}
          {showCustomized && (
            <div
              className="absolute border border-teal-500/45 bg-teal-500/5 flex items-center justify-center transition-all duration-150 ease-out"
              style={{
                left: `${50 + logoOffsetX}%`,
                top: `${52 + logoOffsetY}%`,
                width: `${18 * logoSizeMultiplier + 6}%`,
                height: `${10 * logoSizeMultiplier + 4}%`,
                transform: `translate(-50%, -50%) rotate(${logoRotationOffset}deg)`,
              }}
            >
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-teal-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-teal-400" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-teal-400" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-teal-400" />
              
              {/* Area label */}
              <span className="absolute -top-4 left-1 text-[8px] font-mono bg-teal-950/90 text-teal-300 px-1 border border-teal-500/25 uppercase leading-none py-0.5 whitespace-nowrap">
                Área de Estampa (Safe)
              </span>
            </div>
          )}

          {/* Floating Technical Stats panel at the bottom center */}
          <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/95 border border-teal-500/35 rounded-xl px-3 py-2 flex items-center justify-between text-[8px] font-mono text-teal-400 backdrop-blur-sm shadow-xl">
            <div className="flex gap-3">
              <span>ALINHAMENTO: <strong className="text-teal-200">CENTRO REAL</strong></span>
              <span>•</span>
              <span>COORD: <strong className="text-teal-200">X: {logoOffsetX > 0 ? `+${logoOffsetX}` : logoOffsetX}% | Y: {logoOffsetY > 0 ? `+${logoOffsetY}` : logoOffsetY}%</strong></span>
            </div>
            <div className="flex gap-3">
              <span>ESCALA: <strong className="text-teal-200">{Math.round(logoSizeMultiplier * 100)}%</strong></span>
              <span>•</span>
              <span>ÂNGULO: <strong className="text-teal-200">{logoRotationOffset}°</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
