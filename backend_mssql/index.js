import express from 'express';
import cors from 'cors';
import routes from './src/routes/routes.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => {
    console.log("Executando o get do backend!!!")
    res.json("Executando o get do backend!!!")
})

routes(app);

app.listen(8800, ()=>{
    console.log("Backend executando!")
})
  