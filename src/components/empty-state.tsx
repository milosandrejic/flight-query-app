import { SearchX } from "lucide-react";

import { Box, Button, Typography } from "@mui/material";

interface EmptyStateProps {
  onRetry?: () => void;
}

export function EmptyState({ onRetry }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          bgcolor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <SearchX
          size={28}
          style={{ color: "#9ca3af" }}
        />
      </Box>

      <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#111827", mb: 0.5 }}>
        No flights found
      </Typography>

      <Typography sx={{ fontSize: 14, color: "#6b7280", mb: 3, textAlign: "center", maxWidth: 320 }}>
        We couldn't find any flights matching your search. Try adjusting your dates or destination.
      </Typography>

      {
        onRetry &&
        <Button
          variant="outlined"
          onClick={onRetry}
          sx={{
            borderColor: "#6366f1",
            color: "#6366f1",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            "&:hover": {
              borderColor: "#4f46e5",
              bgcolor: "rgba(99, 102, 241, 0.04)",
            },
          }}
        >
          Try a different search
        </Button>
      }
    </Box>
  );
}
