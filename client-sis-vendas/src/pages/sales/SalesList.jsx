import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Box,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import api from "../../services/api";
import Toast from "../../components/ui/Toast";

export default function SalesList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState("dinheiro");

  const [openConfirm, setOpenConfirm] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  // 🔍 buscar produtos
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setFiltered(res.data);
    } catch {
      showToast("Erro ao buscar produtos", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔍 busca
  useEffect(() => {
    const result = products.filter((p) =>
      p.nome.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, products]);

  // ➕ adicionar no carrinho
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantidade: 1 }]);
    }
  };

  // ➕➖ quantidade
  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade + delta }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  // ❌ remover
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 💰 total
  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantidade * item.preco,
    0
  );

  const total = subtotal - discount;

  // ✅ finalizar
  const handleFinishSale = async () => {
    try {
      await api.post("/sales", {
        itens: cart,
        total,
        desconto: discount,
        pagamento: payment,
      });

      showToast("Venda realizada com sucesso");
      setOpenConfirm(false);
      setCart([]);
      setDiscount(0);
    } catch {
      showToast("Erro ao finalizar venda", "error");
    }
  };

  // 🖨️ imprimir
  const handlePrint = () => {
    const content = `
      <h2>Recibo</h2>
      ${cart
        .map(
          (item) =>
            `<p>${item.nome} x${item.quantidade} - R$ ${
              item.preco * item.quantidade
            }</p>`
        )
        .join("")}
      <hr/>
      <p>Total: R$ ${total.toFixed(2)}</p>
    `;

    const win = window.open("", "", "width=300,height=600");
    win.document.write(content);
    win.print();
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* PRODUTOS */}
        <Grid item xs={7}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Produtos</Typography>

            <TextField
              fullWidth
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2 }}
            />

            {filtered.map((product) => (
              <Box
                key={product.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1,
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <Typography>{product.nome}</Typography>
                  <Typography variant="body2">
                    R$ {product.preco}
                  </Typography>
                </div>

                <Button
                  variant="contained"
                  onClick={() => addToCart(product)}
                >
                  Adicionar
                </Button>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* CARRINHO */}
        <Grid item xs={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Carrinho</Typography>

            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  p: 1,
                }}
              >
                <div>
                  <Typography>{item.nome}</Typography>
                  <Typography variant="body2">
                    R$ {item.preco}
                  </Typography>
                </div>

                <div>
                  <IconButton onClick={() => updateQuantity(item.id, -1)}>
                    <RemoveIcon />
                  </IconButton>

                  {item.quantidade}

                  <IconButton onClick={() => updateQuantity(item.id, 1)}>
                    <AddIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => removeItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Box>
            ))}

            {/* DESCONTO */}
            <TextField
              label="Desconto"
              type="number"
              fullWidth
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              sx={{ mt: 2 }}
            />

            {/* PAGAMENTO */}
            <TextField
              select
              label="Forma de pagamento"
              fullWidth
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              sx={{ mt: 2 }}
            >
              <MenuItem value="dinheiro">Dinheiro</MenuItem>
              <MenuItem value="cartao">Cartão</MenuItem>
              <MenuItem value="pix">Pix</MenuItem>
            </TextField>

            {/* TOTAL */}
            <Box mt={2}>
              <Typography>Subtotal: R$ {subtotal.toFixed(2)}</Typography>
              <Typography variant="h6">
                Total: R$ {total.toFixed(2)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setOpenConfirm(true)}
            >
              Finalizar Venda
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* CONFIRMAR VENDA */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirmar Venda</DialogTitle>

        <DialogContent>
          <Typography>
            Total: <strong>R$ {total.toFixed(2)}</strong>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>

          <Button variant="contained" onClick={handleFinishSale}>
            Confirmar
          </Button>

          <Button onClick={handlePrint}>Imprimir</Button>
        </DialogActions>
      </Dialog>

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