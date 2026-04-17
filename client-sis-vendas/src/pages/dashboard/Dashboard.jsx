// src/pages/dashboard/Dashboard.jsx
import { Grid, Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Produto A", vendas: 120 },
  { name: "Produto B", vendas: 90 },
  { name: "Produto C", vendas: 60 },
];

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper sx={{ p: 2 }}>
          <Typography>Mais vendido</Typography>
          <Typography variant="h6">Produto A</Typography>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper sx={{ p: 2 }}>
          <Typography>Menor estoque</Typography>
          <Typography variant="h6">Produto X</Typography>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper sx={{ p: 2 }}>
          <Typography>Maior estoque</Typography>
          <Typography variant="h6">Produto Y</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography>Vendas</Typography>

          <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vendas" />
          </BarChart>

        </Paper>
      </Grid>
    </Grid>
  );
}