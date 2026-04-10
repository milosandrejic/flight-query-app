import { Clock, Plane, Calendar, ArrowRight } from "lucide-react";

import { Box, Chip, Divider, Typography } from "@mui/material";

import {
  getDayDiff,
  formatDate,
  formatTime,
  formatPrice,
  formatStops,
  formatDuration,
} from "@/utils/format";

import { FlightResult } from "@/types";

import { AirlineLogo } from "@/components/airline-logo";

interface FlightCardProps {
  flight: FlightResult;
  onViewDetails: (id: string) => void;
}

export function FlightCard({ flight, onViewDetails }: FlightCardProps) {
  const firstSegment = flight.segments[0];
  const lastSegment = flight.segments[flight.segments.length - 1];
  const carrierCode = firstSegment.carrier;
  const flightNumber = firstSegment.flight_number;
  const dayDiff = getDayDiff(firstSegment.departing_at, lastSegment.arriving_at);
  const isDirect = flight.stops === 0;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        p: 3,
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      }}
      onClick={() => onViewDetails(flight.id)}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <AirlineLogo code={carrierCode} />

          <Box>
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
              {carrierCode}
            </Typography>

            <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
              {flightNumber}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#6366f1" }}>
            {formatPrice(flight.price.amount, flight.price.currency)}
          </Typography>

          <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
            per person
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
        <Box>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
            {formatTime(firstSegment.departing_at)}
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
            {firstSegment.origin}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, mx: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography sx={{ fontSize: 12, color: "#6b7280", mb: 0.5 }}>
            {formatDuration(flight.total_duration)}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 0.5 }}>
            <Divider sx={{ flex: 1, borderColor: "#d1d5db" }} />

            <Plane
              size={14}
              style={{ color: "#6b7280", transform: "rotate(0deg)" }}
            />

            <Divider sx={{ flex: 1, borderColor: "#d1d5db" }} />
          </Box>

          <Chip
            label={formatStops(flight.stops)}
            size="small"
            sx={{
              mt: 0.5,
              height: 20,
              fontSize: 11,
              fontWeight: 600,
              bgcolor: isDirect ? "#dcfce7" : "#fef3c7",
              color: isDirect ? "#16a34a" : "#d97706",
              "& .MuiChip-label": { px: 1 },
            }}
          />
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
            {formatTime(lastSegment.arriving_at)}
            {
              dayDiff > 0 &&
              <Typography
                component="span"
                sx={{ fontSize: 13, color: "#6b7280", ml: 0.25 }}
              >
                +{dayDiff}
              </Typography>
            }
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
            {lastSegment.destination}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#f3f4f6", mb: 1.5 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Calendar
              size={14}
              style={{ color: "#9ca3af" }}
            />

            <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
              {formatDate(firstSegment.departing_at)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Clock
              size={14}
              style={{ color: "#9ca3af" }}
            />

            <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
              {formatDuration(flight.total_duration)}
            </Typography>
          </Box>
        </Box>

        <Box
          component="button"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onViewDetails(flight.id);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            border: "none",
            bgcolor: "transparent",
            color: "#6366f1",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            p: 0,
            "&:hover": { color: "#4f46e5" },
          }}
        >
          View details
          <ArrowRight size={14} />
        </Box>
      </Box>
    </Box>
  );
}
