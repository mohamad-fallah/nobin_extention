import type { PropsWithChildren } from "react";
import { Box, Grid, Container } from "@mui/material";

export default function MainSection({ children }: PropsWithChildren) {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Container>
        <Grid container spacing={3} sx={{ height: "100%" }}>
          {children}
        </Grid>
      </Container>
    </Box>
  );
}
