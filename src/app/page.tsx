"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";

import { Box } from "@mui/material";

import { api } from "@/services/api";
import {
  SortBy,
  CabinClass,
  FlightResult,
  ConversationMessage,
  FlightSearchResponse,
  OfferDetailsResponse,
} from "@/types";

import { Header } from "@/components/header";
import { ChatInput } from "@/components/chat-input";
import { FilterBar } from "@/components/filter-bar";
import { EmptyState } from "@/components/empty-state";
import { FlightCard } from "@/components/flight-card";
import { WelcomeHero } from "@/components/welcome-hero";
import { QuickReplies } from "@/components/quick-replies";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { BackgroundPattern } from "@/components/background-pattern";
import { FlightDetailPanel } from "@/components/flight-detail-panel";
import { ConversationTimeline } from "@/components/conversation-timeline";

export default function Home() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");
  const [sortBy, setSortBy] = useState<SortBy>("price");

  const handleCabinChange = (cabin: CabinClass) => {
    setCabinClass(cabin);
    handleSearch(`Switch to ${cabin.replace("_", " ")} class`);
  };
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [offerDetails, setOfferDetails] = useState<OfferDetailsResponse | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const hasConversation = messages.length > 0;

  const addMessage = (type: "user" | "system", text: string) => {
    const msg: ConversationMessage = {
      id: `${type}-${Date.now()}`,
      type,
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, msg]);

    return msg;
  };

  const handleSearch = async (query: string) => {
    addMessage("user", query);
    setIsLoading(true);
    setFlights([]);

    try {
      const endpoint = sessionId ? `/search/follow-up/${sessionId}` : "/search";

      const { data } = await api.post<FlightSearchResponse>(endpoint, { query });

      setSessionId(data.session_id);
      setFlights(data.results);
      addMessage("system", `Found ${data.results.length} flights matching your search.`);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      addMessage("system", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (id: string) => {
    setDetailsOpen(true);
    setDetailsLoading(true);
    setDetailsError(false);
    setOfferDetails(null);

    try {
      const { data } = await api.get<OfferDetailsResponse>(`/flights/${encodeURIComponent(id)}`);

      setOfferDetails(data);
    } catch {
      setDetailsError(true);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleRetry = () => {
    setMessages([]);
    setFlights([]);
    setSessionId(null);
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === "price") {
      return a.price.amount - b.price.amount;
    }

    return a.total_duration - b.total_duration;
  });

  return (
    <>
      <BackgroundPattern />

      <Header />

      <Box
        component="main"
        sx={{ mx: "auto", maxWidth: 920, px: 3 }}
      >
        {
          !hasConversation && !isLoading &&
          <Box sx={{ pt: 15, pb: 4 }}>
            <WelcomeHero onQuickStart={handleSearch} />
          </Box>
        }

        {
          hasConversation &&
          <Box sx={{ pt: 4 }}>
            <ConversationTimeline messages={messages} />
          </Box>
        }

        <Box sx={{ mb: 3, mt: hasConversation ? 3 : 0 }}>
          <ChatInput
            onSend={handleSearch}
            isLoading={isLoading}
          />
        </Box>

        {
          hasConversation && !isLoading && flights.length > 0 &&
          <Box
            ref={resultsRef}
            sx={{ mb: 3 }}
          >
            <QuickReplies onSelect={handleSearch} />
          </Box>
        }

        {
          hasConversation && !isLoading && flights.length > 0 &&
          <Box sx={{ mb: 3 }}>
            <FilterBar
              cabinClass={cabinClass}
              sortBy={sortBy}
              onCabinChange={handleCabinChange}
              onSortChange={setSortBy}
            />
          </Box>
        }

        {
          isLoading &&
          <Box sx={{ mb: 4 }}>
            <LoadingSkeleton count={3} />
          </Box>
        }

        {
          !isLoading && flights.length > 0 &&
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            {
              sortedFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <FlightCard
                    flight={flight}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))
            }
          </Box>
        }

        {
          !isLoading && hasConversation && flights.length === 0 &&
          <EmptyState onRetry={handleRetry} />
        }
      </Box>

      <FlightDetailPanel
        open={detailsOpen}
        details={offerDetails}
        isLoading={detailsLoading}
        error={detailsError}
        onClose={handleCloseDetails}
      />
    </>
  );
}
