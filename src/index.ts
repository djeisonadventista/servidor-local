import express, { type Request, type Response } from "express";
import { router as serviceRouter } from "./routes/servico.route.js";
import { router as usersRouter } from "./routes/users.route.js";
import { router as orcamentoRouter } from "./routes/orcamento.route.js";
import { router as propostaRouter } from "./routes/proposta.route.js";


const app = express();
app.use(express.json());

app.use("/service", serviceRouter);
app.use("/users", usersRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/proposta", propostaRouter)








app.get("/", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
});


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
