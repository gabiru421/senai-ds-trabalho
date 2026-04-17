// src/pages/dashboard/Dashboard.jsx
import { Grid, Paper, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Mais vendido</Typography>
          <Typography variant="h5">Produto A</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Menor estoque</Typography>
          <Typography variant="h5">Produto X</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Maior estoque</Typography>
          <Typography variant="h5">Produto Y</Typography>
        </Paper>
      </Grid>

    </Grid>
  );
}