import { Box, Divider, Skeleton } from "@mui/material";

interface LoadingSkeletonProps {
  count?: number;
}

export function LoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {
        Array.from({ length: count }).map((_, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: "#fff",
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              p: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Skeleton
                  variant="rounded"
                  width={40}
                  height={40}
                  sx={{ borderRadius: 1.5 }}
                />

                <Box>
                  <Skeleton
                    width={60}
                    height={20}
                  />

                  <Skeleton
                    width={45}
                    height={16}
                  />
                </Box>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Skeleton
                  width={70}
                  height={28}
                />

                <Skeleton
                  width={55}
                  height={14}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
              <Box>
                <Skeleton
                  width={55}
                  height={30}
                />

                <Skeleton
                  width={30}
                  height={16}
                />
              </Box>

              <Box sx={{ flex: 1, mx: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Skeleton
                  width={50}
                  height={14}
                />

                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={2}
                  sx={{ my: 0.5 }}
                />

                <Skeleton
                  variant="rounded"
                  width={45}
                  height={20}
                  sx={{ borderRadius: 1 }}
                />
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Skeleton
                  width={55}
                  height={30}
                />

                <Skeleton
                  width={30}
                  height={16}
                />
              </Box>
            </Box>

            <Divider sx={{ borderColor: "#f3f4f6", mb: 1.5 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Skeleton
                  width={90}
                  height={16}
                />

                <Skeleton
                  width={60}
                  height={16}
                />
              </Box>

              <Skeleton
                width={80}
                height={16}
              />
            </Box>
          </Box>
        ))
      }
    </Box>
  );
}
