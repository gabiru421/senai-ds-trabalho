import express from "express"
import { getAllProduto, addProduto, updateProduto, deleteProduto } from "../controller/produto.controller.js"

const router = express.Router()

router.get("/produto", getAllProduto)
router.post("/produto", addProduto)
router.put("/produto/:idproduto", updateProduto)
router.delete("/produto/:idproduto", deleteProduto)


export default router