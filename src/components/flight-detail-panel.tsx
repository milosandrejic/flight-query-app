"use client";

import {
  X,
  Clock,
  Plane,
  Luggage,
  Briefcase,
} from "lucide-react";

import {
  Box,
  Chip,
  Drawer,
  Divider,
  Skeleton,
  Typography,
  IconButton,
} from "@mui/material";

import {
  formatTime,
  formatDate,
  formatPrice,
  formatDuration,
  formatIsoDuration,
} from "@/utils/format";

import { OfferDetailsResponse } from "@/types";

import { AirlineLogo } from "@/components/airline-logo";

interface FlightDetailPanelProps {
  open: boolean;
  details: OfferDetailsResponse | null;
  isLoading: boolean;
  error: boolean;
  onClose: () => void;
}

export function FlightDetailPanel({ open, details, isLoading, error, onClose }: FlightDetailPanelProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 460 },
            p: 3,
            borderRadius: { xs: 0, sm: "16px 0 0 16px" },
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
          Flight details
        </Typography>

        <IconButton
          onClick={onClose}
          size="small"
        >
          <X size={20} />
        </IconButton>
      </Box>

      {
        isLoading &&
        <LoadingState />
      }

      {
        error && !isLoading &&
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
            Failed to load flight details.
          </Typography>
        </Box>
      }

      {
        details && !isLoading && !error &&
        <DetailContent
          details={details}
          onClose={onClose}
        />
      }
    </Drawer>
  );
}

function LoadingState() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Skeleton
        variant="rounded"
        height={80}
      />

      <Skeleton
        variant="rounded"
        height={200}
      />

      <Skeleton
        variant="rounded"
        height={120}
      />

      <Skeleton
        variant="rounded"
        height={100}
      />
    </Box>
  );
}

function DetailContent({ details }: { details: OfferDetailsResponse; onClose: () => void }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <PriceHeader details={details} />

      <Divider />

      {
        details.slices.map((slice, i) => (
          <Box key={i}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#6b7280", mb: 1.5 }}>
              {slice.origin} → {slice.destination}
              {
                slice.duration &&
                <Box
                  component="span"
                  sx={{ fontWeight: 400, ml: 1 }}
                >
                  · {formatIsoDuration(slice.duration)}
                </Box>
              }
            </Typography>

            {
              slice.segments.map((seg, j) => (
                <SegmentRow
                  key={j}
                  segment={seg}
                  isLast={j === slice.segments.length - 1}
                  nextSegment={j < slice.segments.length - 1 ? slice.segments[j + 1] : null}
                />
              ))
            }

            {
              i < details.slices.length - 1 &&
              <Divider sx={{ mt: 2 }} />
            }
          </Box>
        ))
      }

      <Divider />

      <PriceBreakdown details={details} />

      <Divider />

      <BaggageSection details={details} />

      {
        details.conditions &&
        <>
          <Divider />

          <ConditionsSection details={details} />
        </>
      }
    </Box>
  );
}

function PriceHeader({ details }: { details: OfferDetailsResponse }) {
  const firstSlice = details.slices[0];
  const firstSeg = firstSlice?.segments[0];

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {
          firstSeg &&
          <AirlineLogo code={firstSeg.carrier} />
        }

        <Box>
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
            {details.owner_name || firstSeg?.carrier || "Airline"}
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
            {firstSeg?.flight_number}
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#6366f1" }}>
        {formatPrice(details.price.total, details.price.currency)}
      </Typography>
    </Box>
  );
}

interface SegmentRowProps {
  segment: OfferDetailsResponse["slices"][0]["segments"][0];
  isLast: boolean;
  nextSegment: OfferDetailsResponse["slices"][0]["segments"][0] | null;
}

