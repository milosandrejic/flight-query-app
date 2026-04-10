"use client";

import { motion } from "motion/react";
import {
  Plane,
  Sparkles,
} from "lucide-react";

import { Box, Typography } from "@mui/material";

interface WelcomeHeroProps {
  onQuickStart: (query: string) => void;
}

const EXAMPLE_QUERIES = [
  "Find me a cheap flight from London to Tokyo next month",
  "Show me direct flights from New York to Paris in June",
  "I need a business class ticket to Singapore",
];

export function WelcomeHero({ onQuickStart }: WelcomeHeroProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ textAlign: "center" }}
    >
      {/* Icon */}
      <Box
        component={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(99, 102, 241, 0.2)",
              filter: "blur(24px)",
              borderRadius: "50%",
            }}
          />

          <Box
            sx={{
              position: "relative",
              background: "linear-gradient(to bottom right, #6366f1, #4f46e5)",
              p: 2.5,
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            <Plane
              size={32}
              color="#fff"
            />
          </Box>
        </Box>
      </Box>

      {/* Title */}
      <Typography
        component={motion.h1}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        sx={{
          fontSize: { xs: 36, sm: 48 },
          fontWeight: 600,
          color: "#111827",
          mb: 2,
        }}
      >
        Flight Query App
      </Typography>

      {/* Subtitle */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        sx={{
          fontSize: 18,
          color: "#6b7280",
          mb: 4,
          maxWidth: 672,
          mx: "auto",
        }}
      >
        Search for flights in natural language. Refine your results with follow-up questions.
      </Typography>

      {/* Example Queries */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        sx={{ maxWidth: 672, mx: "auto" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            fontSize: 14,
            color: "#6b7280",
            mb: 1.5,
          }}
        >
          <Sparkles size={16} />
          <span>Try asking:</span>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {
            EXAMPLE_QUERIES.map((query, index) => (
              <Box
                key={index}
                component={motion.button}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                onClick={() => onQuickStart(query)}
                sx={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  px: 2.5,
                  py: 1.5,
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  bgcolor: "#fff",
                  color: "#374151",
                  fontSize: 15,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#6366f1",
                    bgcolor: "rgba(99, 102, 241, 0.05)",
                    color: "#6366f1",
                    "& .arrow": { color: "#6366f1" },
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    className="arrow"
                    sx={{ color: "#6b7280", transition: "color 0.2s" }}
                  >
                    →
                  </Box>
                  <span>{query}</span>
                </Box>
              </Box>
            ))
          }
        </Box>
      </Box>
    </Box>
  );
}
