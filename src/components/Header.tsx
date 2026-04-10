"use client";

import { Plane } from "lucide-react";

import { Box, Typography } from "@mui/material";

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        bgcolor: "white",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1440,
          mx: "auto",
          px: "24px",
          py: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Plane size={20} color="#6366f1" />
        <Typography
          component="span"
          sx={{
            color: "#111827",
            fontWeight: 600,
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          Flight Query Engine
        </Typography>
      </Box>
    </Box>
  );
}
