import express from "express"
import { getAllVendas, addVendas, updateVendas, deleteVendas } from "../controller/vendas.contoller.js"

const router = express.Router()

router.get("/vendas", getAllVendas)
router.post("/vendas", addVendas)
router.put("/vendas/:id", updateVendas)
router.delete("/vendas/:id", deleteVendas)


export default router