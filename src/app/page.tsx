"use client";

import { Box } from "@mui/material";

import { SortBy, CabinClass, FlightResult, ConversationMessage } from "@/types";

import { Header } from "@/components/header";
import { ChatInput } from "@/components/chat-input";
import { FilterBar } from "@/components/filter-bar";
import { FlightCard } from "@/components/flight-card";
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

const mockFlights: FlightResult[] = [
  {
    id: "offer-1",
    price: { amount: 545, currency: "USD" },
    segments: [
      {
        origin: "LHR",
        destination: "NRT",
        departing_at: "2026-05-15T06:15:00",
        arriving_at: "2026-05-16T08:35:00",
        carrier: "LH",
        flight_number: "LH714",
        duration: null,
      },
    ],
    total_duration: 1040,
    stops: 1,
  },
  {
    id: "offer-2",
    price: { amount: 565, currency: "USD" },
    segments: [
      {
        origin: "LHR",
        destination: "NRT",
        departing_at: "2026-05-15T07:30:00",
        arriving_at: "2026-05-16T10:45:00",
        carrier: "AF",
        flight_number: "AF1225",
        duration: null,
      },
    ],
    total_duration: 1095,
    stops: 1,
  },
  {
    id: "offer-3",
    price: { amount: 612, currency: "USD" },
    segments: [
      {
        origin: "LHR",
        destination: "NRT",
        departing_at: "2026-05-15T09:00:00",
        arriving_at: "2026-05-15T17:30:00",
        carrier: "BA",
        flight_number: "BA5",
        duration: null,
      },
    ],
    total_duration: 690,
    stops: 0,
  },
  {
    id: "offer-4",
    price: { amount: 580, currency: "USD" },
    segments: [
      {
        origin: "LHR",
        destination: "NRT",
        departing_at: "2026-05-15T11:45:00",
        arriving_at: "2026-05-16T06:20:00",
        carrier: "TK",
        flight_number: "TK1982",
        duration: null,
      },
    ],
    total_duration: 1115,
    stops: 1,
  },
  {
    id: "offer-5",
    price: { amount: 498, currency: "USD" },
    segments: [
      {
        origin: "LHR",
        destination: "NRT",
        departing_at: "2026-05-15T14:20:00",
        arriving_at: "2026-05-16T13:10:00",
        carrier: "EK",
        flight_number: "EK30",
        duration: null,
      },
    ],
    total_duration: 1370,
    stops: 2,
  },
  {
    id: "offer-6",
    price: { amount: 720, currency: "USD" },
    segments: [
      {
        origin: "LHR",
        destination: "NRT",
        departing_at: "2026-05-15T10:00:00",
        arriving_at: "2026-05-15T18:00:00",
        carrier: "NH",
        flight_number: "NH212",
        duration: null,
      },
    ],
    total_duration: 720,
    stops: 0,
  },
  {
    id: "offer-7",
    price: { amount: 535, currency: "USD" },
    segments: [
      {
        origin: "LHR",
        destination: "NRT",
        departing_at: "2026-05-15T16:50:00",
        arriving_at: "2026-05-16T14:30:00",
        carrier: "KL",
        flight_number: "KL862",
        duration: null,
      },
    ],
    total_duration: 1060,
    stops: 1,
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

  const handleViewDetails = (id: string) => {
    console.log("View details:", id);
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

        {
          hasConversation &&
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            {
              mockFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onViewDetails={handleViewDetails}
                />
              ))
            }
          </Box>
        }
      </Box>
    </>
  );
}
