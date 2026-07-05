"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

// High Quality SVGs for physics stickers (No words, pure icons)
const stickersData = [
  {
    id: "figma",
    width: 80,
    height: 120, // Figma is taller
    content: (
      <svg viewBox="0 0 38 57" fill="none" className="w-full h-full drop-shadow-2xl pointer-events-none">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
    )
  },
  {
    id: "react",
    width: 90,
    height: 90,
    content: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" className="w-full h-full drop-shadow-2xl text-[#61DAFB] pointer-events-none">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    id: "github",
    width: 90,
    height: 90,
    content: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-2xl text-foreground pointer-events-none">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: "framer",
    width: 90,
    height: 90,
    content: (
      <svg viewBox="0 0 14 21" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl text-foreground pointer-events-none">
        <path d="M0 0h14v7H7zm0 7h7l7 7H0zm7 7v7l-7-7z" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: "robot",
    width: 90,
    height: 90,
    content: (
      <svg viewBox="-10 -10 130 130" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl pointer-events-none">
        <g fill="#B56345">
          <path transform="translate(1,1)" d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z" />
          <path transform="translate(2,2)" d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z" />
          <path transform="translate(3,3)" d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z" />
          <path transform="translate(4,4)" d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z" />
          <path transform="translate(5,5)" d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z" />
          <path transform="translate(6,6)" d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z" />
        </g>
        <path fill="#E88D6A" d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z" />
      </svg>
    )
  }
];

export default function StickerPhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  
  // Refs to physically sync HTML DOM elements to Matter.js bodies
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Disable physics on mobile and tablet completely
    if (width < 1024) return;

    // 1. Setup Engine
    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    // 2. We create a Render just to attach mouse constraints easily (though we make it invisible)
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      }
    });
    // Hide the default canvas since we render custom HTML elements
    render.canvas.style.opacity = '0';
    render.canvas.style.pointerEvents = 'none'; // let mouse events pass to the interactive layer
    renderRef.current = render;

    // 3. Create Boundaries (Floor, Left, Right, Top)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    // Add an invisible ceiling far above so they don't get thrown out forever
    const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width * 2, 100, wallOptions);

    Matter.World.add(world, [ground, leftWall, rightWall, ceiling]);

    // 4. Create Sticker Bodies
    const stickerBodies = stickersData.map((sticker, index) => {
      // Spawn them randomly along the top
      const x = (width * 0.2) + Math.random() * (width * 0.6);
      const y = -200 - (index * 150);
      
      return Matter.Bodies.rectangle(x, y, sticker.width, sticker.height, {
        restitution: 0.6, // Bounciness
        friction: 0.1,
        frictionAir: 0.01,
        angle: Math.random() * Math.PI,
        render: { visible: false } // We use HTML
      });
    });

    // Wait for the home page signature animation to finish (~4 seconds) before dropping the stickers
    const timeoutId = setTimeout(() => {
      Matter.World.add(world, stickerBodies);
    }, 4000);

    // 5. Add Mouse Interactivity
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(world, mouseConstraint);

    // Keep the mouse in sync with scrolling
    // render.mouse = mouse; // optional depending on matter version

    // 6. Run Engine
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    runnerRef.current = runner;

    // 7. Sync Loop: Update HTML element transforms to match Matter.js bodies
    let animationFrameId: number;
    const updateSync = () => {
      stickerBodies.forEach((body, i) => {
        const domElement = stickerRefs.current[i];
        if (domElement) {
          const { x, y } = body.position;
          const angle = body.angle;
          domElement.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updateSync);
    };
    updateSync();

    // 8. Handle Window Resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      if (renderRef.current) {
        renderRef.current.options.width = newWidth;
        renderRef.current.options.height = newHeight;
        renderRef.current.canvas.width = newWidth;
        renderRef.current.canvas.height = newHeight;
      }

      // Update physical wall positions
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(leftWall, { x: -50, y: newHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -1000 });
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      if (engineRef.current) Matter.World.clear(engineRef.current.world, false);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
      if (renderRef.current && renderRef.current.canvas) {
        renderRef.current.canvas.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={sceneRef} 
      className="absolute inset-0 w-full h-full z-30 overflow-hidden hidden lg:block" 
      // Ensure the container can receive mouse events for Matter.js dragging
      style={{ touchAction: 'none' }}
    >
      {stickersData.map((sticker, index) => (
        <div
          key={sticker.id}
          ref={(el) => { stickerRefs.current[index] = el; }}
          className="absolute top-0 left-0 cursor-grab active:cursor-grabbing will-change-transform select-none no-stamp"
          draggable="false"
          style={{
            width: sticker.width,
            height: sticker.height,
            transformOrigin: "center center"
          }}
        >
          {sticker.content}
        </div>
      ))}
    </div>
  );
}
