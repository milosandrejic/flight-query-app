"use client";

import { Box } from "@mui/material";

import { ConversationMessage } from "@/types";

import { Header } from "@/components/Header";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeHero } from "@/components/WelcomeHero";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { ConversationTimeline } from "@/components/ConversationTimeline";

// Temporary mock data — will be replaced with real state in 3.8
const mockMessages: ConversationMessage[] = [
  {
    id: "user-1",
    type: "user",
    text: "Find me a cheap flight from London to Tokyo next month",
    timestamp: new Date(),
  },
  {
    id: "system-1",
    type: "system",
    text: "7 flights found",
    timestamp: new Date(),
  },
];

export default function Home() {
  const hasConversation = mockMessages.length > 0;

  const handleQuickStart = (query: string) => {
    console.log("Quick start:", query);
  };

  const handleSend = (message: string) => {
    console.log("Send:", message);
  };

  return (
    <>
      <BackgroundPattern />
      <Header />
      <Box component="main" sx={{ mx: "auto", maxWidth: 920, px: 3 }}>
        {!hasConversation && (
          <Box sx={{ pt: 15, pb: 4 }}>
            <WelcomeHero onQuickStart={handleQuickStart} />
          </Box>
        )}
        {hasConversation && (
          <Box sx={{ pt: 4 }}>
            <ConversationTimeline messages={mockMessages} />
          </Box>
        )}
        <Box sx={{ mb: 3, mt: hasConversation ? 3 : 0 }}>
          <ChatInput onSend={handleSend} isLoading={false} />
        </Box>
      </Box>
    </>
  );
}
