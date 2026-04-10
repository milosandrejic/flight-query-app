import {
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
} from "@mui/material";

import { SortBy, CabinClass } from "@/types";

const CABIN_OPTIONS: { value: CabinClass; label: string }[] = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "price", label: "Price" },
  { value: "duration", label: "Duration" },
];

interface FilterBarProps {
  cabinClass: CabinClass;
  sortBy: SortBy;
  onCabinChange: (cabin: CabinClass) => void;
  onSortChange: (sort: SortBy) => void;
}

export function FilterBar({ cabinClass, sortBy, onCabinChange, onSortChange }: FilterBarProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
          Cabin:
        </Typography>

        <FormControl size="small">
          <Select
            value={cabinClass}
            onChange={(e) => onCabinChange(e.target.value as CabinClass)}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#111827",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiSelect-select": { py: 0.5, pl: 0.5, pr: 3 },
            }}
          >
            {
              CABIN_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ fontSize: 14 }}
                >
                  {option.label}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
          Sort by:
        </Typography>

        <FormControl size="small">
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#111827",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiSelect-select": { py: 0.5, pl: 0.5, pr: 3 },
            }}
          >
            {
              SORT_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ fontSize: 14 }}
                >
                  {option.label}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
