"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import BubbleMenu from "@/components/BubbleMenu";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import StickerPhysics from "@/components/StickerPhysics";
import VendingMachineAbout from "@/components/VendingMachineAbout";
import AvatarTransition from "@/components/AvatarTransition";
import Link from "next/link";

import { projects } from "@/data/projects";

const coreStackIcons = [
  {
    name: "JavaScript",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F7DF1E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16v16H4z" />
        <path d="M9 9v6" />
        <path d="M15 9v6" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 8l8 8" />
        <path d="M16 8v8h-8" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#88CE02"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#38B2AC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 14s2-3 4-3 3 2 4 2 2-3 4-3 3 2 4 2" />
        <path d="M4 18s2-3 4-3 3 2 4 2 2-3 4-3 3 2 4 2" />
      </svg>
    ),
  },
  {
    name: "HTML5",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E34F26"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4l1.5 14 6.5 2 6.5-2L20 4z" />
        <path d="M8 9h8l-.5 6-3.5 1-3.5-1" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1572B6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4l1.5 14 6.5 2 6.5-2L20 4z" />
        <path d="M16 9H8l.5 6 3.5 1 3.5-1" />
      </svg>
    ),
  },
];

const philosophyWords =
  "Designing experiences that help brands grow through".split(" ");

export default function Home() {
  const container = useRef(null);
  const projectsRef = useRef(null);
  const headingRef = useRef(null);
  const [hoveredDiscipline, setHoveredDiscipline] = useState<number | null>(
    null,
  );

  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start center", "end center"],
  });

  // Use a smooth spring physics model so the drawing feels fluid and real-time
  const projectPathLength = useSpring(projectsScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll specifically for the heading stroke-to-solid animation
  const { scrollYProgress: headingScrollProgress } = useScroll({
    target: headingRef,
    offset: ["start 80%", "end 50%"],
  });
  const headingClipPath = useTransform(
    headingScrollProgress,
    [0, 1],
    ["inset(-10% 100% -10% -10%)", "inset(-10% -10% -10% -10%)"],
  );

  const disciplineGraphics = [
    // 0: Landing Pages
    <motion.div
      key="0"
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="w-full h-full flex items-center justify-center absolute inset-0"
    >
      <svg
        width="240"
        height="180"
        viewBox="0 0 240 180"
        fill="none"
        className="text-accent-blue drop-shadow-2xl"
      >
        <rect
          x="10"
          y="10"
          width="220"
          height="160"
          rx="12"
          stroke="currentColor"
          strokeWidth="6"
        />
        <path d="M10 50H230" stroke="currentColor" strokeWidth="6" />
        <circle cx="35" cy="30" r="5" fill="currentColor" />
        <circle cx="55" cy="30" r="5" fill="currentColor" />
        <circle cx="75" cy="30" r="5" fill="currentColor" />
        <rect
          x="40"
          y="75"
          width="160"
          height="40"
          rx="4"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="3"
        />
        <rect
          x="40"
          y="130"
          width="70"
          height="20"
          rx="4"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="3"
        />
        <rect
          x="130"
          y="130"
          width="70"
          height="20"
          rx="4"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    </motion.div>,
    // 1: Visual Branding
    <motion.div
      key="1"
      initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="w-full h-full flex items-center justify-center absolute inset-0 relative"
    >
      <motion.div
        animate={{ rotate: 180 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute"
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 100 100"
          fill="none"
          className="text-accent-yellow drop-shadow-2xl"
        >
          <circle cx="50" cy="20" r="20" fill="currentColor" />
          <rect
            x="15"
            y="50"
            width="40"
            height="40"
            fill="currentColor"
            fillOpacity="0.5"
          />
          <path
            d="M85 50 L105 90 L65 90 Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
        </svg>
      </motion.div>
    </motion.div>,
    // 2: Product Design
    <motion.div
      key="2"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="w-full h-full flex items-center justify-center absolute inset-0"
    >
      <svg
        width="140"
        height="260"
        viewBox="0 0 140 260"
        fill="none"
        className="text-accent-blue drop-shadow-2xl"
      >
        <rect
          x="10"
          y="10"
          width="120"
          height="240"
          rx="20"
          stroke="currentColor"
          strokeWidth="8"
        />
        <path
          d="M50 10 H90"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <rect
          x="25"
          y="45"
          width="90"
          height="110"
          rx="8"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <rect
          x="25"
          y="170"
          width="90"
          height="25"
          rx="6"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <rect
          x="25"
          y="210"
          width="50"
          height="15"
          rx="4"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </svg>
    </motion.div>,
  ];
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="relative min-h-screen">
      <Preloader />

      {/* Hero Section */}
      <section
        id="hero"
        className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      >
        <StickerPhysics />

        {/* Persistent Preloader PR Stamp (Top Left) */}
        <motion.div
          className="absolute top-6 left-6 md:top-10 md:left-10 z-50 text-foreground group cursor-crosshair pointer-events-auto"
          initial={{ opacity: 0, x: -50, rotate: -20 }}
          animate={{ opacity: 1, x: 0, rotate: -5 }}
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ duration: 1, delay: 4.5, ease: "easeOut" }}
        >
          <svg
            viewBox="0 0 200 200"
            fill="none"
            className="w-16 md:w-24 h-auto group-hover:text-red-600 transition-colors duration-500"
          >
            <rect
              x="10"
              y="10"
              width="180"
              height="180"
              stroke="currentColor"
              strokeWidth="12"
            />
            <rect
              x="25"
              y="25"
              width="150"
              height="150"
              stroke="currentColor"
              strokeWidth="4"
            />

            {/* "P" */}
            <path
              d="M 50 150 V 50 H 100 Q 120 50 120 75 Q 120 100 100 100 H 70"
              stroke="currentColor"
              strokeWidth="16"
              strokeLinejoin="miter"
            />

            {/* "R" */}
            <path
              d="M 120 150 L 100 100"
              stroke="currentColor"
              strokeWidth="16"
              strokeLinecap="square"
            />

            {/* Decorative elements */}
            <circle cx="170" cy="170" r="8" fill="currentColor" />
            <circle cx="30" cy="30" r="8" fill="currentColor" />

            <text
              x="35"
              y="165"
              fill="currentColor"
              className="font-mono text-[14px] font-bold tracking-widest uppercase"
            >
              EST. 2026
            </text>
          </svg>
        </motion.div>

        <motion.div
          className="absolute z-10 flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 4.4, ease: "easeOut" }}
        >
          <svg
            viewBox="0 0 1200 400"
            className="w-[95vw] md:w-[85vw] max-w-[1400px] h-auto drop-shadow-2xl text-foreground"
          >
            <text
              textAnchor="middle"
              fill="currentColor"
              className="font-sans font-black text-[130px] sm:text-[150px] uppercase tracking-tighter leading-none"
            >
              <tspan x="50%" y="160">
                PRIYANSHU
              </tspan>
              <tspan x="50%" y="320">
                RAJ
              </tspan>
            </text>
          </svg>
        </motion.div>

        {/* Signature SVG Mock */}
        <motion.div
          className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 1, y: 0, scale: 1.2 }}
          animate={{ opacity: 0.6, y: -180, scale: 0.5 }}
          transition={{ duration: 1.0, delay: 3.8, ease: "easeInOut" }}
        >
          <svg
            width="800"
            height="300"
            viewBox="0 0 400 150"
            fill="none"
            stroke="#d97743"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[90vw] max-w-[800px] h-auto"
          >
            <motion.path
              d="M 50 100 Q 150 20 200 50 T 250 50 T 270 55 T 300 50 T 350 55"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 2.8 }}
            />
          </svg>
        </motion.div>
      </section>

      {/* Epic Avatar Scroll Transition (Now includes 1+ Years section as children) */}
      <AvatarTransition>
        <div className="relative w-full h-full bg-[#202020] flex flex-col items-center justify-center overflow-hidden pointer-events-none">
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              backgroundPosition: "center center",
            }}
          />

          {/* Framing Lines (The "Square") */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute left-[8%] md:left-[15%] top-0 bottom-0 w-[1px] bg-white/40" />
            <div className="absolute right-[8%] md:right-[15%] top-0 bottom-0 w-[1px] bg-white/40" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/40 -translate-y-1/2" />
          </div>

          {/* Animated Line */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 mt-[40vh] md:mt-[35vh]">
            <svg
              width="100%"
              height="600"
              viewBox="0 0 1000 600"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M -100 400 Q 200 500 400 300 T 700 300 T 900 100 T 1100 50"
                stroke="#efebe2"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute left-[12%] md:left-[15%] top-1/3 z-10"
            animate={{ y: [0, -25, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="120"
              height="120"
              viewBox="-10 -10 130 130"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              <g fill="#B56345">
                <path
                  transform="translate(1,1)"
                  d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z"
                />
                <path
                  transform="translate(2,2)"
                  d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z"
                />
                <path
                  transform="translate(3,3)"
                  d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z"
                />
                <path
                  transform="translate(4,4)"
                  d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z"
                />
                <path
                  transform="translate(5,5)"
                  d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z"
                />
                <path
                  transform="translate(6,6)"
                  d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z"
                />
              </g>
              <path
                fill="#E88D6A"
                d="M 20 0 H 90 V 10 H 20 Z M 20 10 H 30 V 30 H 20 Z M 40 10 H 70 V 30 H 40 Z M 80 10 H 90 V 30 H 80 Z M 20 30 H 90 V 40 H 20 Z M 0 40 H 110 V 60 H 0 Z M 20 60 H 90 V 70 H 20 Z M 20 70 H 30 V 90 H 20 Z M 40 70 H 50 V 90 H 40 Z M 60 70 H 70 V 90 H 60 Z M 80 70 H 90 V 90 H 80 Z"
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute right-[12%] md:right-[15%] top-1/4 z-10"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="white"
              className="opacity-80 drop-shadow-2xl"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute bottom-[10%] md:bottom-[15%] left-[48%] -translate-x-1/2 z-20"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-[#111] p-6 rounded-2xl border-[3px] border-[#FFE862] shadow-2xl flex items-center justify-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 38 57"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#f24e1e"
                  d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
                />
                <path
                  fill="#ff7262"
                  d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z"
                />
                <path
                  fill="#1abcfe"
                  d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z"
                />
                <path
                  fill="#0acf83"
                  d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"
                />
                <path fill="#a259ff" d="M19 0h9.5a9.5 9.5 0 1 1 0 19H19V0z" />
              </svg>
            </div>
          </motion.div>

          <div className="z-10 text-center max-w-4xl px-6 text-white relative flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-[4.5rem] lg:text-[5rem] font-sans font-medium leading-[1.15] tracking-tight"
            >
              <span className="font-bold">1+ years</span> of crafting
              <br />
              meaningful products and
              <br />
              visuals that hold up
            </motion.h2>
          </div>
        </div>
      </AvatarTransition>

      {/* Role Tags Section */}
      <section className="py-24 w-full overflow-hidden bg-background relative flex flex-col gap-6 pointer-events-none">
        <div className="flex whitespace-nowrap w-fit">
          <motion.div
            className="flex gap-8 pr-8"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          >
            {/* We render two identical blocks to seamlessly loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 items-center">
                {[
                  "BRAND DESIGNER",
                  "WEB DESIGNER",
                  "PRODUCT DESIGNER",
                  "UX/UI EXPERT",
                  "CREATIVE DIRECTOR",
                ].map((role, idx) => (
                  <div key={idx} className="flex items-center gap-8">
                    <span className="text-4xl md:text-7xl font-sans font-bold tracking-tighter text-foreground">{role}</span>
                    <span className="text-3xl md:text-4xl text-accent-blue">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex whitespace-nowrap w-fit">
          <motion.div
            className="flex gap-8 pr-8"
            animate={{ x: ["-50%", 0] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 items-center">
                {[
                  "VISUAL BRANDING",
                  "MOTION GRAPHICS",
                  "3D PROTOTYPING",
                  "FRONTEND DEV",
                  "TYPOGRAPHY",
                ].map((role, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-8 text-foreground"
                  >
                    <span
                      className="text-5xl md:text-7xl font-sans font-black tracking-tighter text-transparent"
                      style={{ WebkitTextStroke: "2px currentColor" }}
                    >
                      {role}
                    </span>
                    <span className="text-4xl text-accent-yellow">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        id="philosophy"
        className="min-h-[100vh] flex flex-col md:flex-row items-center justify-between px-10 md:px-24 py-32 max-w-[1600px] mx-auto w-full relative border-t border-black/10 dark:border-white/10"
      >
        {/* Left Side: Rotating Badge Graphic */}
        <motion.div className="w-full md:w-1/2 h-[300px] md:h-[500px] flex justify-center items-center mb-20 md:mb-0 relative pointer-events-none">
          <AnimatePresence mode="wait">
            {hoveredDiscipline === null ? (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[450px] md:h-[450px] rounded-full border-[1px] border-black/10 dark:border-white/10 flex items-center justify-center relative border-dashed"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 35,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute w-[80%] h-[80%] rounded-full border-[2px] border-accent-blue/30 flex items-center justify-center"
                  />
                  {/* Inner Star */}
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    width="140"
                    height="140"
                    viewBox="0 0 100 100"
                    fill="none"
                    className="text-accent-yellow drop-shadow-xl absolute"
                  >
                    <path
                      d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z"
                      fill="currentColor"
                    />
                  </motion.svg>

                  <div className="absolute w-[120%] h-[120%] rounded-full border-[1px] border-black/5 dark:border-white/5 border-dashed" />
                </motion.div>
              </motion.div>
            ) : (
              disciplineGraphics[hoveredDiscipline]
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Side: Typography */}
        <div className="w-full md:w-1/2 flex flex-col items-start md:items-end z-10 text-left md:text-right">
          <div className="flex flex-wrap justify-start md:justify-end gap-x-3 gap-y-2 mb-16 max-w-xl">
            {philosophyWords.map((word, idx) => (
              <div key={idx} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block text-4xl md:text-[3.5rem] leading-tight text-foreground font-sans font-light tracking-tight"
                  initial={{ opacity: 0, y: "100%", rotate: 5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.03,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start md:items-end text-4xl md:text-6xl lg:text-7xl font-sans uppercase font-black tracking-tighter">
            {["Landing Pages", "Visual Branding", "Product Design"].map(
              (item, idx) => (
                <div key={idx} className="overflow-hidden py-1">
                  <motion.div
                    initial={{ opacity: 0, y: "100%" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="hover:text-accent-blue transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredDiscipline(idx)}
                    onMouseLeave={() => setHoveredDiscipline(null)}
                  >
                    {item}
                  </motion.div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* About Section Wrapper */}
      <div id="about">
        {/* MOBILE & TABLET: Original Bento Box Design */}
        <section className="block lg:hidden min-h-screen py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-black/10 dark:border-white/10 relative overflow-hidden">
          {/* Background "ABOUT" Text */}
          <div
            className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 text-[12rem] md:text-[25rem] font-sans font-black text-transparent opacity-[0.03] dark:opacity-10 pointer-events-none tracking-tighter"
            style={{ WebkitTextStroke: "2px currentColor" }}
          >
            ABOUT
          </div>

          <div className="flex flex-col lg:flex-row gap-16 relative z-10 w-full h-full pt-10">
            {/* Left Column: The Story */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                className="text-5xl font-playfair font-black mb-10"
              >
                Who I Am
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed space-y-6"
              >
                <p>
                  I'm{" "}
                  <strong className="font-medium text-foreground">
                    Priyanshu Raj
                  </strong>
                  , a Frontend Developer and BCA student at Sarala Birla
                  University (SBU) in Ranchi.
                </p>
                <p>
                  I specialize in crafting visually stunning, responsive, and
                  performance-optimized user interfaces. My expertise lies in
                  bringing static designs to life using modern animation
                  frameworks like GSAP and creating fluid, motion-rich scroll
                  experiences.
                </p>
                <p>
                  Most recently, I expanded my technical horizons through an{" "}
                  <strong className="font-medium text-foreground">
                    AI Web Development Internship
                  </strong>{" "}
                  with the Inamigos Foundation, bridging academic theory with
                  cutting-edge industry practices.
                </p>
              </motion.div>
            </div>

            {/* Right Column: Bento Box Grid */}
            <div className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Core Stack */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 md:col-span-2 bg-[#f4f4f5] dark:bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group"
              >
                <h3 className="text-sm uppercase tracking-widest text-foreground/50 mb-8 font-bold">
                  Core Stack
                </h3>
                <div className="flex flex-wrap gap-3 relative z-10">
                  {coreStackIcons.map((skill) => (
                    <span
                      key={skill.name}
                      className="bg-white dark:bg-[#2a2a2a] px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-black/5 dark:border-white/5 flex items-center gap-2"
                    >
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
                  </svg>
                </div>
              </motion.div>

              {/* Card 2: Systems & Logic */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#f4f4f5] dark:bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-between"
              >
                <h3 className="text-sm uppercase tracking-widest text-foreground/50 mb-6 font-bold">
                  Systems & Logic
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-sm">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 9v6" />
                        <path d="M15 12h6" />
                        <path d="M11 9v6" />
                        <path d="M8 12h6" />
                        <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
                      </svg>
                    </div>
                    <span className="font-medium text-lg">C / C++ (OOPs)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-yellow/20 flex items-center justify-center text-[#d97743] font-bold text-sm">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 8H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-4" />
                        <path d="M16 16h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H10a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                      </svg>
                    </div>
                    <span className="font-medium text-lg">Python (Pandas)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-foreground font-bold text-sm">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="18" cy="6" r="3" />
                        <path d="M18 9v6" />
                        <path d="M6 9v12" />
                        <path d="M6 9a9 9 0 0 0 9 9h3" />
                      </svg>
                    </div>
                    <span className="font-medium text-lg">Git & GitHub</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Location / Profile Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#f4f4f5] dark:bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group min-h-[250px]"
              >
                {/* Architectural Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] pointer-events-none" />

                {/* Cool rotating compass / crosshair graphic */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -right-12 -top-12 opacity-[0.05] dark:opacity-10 pointer-events-none"
                >
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 100 100"
                    fill="none"
                    className="text-foreground"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <path
                      d="M50 0 V100 M0 50 H100"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>

                <div className="relative z-10 w-full flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-2 font-bold">
                      Location
                    </h3>
                    <p className="text-4xl md:text-5xl font-sans font-black tracking-tighter leading-none text-foreground mt-1">
                      RANCHI
                      <br />
                      INDIA
                    </p>
                  </div>
                  <div className="text-accent-blue bg-accent-blue/10 p-3 rounded-full border border-accent-blue/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>

                {/* Ticker Tape Status Badge */}
                <div className="mt-auto -mx-8 -mb-8 overflow-hidden bg-accent-yellow text-black border-t border-black/10 dark:border-white/10 rounded-b-3xl relative z-10">
                  <div className="flex">
                    <motion.div
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="flex items-center whitespace-nowrap py-3 font-sans font-black text-xs md:text-sm tracking-widest uppercase"
                    >
                      <span className="px-4">Available For Work</span>
                      <span>✦</span>
                      <span className="px-4">Available For Work</span>
                      <span>✦</span>
                      <span className="px-4">Available For Work</span>
                      <span>✦</span>
                      <span className="px-4">Available For Work</span>
                      <span>✦</span>
                      <span className="px-4">Available For Work</span>
                      <span>✦</span>
                      <span className="px-4">Available For Work</span>
                      <span>✦</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* DESKTOP: Vending Machine Playground */}
        <div className="hidden lg:block">
          <VendingMachineAbout />
        </div>
      </div>

      <section
        id="projects"
        ref={projectsRef}
        className="py-16 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-black/10 dark:border-white/10 relative"
      >
        <div className="text-center mb-16 md:mb-32 relative z-10">
          <div ref={headingRef} className="relative inline-block mb-6 pr-4">
            {/* The Transparent Stroked Background Text */}
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black uppercase text-transparent"
              style={{ WebkitTextStroke: "2px var(--foreground)" }}
            >
              Curated Journey
            </h2>
            {/* The Solid Text That Wipes Across */}
            <motion.h2
              style={{ clipPath: headingClipPath }}
              className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black uppercase text-foreground absolute top-0 left-0 whitespace-nowrap"
            >
              Curated Journey
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Selection of projects across branding, product design, and visual
            systems.
          </motion.p>
        </div>

        {/* The Animated Route SVG Canvas */}
        <div className="absolute inset-0 top-[350px] bottom-[150px] left-0 right-0 w-full h-[calc(100%-500px)] pointer-events-none hidden md:block">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible absolute inset-0"
          >
            <defs>
              <mask id="route-mask" maskUnits="userSpaceOnUse">
                <motion.path
                  d="M 25 0 C 25 15, 75 20, 75 33 C 75 48, 25 53, 25 66 C 25 81, 75 80, 75 88 C 75 95, 50 95, 50 100"
                  fill="none"
                  stroke="white"
                  strokeWidth="100"
                  strokeLinecap="square"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: projectPathLength }}
                />
              </mask>
            </defs>

            <g mask="url(#route-mask)">
              {/* Outline Path (Thick and slightly longer) */}
              <path
                d="M 25 0 C 25 15, 75 20, 75 33 C 75 48, 25 53, 25 66 C 25 81, 75 80, 75 88 C 75 95, 50 95, 50 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                strokeDasharray="44 16"
                strokeLinecap="butt"
                vectorEffect="non-scaling-stroke"
              />
              {/* Inner Orange Path */}
              <path
                d="M 25 0 C 25 15, 75 20, 75 33 C 75 48, 25 53, 25 66 C 25 81, 75 80, 75 88 C 75 95, 50 95, 50 100"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeDasharray="36 24"
                strokeDashoffset="-4"
                strokeLinecap="butt"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>
        </div>

        {/* The Project Stamps */}
        <div className="flex flex-col gap-32 md:gap-48 relative z-10 w-full">
          {projects.slice(0, 4).map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full flex ${isEven ? "justify-start md:pl-[10%]" : "justify-end md:pr-[10%]"}`}
              >
                <Link
                  href={`/works/${project.slug}`}
                  className="w-full max-w-xl md:max-w-2xl"
                >
                  {/* Postage Stamp Card Wrapper */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                      y: 50,
                      rotate: isEven ? -3 : 3,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      rotate: isEven ? -1 : 1,
                    }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    viewport={{ once: true, margin: "-25%" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="p-4 bg-white dark:bg-[#2a2a2a] relative group shadow-2xl"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(black, black), radial-gradient(circle at center, transparent 6px, black 6.5px)",
                      WebkitMaskSize:
                        "calc(100% - 12px) calc(100% - 12px), 20px 20px",
                      WebkitMaskPosition: "center, -10px -10px",
                      WebkitMaskRepeat: "no-repeat, repeat",
                      maskImage:
                        "linear-gradient(black, black), radial-gradient(circle at center, transparent 6px, black 6.5px)",
                      maskSize:
                        "calc(100% - 12px) calc(100% - 12px), 20px 20px",
                      maskPosition: "center, -10px -10px",
                      maskRepeat: "no-repeat, repeat",
                    }}
                  >
                    <div className="p-4 md:p-6 bg-[#faf9f6] dark:bg-[#1a1a1a] h-full w-full flex flex-col items-center overflow-hidden border-[1.5px] border-black/10 dark:border-white/10">
                      {/* Vintage Postal Elements */}
                      <div className="w-full flex justify-between items-center mb-4 md:mb-6 font-mono text-xs opacity-60 uppercase font-bold tracking-widest text-foreground">
                        <span>{project.year}</span>
                        <span>00{idx + 1}</span>
                      </div>

                      {/* Project Image */}
                      <div className="w-full aspect-[4/3] relative overflow-hidden bg-black/5 mb-6 transition-shadow group-hover:shadow-inner">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                        />

                        {/* Fake ink stamp overlay */}
                        <div className="absolute top-4 -right-4 w-24 h-24 border-[3px] border-accent-blue/40 rounded-full flex items-center justify-center -rotate-12 opacity-50 mix-blend-multiply dark:mix-blend-screen group-hover:rotate-6 transition-transform duration-700 pointer-events-none">
                          <span className="text-[0.6rem] font-bold text-accent-blue uppercase tracking-widest text-center leading-tight">
                            Authentic
                            <br />
                            {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="w-full text-center">
                        <h3 className="text-3xl md:text-5xl font-playfair font-black mb-3 uppercase tracking-tighter text-foreground">
                          {project.title}
                        </h3>
                        <div className="text-xs font-bold tracking-[0.2em] text-foreground/50 uppercase">
                          {project.category}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Massive Peel Sticker (View All Projects) */}
        <div className="mt-16 md:mt-48 flex justify-center w-full relative z-20">
          <a href="/works">
            <motion.div
              className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-accent-yellow flex flex-col items-center justify-center relative cursor-crosshair group shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[4px] border-black"
              initial={{ rotate: -8 }}
              whileHover={{ rotate: 5, scale: 1.1, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Inner Circle Detail */}
              <div className="absolute inset-2 border-[2px] border-black/30 rounded-full border-dashed group-hover:rotate-[45deg] transition-transform duration-700 pointer-events-none" />

              {/* Text */}
              <div className="text-center px-6 relative z-10">
                <span className="font-sans font-black text-black uppercase text-xl md:text-2xl leading-none tracking-tighter block mb-1">
                  PEEL TO
                </span>
                <span className="font-playfair font-black italic text-black text-4xl md:text-5xl leading-none block mb-1">
                  View
                </span>
                <span className="font-mono font-bold text-black uppercase text-[10px] md:text-xs tracking-widest block">
                  Full Archive
                </span>
              </div>
            </motion.div>
          </a>
        </div>
      </section>

      <Footer />

      <BubbleMenu
        useFixedPosition={true}
        menuBg="var(--background)"
        menuContentColor="var(--foreground)"
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
    </main>
  );
}
