import { Box, Typography } from "@mui/material";

const AIRLINE_COLORS: Record<string, string> = {
  LH: "#1a237e",
  AF: "#6366f1",
  BA: "#1565c0",
  EK: "#c62828",
  QR: "#6a1b9a",
  SQ: "#f57f17",
  NH: "#1565c0",
  JL: "#c62828",
  TK: "#c62828",
  KL: "#00838f",
};

const DEFAULT_COLOR = "#6366f1";

interface AirlineLogoProps {
  code: string;
}

export function AirlineLogo({ code }: AirlineLogoProps) {
  const color = AIRLINE_COLORS[code] || DEFAULT_COLOR;

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1.5,
        bgcolor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
      >
        {code}
      </Typography>
    </Box>
  );
}
