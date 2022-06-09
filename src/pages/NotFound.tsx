import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Stack spacing={3}>
      <Typography variant="h3">404 - Página não encontrada</Typography>
      <Link to="/">Volte para a home</Link>
    </Stack>
  );
}

export default NotFound;
