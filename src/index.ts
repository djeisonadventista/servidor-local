import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js";
const app = express();
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
});


//rota para adicionar um novo serviço
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

    console.log(novoServico)
    const addServicoResponse = adicionarServico(novoServico)
    res.json(addServicoResponse)
})

//rota para listar todos os serviços
app.get("/listar-servicos", (req: Request, res: Response) => {
    const listservicosResponse = listarServicos();
    res.json(listservicosResponse)
});

//rota para apagar um serviço
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query;

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string);

        res.json(apagarServicoResponse);
    } else {
        res.json({
            mensagem: "Nome do serviço é obrigatório."
        });
    }
});

//rota para obte serviço específico pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query;
    if (nome) {
        const obterServicoResponse = obterServico(nome as string);
        res.json(obterServicoResponse);
    } else {
        res.json({
            mensagem: "Nome do serviço é obrigatório."
        });
    }
});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});