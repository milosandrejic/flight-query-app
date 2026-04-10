"use client";

import { Box } from "@mui/material";

import { SortBy, CabinClass, ConversationMessage } from "@/types";

import { Header } from "@/components/header";
import { ChatInput } from "@/components/chat-input";
import { FilterBar } from "@/components/filter-bar";
import { WelcomeHero } from "@/components/welcome-hero";
import { QuickReplies } from "@/components/quick-replies";
import { BackgroundPattern } from "@/components/background-pattern";
import { ConversationTimeline } from "@/components/conversation-timeline";

// Temporary mock data — will be replaced with real state in 3.8
const mockMessages: ConversationMessage[] = [
  {
    id: "user-1",
    type: "user",
    text: "Find me a cheap flight from London to Tokyo next month",
    timestamp: new Date("2026-04-10T10:30:00"),
  },
  {
    id: "system-1",
    type: "system",
    text: "7 flights found",
    timestamp: new Date("2026-04-10T10:30:02"),
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

  const handleQuickReply = (suggestion: string) => {
    console.log("Quick reply:", suggestion);
  };

  const handleCabinChange = (cabin: CabinClass) => {
    console.log("Cabin:", cabin);
  };

  const handleSortChange = (sort: SortBy) => {
    console.log("Sort:", sort);
  };

  return (
    <>
      <BackgroundPattern />

      <Header />

      <Box
        component="main"
        sx={{ mx: "auto", maxWidth: 920, px: 3 }}
      >
        {
          !hasConversation &&
          <Box sx={{ pt: 15, pb: 4 }}>
            <WelcomeHero onQuickStart={handleQuickStart} />
          </Box>
        }

        {
          hasConversation &&
          <Box sx={{ pt: 4 }}>
            <ConversationTimeline messages={mockMessages} />
          </Box>
        }

        <Box sx={{ mb: 3, mt: hasConversation ? 3 : 0 }}>
          <ChatInput
            onSend={handleSend}
            isLoading={false}
          />
        </Box>

        {
          hasConversation &&
          <Box sx={{ mb: 3 }}>
            <QuickReplies onSelect={handleQuickReply} />
          </Box>
        }

        {
          hasConversation &&
          <Box sx={{ mb: 3 }}>
            <FilterBar
              cabinClass="economy"
              sortBy="price"
              onCabinChange={handleCabinChange}
              onSortChange={handleSortChange}
            />
          </Box>
        }
      </Box>
    </>
  );
}
