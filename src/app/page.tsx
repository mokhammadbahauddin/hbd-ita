'use client';
import { useEffect, useState } from 'react';
import './home.css';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // --- PERFORMANCE SPRITE CACHE ---
    const Sprites: any = {
      pine: null,
      sakura: null,
      grass: null,
      initialized: false
    };

    const initSprites = (ctx: CanvasRenderingContext2D) => {
      if (Sprites.initialized) return;
      const createCache = (w: number, h: number, drawFn: Function) => {
        const can = document.createElement('canvas');
        can.width = w; can.height = h;
        drawFn(can.getContext('2d'));
        return can;
      };
      Sprites.pine = createCache(100, 200, (c: any) => {
        c.fillStyle = "#1A3A36"; c.fillRect(46, 160, 8, 40);
        c.beginPath(); c.moveTo(50, 40); c.lineTo(20, 140); c.lineTo(80, 140); c.fill();
        c.beginPath(); c.moveTo(50, 90); c.lineTo(10, 180); c.lineTo(90, 180); c.fill();
      });
      Sprites.sakura = createCache(150, 200, (c: any) => {
        c.fillStyle = "#6D524C"; c.fillRect(71, 150, 8, 50);
        c.fillStyle = "#4CAF50"; c.beginPath(); c.arc(75, 100, 50, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(45, 110, 40, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(105, 110, 40, 0, Math.PI * 2); c.fill();
      });
      Sprites.grass = createCache(20, 30, (c: any) => {
        c.strokeStyle = "#8BC34A"; c.lineWidth = 2;
        c.beginPath(); c.moveTo(10, 30); c.quadraticCurveTo(5, 15, 10, 5); c.stroke();
      });
      Sprites.initialized = true;
    };

    // --- UTILS & CONSTANTS ---
    const PHOTO_ASSETS = [
      "/images/memories/WhatsApp Image 2026-01-04 at 19.17.39.jpeg",
      "/images/memories/WhatsApp Image 2026-01-25 at 23.31.14.jpeg",
      "/images/memories/WhatsApp Image 2026-01-26 at 14.42.49.jpeg",
      "/images/memories/WhatsApp Image 2026-02-15 at 11.51.42.jpeg",
      "/images/memories/WhatsApp Image 2026-02-18 at 18.35.53.jpeg",
      "/images/memories/WhatsApp Image 2026-02-23 at 12.15.29.jpeg",
      "/images/memories/WhatsApp Image 2026-03-04 at 22.51.37.jpeg",
      "/images/memories/WhatsApp Image 2026-03-12 at 23.35.31.jpeg"
    ];

    // --- UTILS & CONSTANTS ---
    const WORLD_LENGTH = 15000; 
    const LYRICS_DATA = [
      { time: 203.8, text: "Andai dulu kau tak pergi dari hidupku" },
      { time: 209.2, text: "Takkan mungkin kutemui cinta yang kini kumiliki" },
      { time: 217.8, text: "Cinta yang menerima kekurangan" },
      { time: 224.1, text: "Dan merubah caraku memandang dunia" },
      { time: 230.5, text: "Andai dulu kupaksakan t'rus bersamamu" },
      { time: 237.9, text: "Belum tentu kisah kita berdua berakhir bahagia" },
      { time: 245.2, text: "Kisah yang mendewasakan kita berdua" },
      { time: 250.8, text: "Meski lewat luka..." },
      { time: 257.5, text: "Satu hal yang kini aku mengerti" },
      { time: 263.8, text: "Meski berat bibir ini mengucap" },
      { time: 269.2, text: "Akan selalu ada kata 'Selamat'" },
      { time: 274.8, text: "Dalam setiap kata 'Selamat tinggal'" },
      { time: 279.5, text: "..." },
      { time: 286.2, text: "Samar kudengar..." },
      { time: 289.5, text: "Di tempat ini..." },
      { time: 292.8, text: "Suara yang selalu kukenal, itu suaramu..." },
      { time: 295.5, text: "Di tempat pertama aku menemukanmu..." }
    ];

    const PALETTES = {
      morning: { skyT: "#87CEFA", skyB: "#FFE4B5", sun: "#FFF9D2", mount: "#5A7280", groundT: "#8BC34A", groundB: "#D2B48C" },
      afternoon: { skyT: "#4A90E2", skyB: "#E0F6FF", sun: "#FFFFFF", mount: "#4A6270", groundT: "#689F38", groundB: "#C19A6B" },
      sunset: { skyT: "#1A237E", skyB: "#FF8A65", sun: "#FFD54F", mount: "#3A4550", groundT: "#558B2F", groundB: "#A07855" },
      night: { skyT: "#0A1128", skyB: "#1C2A48", sun: "#E2E8F0", mount: "#1A2228", groundT: "#2B3A2C", groundB: "#3E2723" }
    };

    const PHOTO_TITLES = ["Senyummu", "Kenangan", "Bersamamu", "Sempurna", "Tak Terlupakan", "Kisah Kita", "Selamanya", "Cinta"];

    const Utils = {
      lerp: (s: number, e: number, a: number) => (1 - a) * s + a * e,
      clamp: (v: number, min: number, max: number) => Math.min(Math.max(v, min), max),
      rand: (min: number, max: number) => Math.random() * (max - min) + min,
      shuffle: (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
      hexToRgb: (color: string) => {
        if (color.startsWith('rgb')) {
          const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          return m ? { r: parseInt(m[1], 10), g: parseInt(m[2], 10), b: parseInt(m[3], 10) } : { r: 0, g: 0, b: 0 };
        }
        const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 0, b: 0 };
      },
      lerpColor: (h1: string, h2: string, f: number) => {
        const c1 = Utils.hexToRgb(h1), c2 = Utils.hexToRgb(h2);
        const r = Math.round(Utils.lerp(c1.r, c2.r, f));
        const g = Math.round(Utils.lerp(c1.g, c2.g, f));
        const b = Math.round(Utils.lerp(c1.b, c2.b, f));
        return `rgb(${r},${g},${b})`;
      }
    };

    class Cat {
      type: string;
      x: number;
      y: number;
      facing: number;
      walkCycle: number;
      breatheCycle: number;
      tailCycle: number;
      state: string;
      colorMain: string;
      colorShadow: string;
      colorBelly: string;
      colorScarf: string;
      hasBlush: boolean;

      constructor(type = 'male') {
        this.type = type;
        this.x = type === 'male' ? 200 : WORLD_LENGTH; // NPC tepat di akhir dunia
        this.y = 0;
        this.facing = type === 'male' ? 1 : -1;
        this.walkCycle = 0;
        this.breatheCycle = 0;
        this.tailCycle = 0;
        this.state = 'idle';
        if (type === 'male') {
          this.colorMain = "#FF9F1C";   // Rich Orange
          this.colorShadow = "#E56B1F"; // Dark Orange
          this.colorBelly = "#FFE8D6";  // Cream
          this.colorScarf = "#2EC4B6";  // Teal Scarf
          this.hasBlush = true;
        } else {
          this.colorMain = "#FDFFFC";   // Pure White
          this.colorShadow = "#F1D3D9"; // Soft Pink Shadow
          this.colorBelly = "#FFFFFF";  // Bright White
          this.colorScarf = "#F07167";  // Coral Ribbon
          this.hasBlush = true;
        }
      }
      update(isWalking = false, speedScale = 1.0) {
        this.breatheCycle += 0.05;
        if (isWalking) {
          this.state = 'walking';
          // SYNC: Kaki melangkah sesuai kecepatan gerak (anti-gliding)
          this.walkCycle += 0.16 * speedScale;
        } else {
          this.state = 'idle';
          this.walkCycle = Utils.lerp(this.walkCycle, 0, 0.1);
        }
      }
      draw(ctx: CanvasRenderingContext2D, cameraX: number, groundY: number, isPortrait: boolean) {
        const screenX = this.x - cameraX;
        if (screenX < -200 || screenX > ctx.canvas.width + 200) return;
        ctx.save();
        ctx.translate(screenX, groundY);
        const baseScale = isPortrait ? 0.8 : 1.1;

        const isMoving = this.state === 'walking';
        const cycle = this.walkCycle;
        const bCycle = this.breatheCycle;

        // Advanced Rigged Animation Logic (Squash, Stretch, Bounce, Tilt)
        const bounce = isMoving ? Math.abs(Math.sin(cycle)) * -14 : Math.sin(bCycle) * 2;
        const bodyRotate = isMoving ? Math.sin(cycle) * 0.05 : Math.sin(bCycle * 0.5) * 0.02;
        const stretch = isMoving ? 1 + Math.abs(Math.cos(cycle)) * 0.04 : 1 + Math.sin(bCycle) * 0.02;
        const squash = isMoving ? 1 - Math.abs(Math.cos(cycle)) * 0.04 : 1 - Math.sin(bCycle) * 0.02;

        ctx.scale(this.facing * baseScale, baseScale);

        // 1. Dynamic Ground Shadow
        ctx.fillStyle = "rgba(27, 43, 30, 0.15)";
        ctx.beginPath();
        const shadowWidth = isMoving ? 24 + Math.abs(Math.sin(cycle)) * 5 : 26;
        ctx.ellipse(-3, 0, shadowWidth, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Lift body space up from ground
        ctx.translate(0, bounce - 22);
        ctx.rotate(bodyRotate);
        ctx.scale(stretch, squash);

        // 2. TAIL (Thick Volumetric Curved Tail)
        const tailTime = isMoving ? cycle * 0.8 : bCycle;
        const tailX = -22;
        const tailY = -5;
        const tailBendX = tailX - 25 + Math.sin(tailTime) * 12;
        const tailBendY = tailY - 15 + Math.cos(tailTime) * 8;

        ctx.strokeStyle = this.colorShadow; // Outline/Shadow layer for depth
        ctx.lineWidth = 14;
        ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.quadraticCurveTo(tailBendX - 10, tailBendY - 10, tailBendX, tailBendY); ctx.stroke();

        ctx.strokeStyle = this.colorMain; // Core tail layer
        ctx.lineWidth = 10;
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.quadraticCurveTo(tailBendX - 10, tailBendY - 10, tailBendX, tailBendY); ctx.stroke();

        // 3. LEGS (Thick 2D Rigged style instead of thin rubber hoses)
        const legSwing1 = Math.sin(cycle) * 14;
        const legLift1 = Math.max(0, Math.cos(cycle) * 12);
        const legSwing2 = Math.sin(cycle + Math.PI) * 14;
        const legLift2 = Math.max(0, Math.cos(cycle + Math.PI) * 12);

        const drawLeg = (baseX: number, baseY: number, swing: number, lift: number, isBack: boolean) => {
          ctx.save();
          // A procedural segmented leg
          const footX = baseX + swing;
          const footY = 22 - lift; // 22 is distance to reach the ground from hoisted body center

          ctx.lineWidth = 11;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = isBack ? this.colorShadow : this.colorMain;

          ctx.beginPath();
          ctx.moveTo(baseX, baseY);
          // Bending knee
          const kneeX = baseX + swing * 0.5 + (lift > 0 ? 5 : 0);
          const kneeY = baseY + 8 - lift * 0.5;
          ctx.quadraticCurveTo(kneeX, kneeY, footX, footY);
          ctx.stroke();

          // Little paw highlight on foreground legs when lifted
          if (!isBack && lift > 0) {
            ctx.fillStyle = this.colorBelly;
            ctx.beginPath(); ctx.arc(footX + 2, footY, 3.5, 0, Math.PI * 2); ctx.fill();
          }
          ctx.restore();
        };

        // Draw Back Legs (Shadowed)
        drawLeg(-14, 5, legSwing2, legLift2, true); // Back Left
        drawLeg(12, 5, legSwing1, legLift1, true);  // Back Right

        // 4. BODY (Longer Bean Shape)
        ctx.fillStyle = this.colorMain;
        ctx.beginPath();
        // Smooth bezier peanut body
        ctx.moveTo(-22, -8);
        ctx.bezierCurveTo(-22, -24, 16, -26, 22, -10); // Back and neck
        ctx.bezierCurveTo(28, 6, 19, 18, 0, 18);       // Chest and front belly
        ctx.bezierCurveTo(-15, 18, -26, 10, -22, -8);  // Bottom belly to butt
        ctx.fill();

        // Underbelly Highlight
        ctx.fillStyle = this.colorBelly;
        ctx.beginPath();
        ctx.ellipse(2, 6, 15, 9, -Math.PI * 0.05, 0, Math.PI * 2);
        ctx.fill();

        // Draw Front Legs (Lit)
        drawLeg(-14, 5, legSwing1, legLift1, false); // Front Left
        drawLeg(12, 5, legSwing2, legLift2, false);  // Front Right

        // 5. HEAD & NECK
        const headDelay = isMoving ? Math.sin(cycle - 0.5) * 2 : Math.sin(bCycle - 0.5) * 1;
        ctx.translate(18, -22 + headDelay);
        const headRotate = isMoving ? Math.cos(cycle) * 0.05 : 0;
        ctx.rotate(headRotate);

        // 3D Ears with Inner Depth
        const earWiggle = isMoving ? Math.cos(cycle * 2) * 0.05 : 0;
        const drawEar = (side: string) => {
          ctx.save();
          const ex = side === 'left' ? -8 : 6;
          ctx.translate(ex, -8);
          ctx.rotate(side === 'left' ? -0.2 - earWiggle : 0.2 + earWiggle);

          // Outer earF
          ctx.fillStyle = this.colorMain;
          ctx.beginPath(); ctx.moveTo(-6, 2); ctx.quadraticCurveTo(0, -16, 6, 2); ctx.fill();
          // Inner shadowed ear hole
          ctx.fillStyle = this.colorShadow;
          ctx.beginPath(); ctx.moveTo(-3, 1); ctx.quadraticCurveTo(0, -11, 4, 1); ctx.fill();
          // Micro fluff highlight
          ctx.fillStyle = "#FFD1D9";
          ctx.beginPath(); ctx.moveTo(-1, 1); ctx.quadraticCurveTo(0, -7, 2, 1); ctx.fill();
          ctx.restore();
        };
        drawEar('left');
        drawEar('right');

        // Head Base (Squashed circle for chubby cheeks)
        ctx.fillStyle = this.colorMain;
        ctx.beginPath();
        ctx.ellipse(0, 0, 16, 13.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cheek Tuft Fluffs
        ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-19, 2); ctx.lineTo(-13, 4); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-13, 4); ctx.lineTo(-17, 6); ctx.lineTo(-11, 8); ctx.fill();

        // Distinct Snout/Muzzle
        ctx.fillStyle = this.colorBelly;
        ctx.beginPath(); ctx.ellipse(8, 3, 7, 5.5, 0, 0, Math.PI * 2); ctx.fill();

        // Cute Nose
        ctx.fillStyle = "#FF758F";
        ctx.beginPath(); ctx.ellipse(12, 1, 3, 2, 0, 0, Math.PI * 2); ctx.fill();

        // Expressive Eyes (Blink logic + stylized vector eyes)
        ctx.fillStyle = "#2D3142";
        const isBlinking = (Date.now() % 3500) < 150;
        if (isBlinking) {
          ctx.lineWidth = 2.5; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(3, -2); ctx.quadraticCurveTo(5, 0, 7, -2); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(11, -2); ctx.quadraticCurveTo(13, 0, 15, -2); ctx.stroke();
        } else {
          ctx.beginPath(); ctx.ellipse(5, -2, 2.5, 4, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(13, -2, 2.5, 4, 0, 0, Math.PI * 2); ctx.fill();

          // Double sparkling catchlights for that premium Deekay/Anime feel
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath(); ctx.arc(4.5, -4, 1.2, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(12.5, -4, 1.2, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(5.5, -1, 0.6, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(13.5, -1, 0.6, 0, Math.PI * 2); ctx.fill();
        }

        // Soft Blush
        if (this.hasBlush) {
          ctx.fillStyle = "rgba(255, 117, 143, 0.4)";
          ctx.beginPath(); ctx.ellipse(2, 6, 3, 2, -Math.PI * 0.1, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(12, 6, 4, 2.5, Math.PI * 0.1, 0, Math.PI * 2); ctx.fill();
        }

        // 6. ROSE IN MOUTH (Romantic Accessory)
        const stemSwing = isMoving ? Math.sin(cycle * 2) * 2 : Math.sin(bCycle) * 1;

        ctx.save();
        ctx.translate(14, 4); // Anchor to the mouth

        // Draw Rose Stem
        ctx.strokeStyle = "#4CAF50";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(8, 2 + stemSwing, 22, 4 + stemSwing * 2);
        ctx.stroke();

        // Small Leaf
        ctx.fillStyle = "#388E3C";
        ctx.beginPath(); ctx.ellipse(8, 4 + stemSwing, 4, 2, Math.PI / 6, 0, Math.PI * 2); ctx.fill();

        // Rose Flower
        ctx.translate(22, 4 + stemSwing * 2);
        const roseRot = isMoving ? Math.sin(cycle * 2) * 0.1 : 0;
        ctx.rotate(roseRot);

        ctx.fillStyle = "#E63946"; // Vibrant Red
        ctx.beginPath();
        ctx.arc(0, -3, 4, 0, Math.PI * 2);
        ctx.arc(-3, 1, 4, 0, Math.PI * 2);
        ctx.arc(3, 1, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#A82030"; // Inner depth
        ctx.beginPath(); ctx.arc(0, -1, 3, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#FFA3B1"; // Highlight
        ctx.beginPath(); ctx.ellipse(0, -2, 1.5, 0.8, 0, 0, Math.PI * 2); ctx.fill();

        ctx.restore(); // Return from rose

        ctx.restore(); // Return to world 

        // Dynamic Floating Emotes (Hearts/Sparkles) when walking nearby
        if (isMoving && Math.random() < 0.04) {
          ctx.save();
          ctx.translate(screenX + Utils.rand(-15, 15), groundY - 70 - Math.random() * 20);
          const s = 1 + Math.sin(Date.now() / 150) * 0.2;
          ctx.scale(s, s);
          ctx.fillStyle = "rgba(255, 117, 143, 0.8)";
          ctx.font = "14px Arial";
          ctx.fillText(this.type === 'male' ? "✨" : "💕", 0, 0);
          ctx.restore();
        }
      }
    }

    class Environment {
      engine: Engine;
      hills: any[] = [];
      clouds: any[] = [];
      stars: any[] = [];
      constructor(engine: Engine) {
        this.engine = engine;
        this.generateTopology();
      }
      generateTopology() {
        let x = -500;
        while (x < WORLD_LENGTH + 2000) {
          this.hills.push({
            x: x, w: Utils.rand(1000, 2500), h: Utils.rand(200, 600),
            layer: Math.floor(Utils.rand(1, 4)), peakOffset: Utils.rand(0.35, 0.65)
          });
          x += Utils.rand(300, 600);
        }
        // PERFORMANCE BOOST: Sort once during generation, not in draw loop
        this.hills.sort((a, b) => b.layer - a.layer);

        for (let i = 0; i < 35; i++) {
          this.clouds.push({
            x: Utils.rand(-200, WORLD_LENGTH + 1000), y: Utils.rand(20, 280),
            s: Utils.rand(0.4, 1.3), v: Utils.rand(0.05, 0.25),
            type: Math.floor(Utils.rand(1, 4)), layer: Math.random() > 0.6 ? 1 : 2
          });
        }
        this.clouds.sort((a, b) => b.layer - a.layer);

        for (let i = 0; i < 200; i++) {
          this.stars.push({ x: Math.random(), y: Math.random() * 0.7, size: Math.random() * 1.2, twinkle: Math.random() * Math.PI * 2 });
        }
      }
      update() {
        this.clouds.forEach(c => c.x -= c.v);
        this.stars.forEach(s => s.twinkle += 0.02);
      }

      drawCloudShape(ctx: CanvasRenderingContext2D, type: number) {
        ctx.beginPath();
        if (type === 1) {
          ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.arc(25, -20, 28, 0, Math.PI * 2);
          ctx.arc(55, -5, 25, 0, Math.PI * 2); ctx.arc(80, 10, 18, 0, Math.PI * 2);
          ctx.arc(-20, 10, 18, 0, Math.PI * 2);
          if ((ctx as any).roundRect) (ctx as any).roundRect(-20, -5, 100, 35, 20);
          else ctx.fillRect(-20, -5, 100, 35);
        } else if (type === 2) {
          ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.arc(35, -8, 22, 0, Math.PI * 2);
          ctx.arc(70, 0, 18, 0, Math.PI * 2); ctx.arc(105, 8, 12, 0, Math.PI * 2);
          if ((ctx as any).roundRect) (ctx as any).roundRect(-5, -5, 110, 25, 15);
          else ctx.fillRect(-5, -5, 110, 25);
        } else {
          ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.arc(30, -15, 28, 0, Math.PI * 2);
          ctx.arc(60, 2, 20, 0, Math.PI * 2);
          if ((ctx as any).roundRect) (ctx as any).roundRect(-10, -5, 70, 28, 20);
          else ctx.fillRect(-10, -5, 70, 28);
        }
        ctx.fill();
      }

      draw(ctx: CanvasRenderingContext2D, cameraX: number, progress: number, palette: any) {
        const { width, height } = ctx.canvas;
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.8);
        skyGrad.addColorStop(0, palette.skyT);
        skyGrad.addColorStop(1, palette.skyB);
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        if (progress > 0.2) {
          ctx.save();
          const starFade = Utils.clamp((progress - 0.2) * 2.5, 0, 1);
          ctx.fillStyle = "#FFF";
          this.stars.forEach(s => {
            const alpha = 0.2 + Math.sin(s.twinkle) * 0.8;
            ctx.globalAlpha = alpha * starFade;
            ctx.beginPath(); ctx.arc(s.x * width, s.y * height, s.size, 0, Math.PI * 2); ctx.fill();
          });
          ctx.restore();
        }

        const orbitRadius = width * 0.45;
        const centerX = width * 0.5;
        const centerY = height * 0.9;
        const angle = Math.PI - (progress * Math.PI);
        const objX = centerX + Math.cos(angle) * orbitRadius;
        const objY = centerY - Math.sin(angle) * orbitRadius;

        ctx.save();
        const isNight = progress > 0.6;
        const bodyRadius = isNight ? 45 : 65;
        ctx.fillStyle = palette.sun;
        ctx.beginPath(); ctx.arc(objX, objY, bodyRadius, 0, Math.PI * 2); ctx.fill();
        const glowGrad = ctx.createRadialGradient(objX, objY, bodyRadius, objX, objY, bodyRadius * 3);
        glowGrad.addColorStop(0, isNight ? "rgba(255, 234, 238, 0.4)" : "rgba(255, 255, 255, 0.4)");
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath(); ctx.arc(objX, objY, bodyRadius * 3, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        this.clouds.forEach(c => {
          const parallaxMultiplier = c.layer === 1 ? 0.08 : 0.03;
          const screenX = c.x - (cameraX * parallaxMultiplier);
          if (screenX < -250 || screenX > width + 250) return;
          ctx.save();
          ctx.translate(screenX, c.y);
          const scaleMod = c.layer === 1 ? c.s : c.s * 0.6;
          ctx.scale(scaleMod, scaleMod);
          const baseAlpha = isNight ? 0.15 : 0.8;
          const cloudAlpha = c.layer === 1 ? baseAlpha : baseAlpha * 0.5;
          ctx.fillStyle = isNight ? "rgba(27, 43, 30, 0.2)" : "rgba(27, 43, 30, 0.08)";
          ctx.save(); ctx.translate(0, 8); this.drawCloudShape(ctx, c.type); ctx.restore();
          ctx.fillStyle = `rgba(255, 255, 255, ${cloudAlpha})`;
          this.drawCloudShape(ctx, c.type);
          ctx.restore();
        });

        const groundY = height * (this.engine.isPortrait ? 0.8 : 0.85);

        ctx.save();
        this.hills.forEach(m => {
          let parallax = m.layer === 3 ? 0.05 : (m.layer === 2 ? 0.15 : 0.3);
          const screenX = m.x - (cameraX * parallax);
          if (screenX < -m.w || screenX > width + m.w) return;
          const depthFactor = m.layer / 3;
          const baseColor = Utils.lerpColor(palette.mount, palette.skyB, depthFactor * 0.5);
          const shadowMix = isNight ? 0.3 : 0.12;
          const lightMix = isNight ? 0.05 : 0.15;
          const lightColor = Utils.lerpColor(baseColor, "#FFFFFF", lightMix);
          const shadowColor = Utils.lerpColor(baseColor, "#1A2E1D", shadowMix);
          const peakX = screenX + m.w * m.peakOffset;
          const peakY = groundY - m.h;
          ctx.fillStyle = lightColor;
          ctx.beginPath(); ctx.moveTo(screenX, groundY);
          ctx.quadraticCurveTo(screenX + m.w * (m.peakOffset * 0.3), groundY - m.h * 0.15, peakX, peakY);
          ctx.lineTo(peakX, groundY); ctx.fill();
          ctx.fillStyle = shadowColor;
          ctx.beginPath(); ctx.moveTo(peakX, peakY);
          ctx.quadraticCurveTo(screenX + m.w * (m.peakOffset + (1 - m.peakOffset) * 0.7), groundY - m.h * 0.15, screenX + m.w, groundY);
          ctx.lineTo(peakX, groundY); ctx.fill();
          ctx.strokeStyle = Utils.lerpColor(lightColor, "#FFFFFF", 0.4);
          ctx.lineWidth = m.layer === 1 ? 2 : 1;
          ctx.beginPath(); ctx.moveTo(screenX, groundY);
          ctx.quadraticCurveTo(screenX + m.w * (m.peakOffset * 0.3), groundY - m.h * 0.15, peakX, peakY);
          ctx.stroke();
        });
        ctx.restore();

        if (palette.fog) {
          const fogGrad = ctx.createLinearGradient(0, groundY - 120, 0, groundY);
          fogGrad.addColorStop(0, "rgba(255,255,255,0)"); fogGrad.addColorStop(1, palette.fog);
          ctx.fillStyle = fogGrad; ctx.fillRect(0, groundY - 120, width, 120);
        }

        ctx.fillStyle = Utils.lerpColor(palette.groundT, palette.skyB, 0.12);
        ctx.beginPath(); ctx.moveTo(0, height);
        for (let i = 0; i <= width + 80; i += 40) {
          const wx = i + cameraX * 0.8;
          const wy = (groundY - 18) + Math.sin(wx * 0.002) * 20 + Math.cos(wx * 0.005) * 10;
          ctx.lineTo(i, wy);
        }
        ctx.lineTo(width + 80, height); ctx.fill();

        ctx.fillStyle = Utils.lerpColor(palette.groundT, "#1A2E1D", 0.04);
        ctx.beginPath(); ctx.moveTo(0, height);
        for (let i = 0; i <= width + 80; i += 40) {
          const wx = i + cameraX * 0.9;
          const wy = (groundY - 6) + Math.sin(wx * 0.003) * 15 + Math.cos(wx * 0.007) * 8;
          ctx.lineTo(i, wy);
        }
        ctx.lineTo(width + 80, height); ctx.fill();

        const groundGrad = ctx.createLinearGradient(0, groundY, 0, height);
        groundGrad.addColorStop(0, palette.groundT); groundGrad.addColorStop(1, palette.groundB);
        ctx.fillStyle = groundGrad; ctx.fillRect(0, groundY, width, height - groundY);

        ctx.fillStyle = isNight ? "rgba(255,255,255,0.04)" : "rgba(255, 255, 255, 0.15)";
        ctx.beginPath(); ctx.moveTo(0, groundY);
        for (let i = 0; i <= width + 80; i += 40) {
          const wx = i + cameraX; const wy = groundY + Math.sin(wx * 0.004) * 8; ctx.lineTo(i, wy);
        }
        for (let i = width + 80; i >= -40; i -= 40) {
          const wx = i + cameraX; const wy = groundY + 30 + Math.sin(wx * 0.004) * 20; ctx.lineTo(i, wy);
        }
        ctx.fill();

        ctx.fillStyle = Utils.lerpColor(palette.groundB, "#1A2E1D", 0.08);
        ctx.beginPath(); ctx.moveTo(0, height);
        for (let i = 0; i <= width + 80; i += 40) {
          const wx = i + cameraX * 1.2;
          const wy = groundY + 70 + Math.sin(wx * 0.002) * 30;
          ctx.lineTo(i, wy);
        }
        ctx.lineTo(width + 80, height); ctx.fill();
      }
    }

    class FloraManager {
      engine: Engine;
      trees: any[] = [];
      petals: any[] = [];
      grasses: any[] = [];
      flowers: any[] = [];
      stones: any[] = [];
      magicFlowers: any[] = []; // Bunga interaktif baru
      climaxParticles: any[] = []; // Partikel klimaks baru

      constructor(engine: Engine) {
        this.engine = engine;
        this.generateFlora();
      }
      
      triggerClimax(intensity: number) {
        // Tambahkan partikel hati dan sakura dalam jumlah besar
        if (Math.random() < intensity) {
          this.climaxParticles.push({
            x: this.engine.cameraX + Math.random() * this.engine.width * 1.2,
            y: -20,
            vx: Utils.rand(-3, 3),
            vy: Utils.rand(2, 5),
            size: Utils.rand(5, 12),
            rot: Math.random() * Math.PI * 2,
            rotV: Utils.rand(-0.1, 0.1),
            type: Math.random() > 0.3 ? 'sakura' : 'heart',
            color: Math.random() > 0.5 ? "#FFB7C5" : "#FF69B4" // Soft & Deep Pink
          });
        }
      }

      spawnMagicFlower(screenX: number, screenY: number) {
        // Konversi koordinat layar ke koordinat dunia
        const worldX = screenX + (this.engine.cameraX * 1.0); // Asumsi layer 1.0 (utama)
        this.magicFlowers.push({
          x: worldX,
          y: screenY,
          size: 0,
          targetSize: Utils.rand(15, 25),
          rotation: Math.random() * Math.PI,
          color: `hsl(${Utils.rand(330, 360)}, 80%, 70%)`,
          life: 1.0,
          bloomSpeed: 0.05
        });
      }

      generateFlora() {
        let x = -500;
        const LAYERS = [0.8, 0.9, 1.0, 1.2];
        // Generate dense forest layout
        while (x < WORLD_LENGTH + 1000) {
          const clusterSize = Math.floor(Utils.rand(1, 4));
          for (let i = 0; i < clusterSize; i++) {
            const z = LAYERS[Math.floor(Math.random() * LAYERS.length)];
            this.trees.push({
              x: x + Utils.rand(-100, 100),
              scale: Utils.rand(0.6, 1.2) * (z * 0.8),
              z: z,
              type: Math.random() > 0.4 ? 'sakura' : 'pine',
              swayOffset: Math.random() * Math.PI * 2
            });
          }
          x += Utils.rand(200, 500);
        }

        // Ground cover (Grass, Flowers, Stones) - Optimized for high FPS
        for (let i = 0; i < 400; i++) {
          this.grasses.push({
            x: Utils.rand(-500, WORLD_LENGTH + 1500),
            z: LAYERS[Math.floor(Math.random() * LAYERS.length)],
            h: Utils.rand(8, 16),
            sway: Math.random() * Math.PI * 2
          });
        }
        for (let i = 0; i < 60; i++) {
          this.flowers.push({
            x: Utils.rand(-500, WORLD_LENGTH + 1500),
            z: LAYERS[Math.floor(Math.random() * LAYERS.length)],
            type: Math.random() > 0.5 ? 'pink' : 'white',
            sway: Math.random() * Math.PI * 2
          });
        }
        for (let i = 0; i < 40; i++) {
          this.stones.push({
            x: Utils.rand(-500, WORLD_LENGTH + 1500),
            z: LAYERS[Math.floor(Math.random() * LAYERS.length)],
            s: Utils.rand(3, 8)
          });
        }

        // Pre-sort all by depth for Z-indexing
        this.trees.sort((a, b) => b.z - a.z);
        this.grasses.sort((a, b) => b.z - a.z);
        this.flowers.sort((a, b) => b.z - a.z);
        this.stones.sort((a, b) => b.z - a.z);
      }
      update() {
        // Falling petals logic (Standard)
        if (Math.random() < 0.25) {
          this.petals.push({
            x: this.engine.cameraX + Math.random() * this.engine.width * 1.5,
            y: -50, vx: Utils.rand(-2.5, -0.5), vy: Utils.rand(1, 2.5),
            size: Utils.rand(3, 6), osc: Math.random() * 10, rot: Math.random() * Math.PI
          });
        }
        for (let i = this.petals.length - 1; i >= 0; i--) {
          let p = this.petals[i];
          p.x += p.vx; p.y += p.vy; p.osc += 0.03; p.rot += 0.05; p.x += Math.sin(p.osc) * 1.2;
          if (p.y > this.engine.height || p.x < this.engine.cameraX - 100) this.petals.splice(i, 1);
        }

        // Magic flowers logic
        for (let i = this.magicFlowers.length - 1; i >= 0; i--) {
          let f = this.magicFlowers[i];
          if (f.size < f.targetSize) f.size += f.bloomSpeed * f.targetSize;
          f.life -= 0.005;
          if (f.life <= 0) this.magicFlowers.splice(i, 1);
        }

        // Climax particles logic (Blizzard)
        for (let i = this.climaxParticles.length - 1; i >= 0; i--) {
          let p = this.climaxParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotV;
          if (p.y > this.engine.height + 20) this.climaxParticles.splice(i, 1);
        }
      }
      drawLayer(ctx: CanvasRenderingContext2D, cameraX: number, palette: any, minZ: number, maxZ: number) {
        const groundY = this.engine.height * (this.engine.isPortrait ? 0.8 : 0.85);
        const wind = Date.now() * 0.002;
        const isNight = palette.skyT === "#0A1128";

        // Draw Climax Particles (Top Most Layer)
        if (maxZ >= 3.0) {
          this.climaxParticles.forEach(p => {
            ctx.save();
            ctx.translate(p.x - cameraX * 1.1, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            
            if (p.type === 'heart') {
              const s = p.size * 0.6;
              ctx.beginPath();
              ctx.moveTo(0, s);
              ctx.bezierCurveTo(s, -s, s*2, s, 0, s*2.5);
              ctx.bezierCurveTo(-s*2, s, -s, -s, 0, s);
              ctx.fill();
            } else {
              // Sakura petal shape
              ctx.beginPath();
              ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          });
        }

        // Draw magic flowers (hanya di layer utama)
        if (minZ <= 1.0 && maxZ >= 1.0) {
          this.magicFlowers.forEach(f => {
            const screenX = f.x - cameraX;
            if (screenX < -50 || screenX > this.engine.width + 50) return;
            
            ctx.save();
            ctx.translate(screenX, f.y);
            ctx.rotate(f.rotation);
            ctx.globalAlpha = f.life;
            
            // Draw stylized magic flower petals
            ctx.fillStyle = f.color;
            for (let i = 0; i < 5; i++) {
              ctx.rotate((Math.PI * 2) / 5);
              ctx.beginPath();
              ctx.ellipse(f.size * 0.6, 0, f.size, f.size * 0.4, 0, 0, Math.PI * 2);
              ctx.fill();
            }
            // Center
            ctx.fillStyle = "#FFD1D9";
            ctx.beginPath();
            ctx.arc(0, 0, f.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
          });
        }

        const drawElement = (arr: any[], drawFn: any) => {
          arr.forEach(el => {
            if (el.z < minZ || el.z > maxZ) return;
            const screenX = el.x - (cameraX * el.z);
            if (screenX < -150 || screenX > this.engine.width + 150) return;

            const wx = el.x;
            let yPos = groundY;

            // Map each object to its EXACT ground surface based on its Z-layer
            if (el.z === 0.8) {
              yPos = (groundY - 18) + Math.sin(wx * 0.002) * 20 + Math.cos(wx * 0.005) * 10;
            } else if (el.z === 0.9) {
              yPos = (groundY - 6) + Math.sin(wx * 0.003) * 15 + Math.cos(wx * 0.007) * 8;
            } else if (el.z === 1.0) {
              // Snaps to the path or flat ground surface
              yPos = groundY;
            } else if (el.z === 1.2) {
              yPos = groundY + 70 + Math.sin(wx * 0.002) * 30;
            }

            ctx.save();
            ctx.translate(screenX, yPos);
            drawFn(el, screenX);
            ctx.restore();
          });
        };

        // 1. STONES
        ctx.fillStyle = isNight ? "#31232c" : "#a88e99";
        drawElement(this.stones, (el: any) => {
          ctx.beginPath();
          ctx.moveTo(-el.s * 2, 0);
          ctx.quadraticCurveTo(-el.s, -el.s, 0, -el.s * 1.2);
          ctx.quadraticCurveTo(el.s * 1.5, -el.s * 0.8, el.s * 2, 0);
          ctx.fill();

          // Highlight spec
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.beginPath(); ctx.ellipse(-el.s * 0.5, -el.s * 0.5, el.s * 0.5, el.s * 0.3, -Math.PI * 0.1, 0, Math.PI * 2); ctx.fill();
        });

        // 2. GRASS
        ctx.strokeStyle = Utils.lerpColor(palette.groundT, "#4CAF50", 0.15);
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        drawElement(this.grasses, (el: any) => {
          const sway = Math.sin(wind + el.sway) * (el.h * 0.4);
          ctx.beginPath();
          ctx.moveTo(0, 0); ctx.quadraticCurveTo(sway * 0.5, -el.h * 0.5, sway, -el.h);
          ctx.moveTo(-2, 0); ctx.quadraticCurveTo((sway - 2) * 0.5, -el.h * 0.3, sway - 4, -el.h * 0.6);
          ctx.stroke();
        });

        // 3. FLOWERS
        drawElement(this.flowers, (el: any) => {
          const sway = Math.sin(wind + el.sway) * 4;
          ctx.strokeStyle = "#7CB342";
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(sway * 0.5, -8, sway, -14); ctx.stroke();

          ctx.translate(sway, -14);
          ctx.fillStyle = el.type === 'pink' ? (isNight ? "#8B5A2B" : "#FF9800") : (isNight ? "#9E939B" : "#FFFFFF");
          for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 2);
            ctx.beginPath(); ctx.ellipse(2, 0, 3, 2, 0, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = isNight ? "#8B7F39" : "#FFCA28"; // Yellow center
          ctx.beginPath(); ctx.arc(0, 0, 1.5, 0, Math.PI * 2); ctx.fill();
        });

        // 4. TREES
        drawElement(this.trees, (t: any) => {
          const sway = Math.sin(wind * 0.5 + t.swayOffset) * 0.03;
          ctx.rotate(sway);
          ctx.scale(t.scale, t.scale);

          if (t.z < 0.9) ctx.globalAlpha = 0.6 + (t.z - 0.7) * 2.0;

          if (t.type === 'pine') {
            ctx.fillStyle = isNight ? "#0a1215" : "#1A3A36";
            ctx.fillRect(-4, -40, 8, 40);
            ctx.beginPath(); ctx.moveTo(0, -160); ctx.lineTo(-30, -60); ctx.lineTo(30, -60); ctx.fill();
            ctx.beginPath(); ctx.moveTo(0, -110); ctx.lineTo(-40, -20); ctx.lineTo(40, -20); ctx.fill();

            ctx.fillStyle = "rgba(255,255,255,0.06)";
            ctx.beginPath(); ctx.moveTo(0, -160); ctx.lineTo(0, -60); ctx.lineTo(30, -60); ctx.fill();
          } else {
            const trunkColor = isNight ? "#31232c" : "#6D524C";
            ctx.fillStyle = trunkColor;
            ctx.beginPath(); ctx.moveTo(-6, 0); ctx.quadraticCurveTo(-4, -60, -1, -100); ctx.lineTo(1, -100); ctx.quadraticCurveTo(4, -60, 6, 0); ctx.fill();

            ctx.lineWidth = 2.5; ctx.strokeStyle = trunkColor;
            ctx.beginPath(); ctx.moveTo(0, -70); ctx.quadraticCurveTo(-20, -80, -25, -90); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, -50); ctx.quadraticCurveTo(20, -70, 25, -80); ctx.stroke();

            const baseGreen = isNight ? "#1B3A1E" : "#4CAF50";
            const highlightGreen = isNight ? "#2E5933" : "#81C784";
            const shadowGreen = isNight ? "#0D2110" : "#388E3C";

            const drawPuff = (cx: number, cy: number, r: number, color: string) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); };

            // Shadows
            drawPuff(-20, -75, 30, shadowGreen);
            drawPuff(20, -75, 30, shadowGreen);
            drawPuff(0, -60, 25, shadowGreen);

            // Base
            drawPuff(0, -100, 48, baseGreen);
            drawPuff(-30, -90, 35, baseGreen);
            drawPuff(30, -90, 35, baseGreen);

            // Highlights
            drawPuff(-10, -105, 25, highlightGreen);
            drawPuff(15, -95, 20, highlightGreen);
          }

          // Blend root into ground shadow
          ctx.fillStyle = "rgba(27, 43, 30, 0.15)";
          ctx.beginPath(); ctx.ellipse(0, 0, 15, 4, 0, 0, Math.PI * 2); ctx.fill();
        });

        // Draw falling petals only on foreground to avoid messy background overlapping
        if (maxZ > 1.0) {
          ctx.fillStyle = isNight ? "rgba(168, 32, 48, 0.6)" : "rgba(230, 57, 70, 0.8)";
          this.petals.forEach(p => {
            ctx.save();
            ctx.translate(p.x - cameraX * 1.1, p.y);
            ctx.rotate(p.rot);
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.quadraticCurveTo(p.size, -p.size, p.size, 0);
            ctx.quadraticCurveTo(p.size, p.size, 0, p.size);
            ctx.quadraticCurveTo(-p.size, p.size, -p.size, 0);
            ctx.quadraticCurveTo(-p.size, -p.size, 0, -p.size);
            ctx.fill();
            ctx.restore();
          });
        }
      }
    }

    class StoryManager {
      engine: Engine;
      lyricEl: HTMLElement | null;
      photos: any[] = [];
      constructor(engine: Engine) {
        this.engine = engine;
        this.lyricEl = document.getElementById('current-lyric');
        this.setupPhotos();
      }
      setupPhotos() {
        const step = (WORLD_LENGTH - 6000) / PHOTO_ASSETS.length;
        PHOTO_ASSETS.forEach((url, i) => {
          const img = new Image(); 
          img.src = url;
          // Fallback logic if local image fails
          img.onerror = () => {
            img.src = FALLBACK_PHOTOS[i % FALLBACK_PHOTOS.length];
          };
          this.photos.push({ x: 4000 + (i * step), y: this.engine.height * 0.35, rot: Utils.rand(-10, 10), img: img, swing: Math.random() * Math.PI });
        });
      }
      update(playerX: number) {
        const audio = document.getElementById('bgm') as HTMLAudioElement;
        const currentTime = audio ? audio.currentTime : 0;
        let currentText = "";
        
        // Better sync logic: show the latest lyric that has passed its start time
        for (let i = 0; i < LYRICS_DATA.length; i++) {
          if (currentTime >= LYRICS_DATA[i].time) {
            currentText = LYRICS_DATA[i].text;
          } else {
            break;
          }
        }

        if (this.lyricEl && this.lyricEl.innerText !== currentText) {
          this.lyricEl.innerText = currentText;
          if (currentText && currentText !== "...") this.lyricEl.classList.add('visible');
          else this.lyricEl.classList.remove('visible');
        }
        this.photos.forEach(p => p.swing += 0.02);
      }
      drawPhotos(ctx: CanvasRenderingContext2D, cameraX: number) {
        this.photos.forEach(p => {
          const screenX = p.x - (cameraX * 0.7);
          const mw = this.engine.isPortrait ? this.engine.width * 0.8 : 350;
          const fw = Math.min(280, mw);
          const fh = fw * 1.25;
          const sy = (this.engine.height * 0.38) + Math.sin(p.swing) * 15;
          if (screenX < -fw || screenX > this.engine.width + fw) return;
          ctx.save();
          ctx.translate(screenX, sy);
          ctx.rotate(p.rot * Math.PI / 180);

          // Fast manual drop-shadow (Replaces expensive shadowBlur)
          ctx.fillStyle = "rgba(27, 43, 30, 0.25)";
          ctx.fillRect(-fw / 2 + 10, -fh / 2 + 15, fw, fh);

          ctx.fillStyle = "#fffcfc";
          ctx.fillRect(-fw / 2, -fh/2, fw, fh);

          // Decorative tape or pin concept (cuter washi tape)
          ctx.fillStyle = "rgba(129, 199, 132, 0.6)";
          ctx.fillRect(-25, -fh / 2 - 10, 50, 15);

          if (p.img.complete) {
            const iw = fw * 0.9, ih = fh - (fw * 0.3);
            ctx.drawImage(p.img, -iw / 2, -fh / 2 + 15, iw, ih);

            // Fast sepia/warm overlay (Replaces expensive ctx.filter)
            ctx.fillStyle = "rgba(255, 180, 100, 0.15)";
            ctx.fillRect(-iw / 2, -fh / 2 + 15, iw, ih);
          }

          // Romantic caption heartbeat
          const hbScale = 1 + Math.sin(Date.now() / 300) * 0.1;
          ctx.fillStyle = "#4CAF50";
          ctx.font = "24px Arial";
          ctx.textAlign = "center";
          ctx.save();
          ctx.translate(0, fh / 2 - 20);
          ctx.scale(hbScale, hbScale);
          ctx.fillText("💕", 0, 0);
          ctx.restore();

          ctx.restore();
        });
      }
    }

    class Engine {
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      isRunning: boolean = false;
      isEnded: boolean = false;
      isWalking: boolean = false;
      isCutscene: boolean = false;
      cameraX: number = 0;
      progress: number = 0;
      partnerName: string = "itaa";
      width: number = 0;
      height: number = 0;
      isPortrait: boolean = false;
      player: Cat;
      npc: Cat;
      env: Environment;
      flora: FloraManager;
      story: StoryManager;
      endTimer: any = null;
      
      // PRECISION CLOCK STATE
      lastAudioTime: number = 0;
      lastSyncTime: number = 0;
      preciseTime: number = 0;

      constructor() {
        this.canvas = document.getElementById('worldCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.player = new Cat('male');
        this.npc = new Cat('female');
        this.env = new Environment(this);
        this.flora = new FloraManager(this);
        this.story = new StoryManager(this);
        this.init();
      }
      init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.bindEvents();
      }
      resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.isPortrait = this.height > this.width;
      }
      bindEvents() {
        document.getElementById('btn-start')?.addEventListener('click', () => {
          this.partnerName = "itaa";
          const splash = document.getElementById('splash-screen');
          if (splash) splash.style.opacity = '0';
          setTimeout(() => { if (splash) splash.style.display = 'none'; }, 2000);
          
          const audio = document.getElementById('bgm') as HTMLAudioElement;
          if (audio) {
            audio.volume = 0; // Start at zero for fade in
            audio.currentTime = 200.5; // Start at the LAST chorus
            audio.play().then(() => {
              this.lastAudioTime = audio.currentTime;
              this.lastSyncTime = performance.now();
              // Fade In Logic: Increase volume to 1.0 over 2 seconds
              const fadeIn = setInterval(() => {
                if (audio.volume < 0.95) {
                  audio.volume += 0.05;
                } else {
                  audio.volume = 1.0;
                  clearInterval(fadeIn);
                }
              }, 100);
              console.log("Audio playing with fade-in from the last chorus");
            }).catch((err) => {
              console.warn("Audio play failed, retrying on interaction...", err);
              const retryPlay = () => {
                audio.volume = 1.0;
                audio.currentTime = 200.5;
                audio.play();
                window.removeEventListener('click', retryPlay);
              };
              window.addEventListener('click', retryPlay);
            });
          }
          this.isRunning = true;
          this.loop();
        });

        // Trigger Bunga Saat Klik/Tap
        const handleInteraction = (e: any) => {
          if (!this.isRunning || this.isEnded) return;
          // MOBILE FIX: Use touches[0] if it's a touch event
          const touch = e.touches ? e.touches[0] : e;
          const x = touch.clientX;
          const y = touch.clientY;
          if (x !== undefined && y !== undefined) {
            this.flora.spawnMagicFlower(x, y);
          }
        };

        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction, { passive: false });

        const createParticle = (x: number, y: number) => {
          if (!this.isRunning || this.isEnded) return;
          const pt = document.createElement('div');
          pt.className = 'magic-particle';
          const size = Utils.rand(6, 12);
          pt.style.width = `${size}px`;
          pt.style.height = `${size}px`;
          pt.style.left = `${x - size / 2}px`;
          pt.style.top = `${y - size / 2}px`;
          pt.style.zIndex = "9999"; // Ensure it's on top
          document.getElementById('game-container')?.appendChild(pt);
          setTimeout(() => pt.remove(), 1000);
        };

        let lastParticleTime = 0;
        const handlePointerMove = (e: any) => {
          const now = Date.now();
          if (now - lastParticleTime > 50) {
            const touch = e.touches ? e.touches[0] : e;
            const x = touch.clientX;
            const y = touch.clientY;
            if (x !== undefined && y !== undefined) {
              createParticle(x, y);
              lastParticleTime = now;
            }
          }
        };

        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: false });

        // TAB FOCUS FIX: Re-sync animation when returning to the tab
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            const audio = document.getElementById('bgm') as HTMLAudioElement;
            if (audio && !audio.paused) {
              this.lastAudioTime = audio.currentTime;
              this.lastSyncTime = performance.now();
              console.log("Tab focused: Animation re-synced with audio clock.");
            }
          }
        });
      }
      getPalette() {
        const p = this.progress;
        let c1: any, c2: any, f: number;
        if (p < 0.33) { c1 = PALETTES.morning; c2 = PALETTES.afternoon; f = p / 0.33; }
        else if (p < 0.66) { c1 = PALETTES.afternoon; c2 = PALETTES.sunset; f = (p - 0.33) / 0.33; }
        else { c1 = PALETTES.sunset; c2 = PALETTES.night; f = (p - 0.66) / 0.34; }
        const pal: any = {};
        for (let key in c1) pal[key] = Utils.lerpColor(c1[key], c2[key], f);
        return pal;
      }
      update() {
        if (!this.isRunning || this.isEnded) return;

        const audio = document.getElementById('bgm') as HTMLAudioElement;
        if (audio && !audio.paused) {
          if (audio.currentTime !== this.lastAudioTime) {
            this.lastAudioTime = audio.currentTime;
            this.lastSyncTime = performance.now();
          }
          const dt = Math.max(0, (performance.now() - this.lastSyncTime) / 1000);
          this.preciseTime = this.lastAudioTime + dt;

          const startTime = 200.5;
          const totalDuration = audio.duration || 310;
          
          const oldX = this.player.x;
          this.progress = Utils.clamp((this.preciseTime - startTime) / (totalDuration - startTime - 3.5), 0, 1);
          
          // STOP DISTANCE: 45px (Nempel)
          const targetX = this.progress * WORLD_LENGTH;
          this.player.x = Math.min(targetX, WORLD_LENGTH - 45);
          
          const deltaX = Math.abs(this.player.x - oldX);
          
          if (this.progress > 0.6) {
            const intensity = Utils.clamp((this.progress - 0.6) / 0.4, 0.1, 0.8);
            this.flora.triggerClimax(intensity);
          }

          if (this.progress >= 0.98 && !this.isCutscene) {
            this.isCutscene = true;
          }

          if (this.isCutscene) {
            this.player.update(false); 
            this.canvas.style.filter = "brightness(0.3) saturate(1.2)";
            if (!this.endTimer) {
              const goodbyeText = document.getElementById('goodbye-text');
              if (goodbyeText) {
                goodbyeText.style.opacity = '1';
                goodbyeText.style.transform = "translate(-50%, -60%) scale(1.1)";
              }
              this.endTimer = setTimeout(() => {
                if (goodbyeText) goodbyeText.style.opacity = '0';
                setTimeout(() => this.showEndScreen(), 2000);
              }, 4000);
            }
          } else {
            // NORMAL WALK: Use a fixed speed scale when moving to avoid 'slowmo' feel
            // Only walk if moving, use standard speed scale 1.2
            this.player.update(deltaX > 0.01, 1.2); 
          }
        }
        
        const targetCamX = Math.max(0, this.player.x - this.width * 0.3);
        this.cameraX = Utils.lerp(this.cameraX, targetCamX, 0.12);
        this.env.update();
        this.flora.update();
        this.story.update(this.preciseTime); 
        this.npc.update(false);
        const fill = document.getElementById('progress-fill');
        if (fill) fill.style.width = `${this.progress * 100}%`;
      }
      draw() {
        const palette = this.getPalette();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.env.draw(this.ctx, this.cameraX, this.progress, palette);
        this.flora.drawLayer(this.ctx, this.cameraX, palette, 0.0, 1.0);
        this.story.drawPhotos(this.ctx, this.cameraX);
        const gy = this.height * (this.isPortrait ? 0.8 : 0.85);
        this.npc.draw(this.ctx, this.cameraX, gy, this.isPortrait);
        this.player.draw(this.ctx, this.cameraX, gy, this.isPortrait);
        this.flora.drawLayer(this.ctx, this.cameraX, palette, 1.0001, 3.0);
      }
      showEndScreen() {
        this.isEnded = true;
        this.canvas.style.opacity = '0';
        
        // Stop/Fade out music when parallax ends
        const audio = document.getElementById('bgm') as HTMLAudioElement;
        if (audio) {
          const fadeOut = setInterval(() => {
            if (audio.volume > 0.05) {
              audio.volume -= 0.05;
            } else {
              audio.pause();
              clearInterval(fadeOut);
            }
          }, 100);
        }

        const endScreen = document.getElementById('end-screen');
        if (endScreen) endScreen.classList.add('visible');

        const envContainer = document.getElementById('envelope-container');
        const envElement = document.getElementById('envelope');
        const hint = document.querySelector('.envelope-hint') as HTMLElement;
        const celebration = document.getElementById('celebration-content');
        const gallery = document.getElementById('final-gallery');
        const cakeContainer = document.getElementById('cake-container');
        const wishTerminal = document.getElementById('wish-terminal');
        const wishBtn = document.getElementById('wish-btn');
        const wishInput = document.getElementById('wish-input') as HTMLInputElement;
        const cakeHint = document.getElementById('cake-hint');

        let envelopeOpened = false;

        envContainer?.addEventListener('click', () => {
          if (envelopeOpened) return;
          envelopeOpened = true;
          envElement?.classList.add('open');
          if (hint) hint.style.opacity = '0';

          setTimeout(() => {
            if (envContainer) {
              envContainer.style.opacity = '0';
              envContainer.style.transform = 'scale(0.9)';
            }
            setTimeout(() => {
              if (envContainer) envContainer.style.display = 'none';
              if (cakeContainer) {
                cakeContainer.style.display = 'flex';
                void cakeContainer.offsetWidth;
                cakeContainer.style.opacity = '1';
                
                // Show Wish Terminal after cake appears
                setTimeout(() => {
                  if (wishTerminal) wishTerminal.style.display = 'flex';
                  if (cakeHint) cakeHint.style.display = 'none';
                }, 1000);
              }
            }, 1000);
          }, 4500);
        });

        let wishSent = false;
        wishBtn?.addEventListener('click', (e) => {
          e.stopPropagation();
          if (wishSent) return;
          wishSent = true;
          
          if (wishTerminal) {
            wishTerminal.style.opacity = '0';
            wishTerminal.style.transform = 'translateY(-20px)';
            setTimeout(() => {
              wishTerminal.style.display = 'none';
              if (cakeHint) {
                cakeHint.style.display = 'block';
                cakeHint.innerText = "Sekarang, tiup lilinnya... 🎂";
              }
            }, 500);
          }
        });

        const cakeFlame = document.getElementById('cake-flame');
        const interactiveCake = document.getElementById('interactive-cake');

        let cakeBlown = false;

        cakeContainer?.addEventListener('click', () => {
          if (!wishSent || cakeBlown) return;
          cakeBlown = true;
          cakeFlame?.classList.add('out');
          
          // Symbolic: Wish text becomes the hint for a moment
          if (cakeHint) {
            const finalWish = wishInput.value.trim() || "Bahagia selamanya";
            cakeHint.innerText = `Permohonanmu: "${finalWish}" sedang terbang ke langit... ✨`;
            cakeHint.style.color = "var(--primary-color)";
          }

          setTimeout(() => {
            if (cakeContainer) cakeContainer.style.opacity = '0';
            if (interactiveCake) interactiveCake.style.transform = 'scale(0.8)';
            setTimeout(() => {
              if (cakeContainer) cakeContainer.style.display = 'none';
              if (celebration) {
                celebration.style.display = 'flex';
                void celebration.offsetWidth;
                celebration.style.opacity = '1';
              }
              PHOTO_ASSETS.forEach((url, i) => {
                const div = document.createElement('div');
                div.className = 'polaroid-final';
                div.innerHTML = `<img src="${url}"><p style="font-family:var(--font-sans); font-weight:700; font-size: 1.5rem; text-align:center; margin-top:15px; color:#E63946;">❤️</p>`;
                div.style.transform = `translateY(50px)`;
                div.style.opacity = "0";
                gallery?.appendChild(div);
                setTimeout(() => {
                  div.style.opacity = "1";
                  div.style.transform = `translateY(0)`;
                }, 600 + (i * 150));
              });

              // IMPLEMENT RESTART LOGIC
              document.getElementById('restart-btn')?.addEventListener('click', () => {
                window.location.reload();
              });
            }, 1000);
          }, 4000);
        });
      }
      loop() {
        this.update();
        this.draw();
        if (this.isRunning) requestAnimationFrame(() => this.loop());
      }
    }

    new Engine();

  }, [mounted]);

  if (!mounted) {
    return <div style={{ background: '#11140b', height: '100vh', width: '100vw' }} />;
  }

  return (
    <div id="game-container">
      <audio id="bgm" preload="auto">
        <source src="/audio/selamat.mp3" type="audio/mpeg" />
      </audio>
      <canvas id="worldCanvas"></canvas>
      <div id="ui-layer">
        <div id="lyric-container">
          <div id="current-lyric" className="lyric-text"></div>
        </div>
        <div id="progress-wrapper">
          <div id="progress-fill"></div>
        </div>
      </div>
      <div id="goodbye-text">Selamat Tinggal...</div>
      <div id="splash-screen">
        <div className="splash-heart-wrapper">
          <div className="cute-heart"></div>
        </div>
        <h1 className="splash-title">Happy Birthday Itaa</h1>
        <p className="splash-subtitle">Ini adalah animasi perjalanan dari seekor kucing tentang kenangan dia, tapi ini bukan soal kucing.</p>
        <div className="start-btn-wrapper">
          <button className="start-btn" id="btn-start">Lihat Kenangan</button>
          <div className="btn-glow"></div>
        </div>
        <div className="splash-footer">Created with love for your special day</div>
      </div>
      <div id="end-screen">
        <div id="envelope-container">
          <div className="envelope" id="envelope">
            <div className="flap"></div>
            <div className="pocket"></div>
            <div className="letter">
              <p className="letter-text">Selamat Ulang Tahun yang ke 22...</p>
            </div>
          </div>
          <p className="envelope-hint">Ketuk untuk membuka...</p>
        </div>
        <div id="cake-container">
          <div className="cake" id="interactive-cake">
            <div className="cake-plate"></div>
            <div className="cake-base">
              <div className="cake-icing"></div>
            </div>
            <div className="cake-candle"></div>
            <div className="cake-flame" id="cake-flame"></div>
            <div className="smoke"></div>
          </div>
          <div id="wish-terminal">
            <p className="wish-prompt">Tuliskan satu keinginanmu...</p>
            <input type="text" id="wish-input" placeholder="Permohonanku hari ini adalah..." maxLength={100} />
            <button id="wish-btn">Kirim Permohonan</button>
          </div>
          <p className="cake-hint" id="cake-hint">Tiup lilinnya (Ketuk kuenya) 🎂</p>
        </div>
        <div id="celebration-content" style={{ display: 'none', opacity: 0, transition: 'opacity 2s ease', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h1 className="end-title">Happy Birthday</h1>
          <p className="end-message">Setiap langkah yang kita lalui telah mendewasakan cerita kita. Terima kasih telah menjadi bagian terindah dalam perjalanan ini.</p>
          <div className="gallery-container" id="final-gallery"></div>
          <button id="restart-btn" className="start-btn" style={{ marginTop: '40px', width: '250px', background: '#E63946' }}>Ulangi Kenangan</button>
        </div>
      </div>
    </div>
  );
}
