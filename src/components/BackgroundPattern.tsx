"use client";

import { Box } from "@mui/material";

const cloudPath1 = "M20 40 Q 20 25, 35 25 Q 35 15, 50 15 Q 65 15, 65 25 Q 80 25, 80 40 Z";
const cloudPath2 = "M15 45 Q 15 28, 32 28 Q 32 16, 50 16 Q 68 16, 68 28 Q 85 28, 85 45 Z";
const cloudPath3 = "M18 42 Q 18 27, 33 27 Q 33 17, 48 17 Q 63 17, 63 27 Q 78 27, 78 42 Z";
const cloudPath4 = "M22 38 Q 22 26, 36 26 Q 36 18, 48 18 Q 60 18, 60 26 Q 74 26, 74 38 Z";
const planePath = "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

export function BackgroundPattern() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
        "@keyframes float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "@keyframes floatDelayed": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      }}
    >
      {/* Base gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, #eff6ff, #f0f9ff, #ffffff)",
        }}
      />

      {/* Sun */}
      <Box sx={{ position: "absolute", top: 32, right: 48, width: 64, height: 64, bgcolor: "rgba(253, 230, 138, 0.4)", borderRadius: "50%", filter: "blur(24px)" }} />
      <Box sx={{ position: "absolute", top: 40, right: 56, width: 48, height: 48, bgcolor: "rgba(252, 211, 77, 0.3)", borderRadius: "50%" }} />

      {/* Clouds */}
      <svg style={{ position: "absolute", top: 80, left: 80, width: 128, height: 64, opacity: 0.2, animation: "float 3s ease-in-out infinite" }} viewBox="0 0 128 64" fill="none">
        <path d={cloudPath1} fill="#6366f1" />
      </svg>

      <svg style={{ position: "absolute", top: 128, right: "25%", width: 160, height: 80, opacity: 0.15, animation: "floatDelayed 4s ease-in-out infinite" }} viewBox="0 0 128 64" fill="none">
        <path d={cloudPath2} fill="#0ea5e9" />
      </svg>

      <svg style={{ position: "absolute", top: "33%", left: "33%", width: 144, height: 72, opacity: 0.2, animation: "float 3.5s ease-in-out infinite" }} viewBox="0 0 128 64" fill="none">
        <path d={cloudPath3} fill="#3b82f6" />
      </svg>

      <svg style={{ position: "absolute", bottom: "33%", right: 80, width: 112, height: 56, opacity: 0.15, animation: "floatDelayed 4.5s ease-in-out infinite" }} viewBox="0 0 128 64" fill="none">
        <path d={cloudPath4} fill="#6366f1" />
      </svg>

      <svg style={{ position: "absolute", top: "50%", left: 48, width: 128, height: 64, opacity: 0.2, animation: "float 3.25s ease-in-out infinite" }} viewBox="0 0 128 64" fill="none">
        <path d={cloudPath1} fill="#0ea5e9" />
      </svg>

      {/* Airplane silhouettes */}
      <svg style={{ position: "absolute", top: 160, right: 160, width: 32, height: 32, opacity: 0.3, transform: "rotate(45deg)" }} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
        <path d={planePath} />
      </svg>

      <svg style={{ position: "absolute", bottom: 160, left: "25%", width: 28, height: 28, opacity: 0.25, transform: "rotate(-12deg)" }} viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
        <path d={planePath} />
      </svg>

      <svg style={{ position: "absolute", top: "66%", right: "33%", width: 24, height: 24, opacity: 0.2, transform: "rotate(12deg)" }} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
        <path d={planePath} />
      </svg>

      {/* Dotted flight paths */}
      <svg style={{ position: "absolute", top: "25%", left: 0, width: "100%", height: 128, opacity: 0.1 }}>
        <path d="M 0 60 Q 200 40, 400 50 T 800 60" stroke="#6366f1" strokeWidth="2" fill="none" strokeDasharray="4 8" />
      </svg>

      <svg style={{ position: "absolute", bottom: "25%", right: 0, width: "100%", height: 128, opacity: 0.1 }}>
        <path d="M 1200 40 Q 1000 50, 800 45 T 400 40" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeDasharray="4 8" />
      </svg>
    </Box>
  );
}
