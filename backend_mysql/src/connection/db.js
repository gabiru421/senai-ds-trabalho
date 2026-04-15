import sql from "mysql2"

export const db = sql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "sql10823122",
    password: "6mdbeF2mE6",
    database: "sql10823122"
})

db.connect((err) => {
    if (err) {
        console.error("❌ Erro ao conectar no banco:", err.message)
        return
    }

    console.log("✅ Banco de dados conectado com sucesso!")
})