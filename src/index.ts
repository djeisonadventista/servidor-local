import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js";
import { apagarPrestadorDeServico, calcularOrcamento, criarPrestadorDeServico, editarPrestadorDeServico, selecionarPrestador, selecionarServico } from "./orcamento.js";
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


//rota para selecionar servico
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body;
    const selecionarServicoResponse = selecionarServico(nome as string);
    res.json({ selecionarServicoResponse });
})


//rota para selecionar prestador de servico pelo nome
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nome } = req.body;
    const selecionarPrestadorResponse = selecionarPrestador(nome as string);
    res.json({
        status: selecionarPrestadorResponse,
        message: "Prestador selecionado com sucesso!"
    });
})


//Rota para criar prestador de serviço
app.post("/criar-prestador", (req: Request, res: Response) => {
    const novoPrestador = req.body;
    const criarPrestadorResponse = criarPrestadorDeServico(novoPrestador);
    res.json(criarPrestadorResponse);
})


//Rota para editar prestador de serviço
app.put("/editar-prestador", (req: Request, res: Response) => {
    const { nomePrestador, novosDadosDoPrestador } = req.body;
    const editarPrestadorResponse = editarPrestadorDeServico(nomePrestador as string, novosDadosDoPrestador );
    res.json(editarPrestadorResponse);
});

//Rota para apagar prestador de serviço
app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nomePrestador } = req.query;
    if (nomePrestador) {
    const apagarPrestadorResponse = apagarPrestadorDeServico(nomePrestador as string);
    res.json(apagarPrestadorResponse);
    }
});


//rota para calcular orçamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body;
    const calcularOrcamentoResponse = calcularOrcamento(pedido);
    res.json({
        message: "Orcamento calculado com sucesso!",
        orcamentoTotal: calcularOrcamentoResponse
    });
})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});