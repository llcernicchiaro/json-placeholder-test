import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Router from "router";

function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        paddingTop: 4,
        overflow: "auto",
      }}
    >
      <Container>
        <CssBaseline />
        <Router />
      </Container>
    </Box>
  );
}

export default App;
