"use client";

import { Box } from "@mui/material";

import { Header } from "@/components/Header";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeHero } from "@/components/WelcomeHero";
import { BackgroundPattern } from "@/components/BackgroundPattern";

export default function Home() {
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
        <Box sx={{ pt: 15, pb: 4 }}>
          <WelcomeHero onQuickStart={handleQuickStart} />
        </Box>
        <Box sx={{ mb: 3 }}>
          <ChatInput onSend={handleSend} isLoading={false} />
        </Box>
      </Box>
    </>
  );
}
