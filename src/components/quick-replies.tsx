import { Box, Chip, Typography } from "@mui/material";

const DEFAULT_SUGGESTIONS = [
  "Make it cheaper",
  "Try next week",
  "Direct flights only",
  "Business class",
  "Morning departures only",
];

interface QuickRepliesProps {
  suggestions?: string[];
  onSelect: (suggestion: string) => void;
}

export function QuickReplies({ suggestions = DEFAULT_SUGGESTIONS, onSelect }: QuickRepliesProps) {
  return (
    <Box>
      <Typography sx={{ fontSize: 13, color: "#6b7280", mb: 1 }}>
        Quick replies:
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {
          suggestions.map((suggestion) => (
            <Chip
              key={suggestion}
              label={suggestion}
              variant="outlined"
              onClick={() => onSelect(suggestion)}
              sx={{
                borderColor: "#e5e7eb",
                color: "#374151",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": {
                  borderColor: "#6366f1",
                  bgcolor: "rgba(99, 102, 241, 0.04)",
                  color: "#6366f1",
                },
              }}
            />
          ))
        }
      </Box>
    </Box>
  );
}
