import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../services/api";
import Toast from "../../components/ui/Toast";

export default function Reports() {
  const [sales, setSales] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  // 📥 buscar vendas
  const fetchSales = async () => {
    try {
      const res = await api.get("/sales");
      setSales(res.data);
      setFiltered(res.data);
    } catch {
      showToast("Erro ao buscar vendas", "error");
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // 🔍 filtro por data
  const handleFilter = () => {
    let result = [...sales];

    if (startDate) {
      result = result.filter((s) => new Date(s.data) >= new Date(startDate));
    }

    if (endDate) {
      result = result.filter((s) => new Date(s.data) <= new Date(endDate));
    }

    setFiltered(result);
  };

  // 📊 KPIs
  const totalVendido = filtered.reduce((sum, s) => sum + s.total, 0);
  const totalVendas = filtered.length;
  const ticketMedio =
    totalVendas > 0 ? totalVendido / totalVendas : 0;

  // 📤 export CSV
  const exportCSV = () => {
    const csv = [
      ["ID", "Data", "Total", "Pagamento"],
      ...filtered.map((s) => [
        s.id,
        s.data,
        s.total,
        s.pagamento,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio_vendas.csv";
    a.click();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "data",
      headerName: "Data",
      flex: 1,
      renderCell: (params) =>
        new Date(params.value).toLocaleString(),
    },
    { field: "total", headerName: "Total", flex: 1 },
    { field: "pagamento", headerName: "Pagamento", flex: 1 },
  ];

  return (
    <>
      {/* FILTROS */}
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label="Data inicial"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Data final"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleFilter}
            >
              Filtrar
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={exportCSV}
            >
              Exportar CSV
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* KPIs */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Vendido</Typography>
            <Typography variant="h6">
              R$ {totalVendido.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total de Vendas</Typography>
            <Typography variant="h6">
              {totalVendas}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Ticket Médio</Typography>
            <Typography variant="h6">
              R$ {ticketMedio.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* TABELA */}
      <div style={{ height: 500 }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </div>

      {/* TOAST */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
}