function SegmentRow({ segment, isLast, nextSegment }: SegmentRowProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
          mb: isLast ? 0 : 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 0.5, minWidth: 20 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "#6366f1",
            }}
          />

          <Box
            sx={{
              width: 2,
              flex: 1,
              bgcolor: "#e5e7eb",
              my: 0.5,
              minHeight: 40,
            }}
          />

          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: isLast ? "#6366f1" : "#d1d5db",
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
                {formatTime(segment.departing_at)}
              </Typography>

              <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
                {segment.origin_city_name ? `${segment.origin_city_name} (${segment.origin})` : segment.origin} · {formatDate(segment.departing_at)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Plane size={14} color="#6366f1" />

              <Typography sx={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}>
                {segment.flight_number}
              </Typography>
            </Box>
          </Box>

          {
            segment.duration &&
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
              <Clock size={13} color="#9ca3af" />

              <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>
                {formatIsoDuration(segment.duration)}
              </Typography>

              {
                segment.aircraft &&
                <Typography sx={{ fontSize: 12, color: "#9ca3af", ml: 1 }}>
                  · {segment.aircraft}
                </Typography>
              }
            </Box>
          }

          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
              {formatTime(segment.arriving_at)}
            </Typography>

            <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
              {segment.destination_city_name ? `${segment.destination_city_name} (${segment.destination})` : segment.destination} · {formatDate(segment.arriving_at)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {
        !isLast && nextSegment &&
        <LayoverIndicator
          arriving={segment.arriving_at}
          departing={nextSegment.departing_at}
          airport={segment.destination}
        />
      }
    </>
  );
}

interface LayoverIndicatorProps {
  arriving: string;
  departing: string;
  airport: string;
}

function LayoverIndicator({ arriving, departing, airport }: LayoverIndicatorProps) {
  const arrMs = new Date(arriving).getTime();
  const depMs = new Date(departing).getTime();
  const layoverMinutes = Math.round((depMs - arrMs) / 60000);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        ml: 4.5,
        my: 1.5,
        py: 1,
        px: 1.5,
        bgcolor: "#fef3c7",
        borderRadius: 2,
      }}
    >
      <Clock size={14} color="#d97706" />

      <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#d97706" }}>
        {formatDuration(layoverMinutes)} layover in {airport}
      </Typography>
    </Box>
  );
}

function PriceBreakdown({ details }: { details: OfferDetailsResponse }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#111827", mb: 1.5 }}>
        Price breakdown
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Row
          label="Base fare"
          value={formatPrice(details.price.base, details.price.currency)}
        />

        {
          details.price.tax != null &&
          <Row
            label="Taxes & fees"
            value={formatPrice(details.price.tax, details.price.currency)}
          />
        }

        <Divider sx={{ my: 0.5 }} />

        <Row
          label="Total"
          value={formatPrice(details.price.total, details.price.currency)}
          bold
        />
      </Box>
    </Box>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography sx={{ fontSize: 13, color: bold ? "#111827" : "#6b7280", fontWeight: bold ? 700 : 400 }}>
        {label}
      </Typography>

      <Typography sx={{ fontSize: 13, color: bold ? "#111827" : "#374151", fontWeight: bold ? 700 : 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

function BaggageSection({ details }: { details: OfferDetailsResponse }) {
  const passenger = details.passengers[0];

  if (!passenger || passenger.baggages.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#111827", mb: 1.5 }}>
        Baggage allowance
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {
          passenger.baggages.map((bag, i) => {
            const isCarryOn = bag.type === "carry_on";

            return (
              <Box
                key={i}
                sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
              >
                {isCarryOn ? <Briefcase size={16} color="#6b7280" /> : <Luggage size={16} color="#6b7280" />}

                <Typography sx={{ fontSize: 13, color: "#374151" }}>
                  {bag.quantity}x {isCarryOn ? "Carry-on" : "Checked bag"}
                  {bag.max_weight_kg ? ` (${bag.max_weight_kg}kg)` : ""}
                </Typography>
              </Box>
            );
          })
        }
      </Box>
    </Box>
  );
}

function ConditionsSection({ details }: { details: OfferDetailsResponse }) {
  const { conditions } = details;
  const items: { label: string; allowed: boolean; penalty: string | null }[] = [];

  if (conditions.change_before_departure) {
    items.push({
      label: "Changes",
      allowed: conditions.change_before_departure.allowed,
      penalty: conditions.change_before_departure.penalty_amount,
    });
  }

  if (conditions.refund_before_departure) {
    items.push({
      label: "Refund",
      allowed: conditions.refund_before_departure.allowed,
      penalty: conditions.refund_before_departure.penalty_amount,
    });
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#111827", mb: 1.5 }}>
        Conditions
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        {
          items.map((item, i) => (
            <Chip
              key={i}
              label={`${item.label}: ${item.allowed ? "Allowed" : "Not allowed"}${item.penalty ? ` (${item.penalty})` : ""}`}
              size="small"
              sx={{
                bgcolor: item.allowed ? "#ecfdf5" : "#fef2f2",
                color: item.allowed ? "#059669" : "#dc2626",
                fontSize: 12,
                fontWeight: 600,
              }}
            />
          ))
        }
      </Box>
    </Box>
  );
}
