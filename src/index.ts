import express, { type Request, type Response } from "express";
import { router as serviceRouter } from "./routes/servico.route.js";
import { router as usersRouter } from "./routes/users.route.js";
import { router as orcamentoRouter } from "./routes/orcamento.route.js";
import { router as propostaRouter } from "./routes/proposta.route.js";
import { router as prestadorRouter } from "./routes/prestador.route.js";
import { router as prestacaoServicoRouter } from "./routes/prestacao-servico.route.js";
import { router as empresaRouter } from "./routes/empresa.route.js";
import { router as categoriaRouter } from "./routes/categoria.route.js";
import { swaggerSpec} from "./docs/swagger.js"
import swaggerUi from "swagger-ui-express"
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

app.use("/service", serviceRouter)
app.use("/users", usersRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/proposta", propostaRouter)
app.use("/prestador", prestadorRouter)
app.use("/prestacao-servico", prestacaoServicoRouter)
app.use("/empresa", empresaRouter)
app.use("/categoria", categoriaRouter)


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec) )

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});




/*
import router from "./routes";

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(8080, () => {
  console.log("Servidor rodando...");
});

*/