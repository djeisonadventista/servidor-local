import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico,  listarServicos, obterServico } from "./servico.js";
import { apagarPrestadorDeServico, calcularOrcamento, criarPrestadorDeServico, editarPrestadorDeServico, selecionarPrestador, selecionarServico } from "./orcamento.js";
import { createUser, getUserById, getUsers, } from "./users.js";
import { createServicos, getServicosById, getServicos } from "./servico.js";
import { stat } from "node:fs";
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
    const editarPrestadorResponse = editarPrestadorDeServico(nomePrestador as string, novosDadosDoPrestador);
    res.json(editarPrestadorResponse);
});

//Rota para apagar prestador de serviço
app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nomePrestador } = req.query;
    const apagarPrestadorResponse = apagarPrestadorDeServico(nomePrestador as string);
    res.json(apagarPrestadorResponse);
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

//selecionar todos os utilizadores presentes na base de dados
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers();
    res.json(getUsersResponse);
});

// selecionar um utilizador específico pelo id
app.get("/get-user-id", async (req: Request, res: Response) => {
    const { id } = req.query;
    if (id) {
        const getUserByIdResponse = await getUserById(id as string);

        if (!getUserByIdResponse) {
            res.status(404).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null
            })
        }


        res.status(200).json({
            status: "success",
            message: " Utilizador encontrado com sucesso!",
            data: getUserByIdResponse
        })

        res.json(getUserByIdResponse);
    } else {
        res.json({
            mensagem: "ID do utilizador é obrigatório."
        });
    }
});




// Rota para inserir um novo utilizador na base de dados
//rota para criar utilizador
app.post("/create-user", async (req: Request, res: Response) => {

    const user = req.body;

    if (!user) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null
        });
    }


    console.log("Dados recebidos:", user);

    const insertUserResponse = await createUser(
        user.id,
        user.nome,
        user.numero_identidade,
        user.data_nascimento,
        user.email,
        user.password, user.telefone,
        user.pais,
        user.localidade, user.enebled,
        user.created_at,
        user.updated_at);

    res.json(insertUserResponse);
});


/*

//Rota para criar um novo serviço na base de dados
app.post("/create-servico", async (req: Request, res: Response) => {

    const servico = req.body;

    if (!servico) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null
        });
    }

    console.log("Dados recebidos:", servico);

    const insertServicoResponse = await createServicos(
        servico.id,
        servico.nome,
        servico.descricao,
        servico.categoria,
        servico.enabled
    );

    res.json(insertServicoResponse);
});

*/


// Listar todos os serviços
app.get("/get-servicos", async (req: Request, res: Response) => {
    const servicos = await getServicos();
    res.json({
        status: "success",
        message: "Serviços encontrados com sucesso!",
        data: servicos
    });
});

// Buscar serviço por ID
app.get("/get-servico-id", async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID do serviço é obrigatório",
            data: null
        });
    }

    const servico = await getServicosById(id as string);

    if (!servico) {
        return res.status(404).json({
            status: "error",
            message: "Serviço não encontrado",
            data: null
        });
    }

    res.json({
        status: "success",
        message: "Serviço encontrado com sucesso!",
        data: servico
    });
});

// Criar um novo serviço
app.post("/create-servico", async (req: Request, res: Response) => {
    const servico = req.body;

    if (!servico || !servico.id || !servico.nome || !servico.descricao || !servico.categoria) {
        return res.status(400).json({
            status: "error",
            message: "Campos obrigatórios em falta",
            data: null
        });
    }

    console.log("Dados recebidos:", servico);

    const createServicoResponse = await createServicos(
        servico.id,
        servico.nome,
        servico.descricao,
        servico.categoria,
        servico.enabled
    );

    res.json({
        status: "success",
        message: "Serviço criado com sucesso!",
        data: createServicoResponse
    });
});



app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});