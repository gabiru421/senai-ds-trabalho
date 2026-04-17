import express from "express"
import { getAllEstoque, addEstoque, updateEstoque, deleteEstoque } from "../controller/estoque.controller.js"

const router = express.Router()

router.get("/estoque", getAllEstoque)
router.post("/estoque", addEstoque)
router.put("/estoque/:id", updateEstoque)
router.delete("/estoque/:id", deleteEstoque)


export default router