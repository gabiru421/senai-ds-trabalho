import express from "express"
import userRoutes from "./src/router/user.router.js"
import produtoRoutes from "./src/router/produto.router.js"
import estoqueRoutes from "./src/router/estoque.router.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", userRoutes)
app.use("/api", produtoRoutes)
app.use("/api", estoqueRoutes)

app.listen(8800, ()=>{
    console.log("Backend executando!")
})