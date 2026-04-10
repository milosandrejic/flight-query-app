"use client";

import { motion } from "motion/react";

import { Box, Typography } from "@mui/material";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";

import { ConversationMessage } from "@/types";

interface ConversationTimelineProps {
  messages: ConversationMessage[];
}

export function ConversationTimeline({ messages }: ConversationTimelineProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <Timeline
      sx={{
        p: 0,
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
      }}
    >
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <TimelineItem sx={{ minHeight: "auto" }}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: message.type === "user" ? "#6366f1" : "#6b7280",
                  boxShadow: "none",
                  width: 10,
                  height: 10,
                  m: 0,
                  mt: 0.5,
                  p: 0,
                }}
              />
              {index < messages.length - 1 && (
                <TimelineConnector sx={{ bgcolor: "#e5e7eb", my: 1 }} />
              )}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 0, pl: 2, pr: 0, pb: 3 }}>
              {message.type === "user" ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#6b7280" }}>You</Typography>
                    <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 15, color: "#374151" }}>{message.text}</Typography>
                </>
              ) : (
                <Typography sx={{ fontSize: 15, color: "#6b7280", pt: 0.25 }}>{message.text}</Typography>
              )}
            </TimelineContent>
          </TimelineItem>
        </motion.div>
      ))}
    </Timeline>
  );
}
