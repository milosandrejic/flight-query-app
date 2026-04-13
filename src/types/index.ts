// --- Enums ---

export type CabinClass = "economy" | "premium_economy" | "business" | "first";
export type SortBy = "price" | "duration";

// --- Request ---

export interface FlightSearchRequest {
  query: string;
}

export interface FollowUpRequest {
  query: string;
}

// --- Parsed query ---

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

export interface ParsedFlightQuery {
  origin: string;
  destination: string;
  departure_date: string;
  return_date: string | null;
  trip_duration_days: number | null;
  passengers: Passengers;
  cabin_class: CabinClass;
  max_stops: number | null;
  airlines: string[] | null;
  baggage_only: boolean | null;
  sort_by: SortBy | null;
}

// --- Flight result ---

export interface Price {
  amount: number;
  currency: string;
}

export interface FlightSegment {
  origin: string;
  destination: string;
  departing_at: string;
  arriving_at: string;
  carrier: string;
  carrier_name: string | null;
  flight_number: string;
  duration: string | null;
}

export interface FlightResult {
  id: string;
  price: Price;
  segments: FlightSegment[];
  total_duration: number;
  stops: number;
}

// --- Response ---

export interface SearchMetadata {
  search_id: string;
  results_count: number;
  search_time_ms: number;
  timestamp: string;
}

export interface FlightSearchResponse {
  session_id: string;
  parsed_query: ParsedFlightQuery;
  results: FlightResult[];
  metadata: SearchMetadata;
}

export interface FollowUpResponse {
  session_id: string;
  parsed_query: ParsedFlightQuery;
  results: FlightResult[];
  metadata: SearchMetadata;
}

// --- Offer details ---

export interface OfferCondition {
  allowed: boolean;
  penalty_amount: string | null;
  penalty_currency: string | null;
}

export interface OfferConditions {
  change_before_departure: OfferCondition | null;
  refund_before_departure: OfferCondition | null;
}

export interface BaggageAllowance {
  type: string;
  quantity: number;
  description: string | null;
  max_weight_kg: number | null;
}

export interface OfferPassenger {
  id: string;
  type: string;
  baggages: BaggageAllowance[];
}

export interface OfferSliceSegment {
  origin: string;
  origin_city_name: string | null;
  destination: string;
  destination_city_name: string | null;
  departing_at: string;
  arriving_at: string;
  carrier: string;
  carrier_name: string | null;
  flight_number: string;
  duration: string | null;
  aircraft: string | null;
}

export interface OfferSlice {
  origin: string;
  destination: string;
  duration: string | null;
  segments: OfferSliceSegment[];
}

export interface PriceBreakdown {
  total: number;
  base: number;
  tax: number | null;
  currency: string;
}

export interface OfferDetailsResponse {
  id: string;
  price: PriceBreakdown;
  conditions: OfferConditions;
  slices: OfferSlice[];
  passengers: OfferPassenger[];
  expires_at: string;
  total_emissions_kg: string | null;
  owner_name: string | null;
}

// --- Conversation (frontend-only) ---

export interface ConversationMessage {
  id: string;
  type: "user" | "system";
  text: string;
  timestamp: Date;
  flights?: FlightResult[];
}
