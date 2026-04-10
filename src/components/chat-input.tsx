"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Box } from "@mui/material";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, placeholder }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (value.trim() && !isLoading) {
      onSend(value.trim());
      setValue("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%" }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          component="input"
          type="text"
          placeholder={placeholder || "Ask a follow-up or search for flights..."}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          disabled={isLoading}
          sx={{
            width: "100%",
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            bgcolor: "#fff",
            pl: 2,
            pr: 6,
            py: 2,
            fontSize: 16,
            fontFamily: "inherit",
            color: "#111827",
            outline: "none",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            "&::placeholder": { color: "#6b7280" },
            "&:focus": {
              borderColor: "#6366f1",
              boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)",
            },
            "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
          }}
        />

        <Box
          component="button"
          type="submit"
          disabled={!value.trim() || isLoading}
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 32,
            width: 32,
            borderRadius: 2,
            border: "none",
            bgcolor: "#6366f1",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.2s",
            "&:hover": { bgcolor: "#5558e3" },
            "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
          }}
        >
          <Send size={16} />
        </Box>
      </Box>
    </Box>
  );
}
