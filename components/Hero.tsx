
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background Physics (3D Rotating Globe)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // --- Configuration ---
    const GLOBE_RADIUS = 0.32;
    const DOT_COUNT = 400;
    const DOT_SIZE = 1.5;
    const PERSPECTIVE = 800;
    
    // --- State ---
    let mouse = { x: 0, y: 0 };
    let currentRot = { x: 0, y: 0 };
    let targetRot = { x: 0, y: 0 };

    // --- 3D Point Structure ---
    interface Point {
      x: number;
      y: number;
      z: number;
      neighbors: number[];
    }

    const points: Point[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    // Generate points using Fibonacci sphere algorithm
    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      points.push({ x, y, z, neighbors: [] });
    }

    // Connect closest neighbors for mesh
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const distances: { idx: number; dist: number }[] = [];
      
      for (let j = 0; j < points.length; j++) {
        if (i === j) continue;
        const p2 = points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const dist = dx * dx + dy * dy + dz * dz;
        distances.push({ idx: j, dist });
      }
      
      distances.sort((a, b) => a.dist - b.dist);
      p1.neighbors = distances.slice(0, 3).map(d => d.idx);
    }

    // --- Flowing Particles ---
    interface FlowParticle {
      startNode: number;
      endNode: number;
      progress: number;
      speed: number;
    }

    const flowParticles: FlowParticle[] = [];
    const PARTICLE_COUNT = 40;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const startNode = Math.floor(Math.random() * points.length);
      const endNode = points[startNode].neighbors[Math.floor(Math.random() * points[startNode].neighbors.length)];
      flowParticles.push({
        startNode,
        endNode,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.01
      });
    }

    // --- Event Handlers ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = ((e.clientY - rect.top) / height) * 2 - 1;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update rotation
      targetRot.y = mouse.x * 0.8;
      targetRot.x = -mouse.y * 0.8;

      currentRot.x += (targetRot.x - currentRot.x) * 0.05;
      currentRot.y += (targetRot.y - currentRot.y) * 0.05;

      const time = Date.now() * 0.0002;
      const baseRotY = time;

      const activeRotX = currentRot.x;
      const activeRotY = currentRot.y + baseRotY;

      // Responsive positioning
      const isMobile = width < 768;
      const cx = isMobile ? width * 0.5 : width * 0.7;
      const cy = height * 0.5;
      const globeRadius = Math.min(width, height) * GLOBE_RADIUS;

      const projectedPoints: { x: number; y: number; z: number }[] = [];

      // Pre-calculate rotation
      const cosX = Math.cos(activeRotX);
      const sinX = Math.sin(activeRotX);
      const cosY = Math.cos(activeRotY);
      const sinY = Math.sin(activeRotY);

      // Project all points
      points.forEach(p => {
        // Rotate X
        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.y * sinX + p.z * cosX;
        
        // Rotate Y
        let x2 = p.x * cosY - z1 * sinY;
        let z2 = p.x * sinY + z1 * cosY;

        // Perspective
        const scale = PERSPECTIVE / (PERSPECTIVE + z2 * globeRadius);
        
        projectedPoints.push({
          x: x2 * globeRadius * scale + cx,
          y: y1 * globeRadius * scale + cy,
          z: z2
        });
      });

      // Calculate mouse position in screen space
      const mouseScreenX = (mouse.x + 1) * width / 2;
      const mouseScreenY = (mouse.y + 1) * height / 2;

      // Draw edges (mesh) with mouse highlight
      ctx.lineWidth = 1;
      points.forEach((p, i) => {
        const p1 = projectedPoints[i];

        p.neighbors.forEach(nIdx => {
          if (nIdx > i) {
            const p2 = projectedPoints[nIdx];
            
            const avgZ = (p1.z + p2.z) / 2;
            let alpha = (avgZ + 1) / 2 * 0.15;

            // Mouse proximity highlight for edges
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const distToMouse = Math.sqrt(
              Math.pow(midX - mouseScreenX, 2) + 
              Math.pow(midY - mouseScreenY, 2)
            );
            
            if (distToMouse < 150) {
              const proximity = 1 - distToMouse / 150;
              alpha += proximity * 0.3;
            }
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 0, 0, ${Math.max(0.02, alpha)})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw flowing particles
      flowParticles.forEach(particle => {
        particle.progress += particle.speed;
        
        if (particle.progress >= 1) {
          particle.progress = 0;
          particle.startNode = particle.endNode;
          const neighbors = points[particle.startNode].neighbors;
          particle.endNode = neighbors[Math.floor(Math.random() * neighbors.length)];
        }

        const p1 = projectedPoints[particle.startNode];
        const p2 = projectedPoints[particle.endNode];
        
        const px = p1.x + (p2.x - p1.x) * particle.progress;
        const py = p1.y + (p2.y - p1.y) * particle.progress;
        const pz = p1.z + (p2.z - p1.z) * particle.progress;

        const alpha = (pz + 1) / 2;
        
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.3, alpha * 0.8)})`;
        ctx.fill();
      });

      // Draw nodes with mouse highlight
      projectedPoints.forEach((p, i) => {
        const alpha = (p.z + 1) / 2;
        let size = DOT_SIZE * ((p.z + 2) / 2);

        // Mouse proximity highlight for nodes
        const distToMouse = Math.sqrt(
          Math.pow(p.x - mouseScreenX, 2) + 
          Math.pow(p.y - mouseScreenY, 2)
        );
        
        let nodeAlpha = Math.max(0.1, alpha);
        
        if (distToMouse < 100) {
          const proximity = 1 - distToMouse / 100;
          size *= (1 + proximity * 0.8);
          nodeAlpha = Math.min(0.9, nodeAlpha + proximity * 0.4);
        }
        
        ctx.fillStyle = `rgba(0, 0, 0, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-black overflow-hidden flex flex-col justify-center">
      
      {/* Background Video Layer */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://cdn.pixabay.com/video/2020/08/12/46965-449623750_large.mp4" />
      </video>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-white/85 z-[1]"></div>
      
      {/* Background: 3D Globe Canvas */}
      {/* <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-auto z-[2]"
      /> */}
      
      {/* Content Overlay */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 pointer-events-none flex flex-col lg:flex-row items-center justify-between h-full pt-20 lg:pt-0">
        
        {/* Left: Typography */}
        <div className="max-w-4xl lg:w-1/2 mb-12 lg:mb-0">
            {/* Top Tagline */}
            <div className="flex items-center gap-4 mb-8 reveal-up">
                <div className="h-px w-12 bg-black"></div>
                <span className="text-xs font-bold uppercase tracking-[0.3em]">
                    we are FORINIT
                </span>
            </div>

            {/* Main Title */}
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-black mix-blend-hard-light mb-12">
                <span className="block reveal-up delay-100">PIONEERING</span>
                <span className="block text-gray-400 reveal-up delay-200">
                    ADVANCED
                </span>
                <div className="flex items-center gap-6 reveal-up delay-300">
                    <span className="block">TECHNOLOGY</span>
                </div>
            </h1>

            {/* Subtext */}
            <div className="max-w-xl reveal-up delay-300">
                <p className="text-lg md:text-xl text-black/80 font-medium leading-relaxed pointer-events-auto backdrop-blur-sm">
Forinit builds scalable AI and software to automate enterprise workflows. We deliver intelligent, data-driven platforms that integrate seamlessly into your digital ecosystem. Our technology leverages machine learning to drive efficiency and growth.



                </p>
                
                <div className="mt-8 pointer-events-auto inline-block">
                    <button className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-4">
                        View Products
                        <ArrowDown size={14} />
                    </button>
                </div>
            </div>
        </div>

        {/* Right side spacer to push content left, leaving room for globe */}
        <div className="lg:w-1/2"></div>

      </div>
      
      {/* Bottom Floating Bar */}
      <div className="absolute bottom-12 w-full max-w-[1400px] left-1/2 -translate-x-1/2 px-6 md:px-12 flex justify-between items-end z-20 pointer-events-none mix-blend-darken">
          <div className="hidden md:block text-[10px] font-mono text-gray-400 space-y-1">
              <div>SYS.STATUS: ONLINE</div>
              <div>FIELD.INT: 98%</div>
          </div>

           <div className="hidden md:block text-[10px] font-mono text-gray-400 text-right space-y-1">
              <div>EST. 2024</div>
              <div>VER. 2.4.0</div>
          </div>
      </div>

    </section>
  );
};
