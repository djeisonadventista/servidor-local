import express, { type Request, type Response } from "express";
import {
    adicionarServico,
    apagarServico,
    listarServicos,
    obterServico,
    getServiceById,
    addServiceToDB,
    getAllService,
    updateService,
    deleteService,

} from "./servico.js";
import {
    apagarPrestadorDeServico,
    calcularOrcamento,
    criarPrestadorDeServico,
    editarPrestadorDeServico,
    selecionarPrestador,
    selecionarServico,
} from "./orcamento.js";
import { createUser, getUserById, getUsers } from "./users.js";
import {
    createServicos,
    getServicosById,
    getServicos,
    listaServicos,
} from "./servico.js";
import { createPropostas, getPropostasById, getPropostas } from "./proposta.js";
import { stat } from "node:fs";
import type { ServiceDBType } from "./utils/types.js";
import { generateUUID } from "./utils/uuid.js";
const app = express();
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
});

//rota para adicionar um novo serviço
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body;

    console.log(novoServico);
    const addServicoResponse = adicionarServico(novoServico);
    res.json(addServicoResponse);
});

//rota para listar todos os serviços
app.get("/listar-servicos", (req: Request, res: Response) => {
    const listservicosResponse = listarServicos();
    res.json(listservicosResponse);
});

//rota para apagar um serviço
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query;

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string);

        res.json(apagarServicoResponse);
    } else {
        res.json({
            mensagem: "Nome do serviço é obrigatório.",
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
            mensagem: "Nome do serviço é obrigatório.",
        });
    }
});

//rota para selecionar servico
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body;
    const selecionarServicoResponse = selecionarServico(nome as string);
    res.json({ selecionarServicoResponse });
});

//rota para selecionar prestador de servico pelo nome
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nome } = req.body;
    const selecionarPrestadorResponse = selecionarPrestador(nome as string);
    res.json({
        status: selecionarPrestadorResponse,
        message: "Prestador selecionado com sucesso!",
    });
});

//Rota para criar prestador de serviço
app.post("/criar-prestador", (req: Request, res: Response) => {
    const novoPrestador = req.body;
    const criarPrestadorResponse = criarPrestadorDeServico(novoPrestador);
    res.json(criarPrestadorResponse);
});

//Rota para editar prestador de serviço
app.put("/editar-prestador", (req: Request, res: Response) => {
    const { nomePrestador, novosDadosDoPrestador } = req.body;
    const editarPrestadorResponse = editarPrestadorDeServico(
        nomePrestador as string,
        novosDadosDoPrestador,
    );
    res.json(editarPrestadorResponse);
});

//Rota para apagar prestador de serviço
app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nomePrestador } = req.query;
    const apagarPrestadorResponse = apagarPrestadorDeServico(
        nomePrestador as string,
    );
    res.json(apagarPrestadorResponse);
});

//rota para calcular orçamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body;
    const calcularOrcamentoResponse = calcularOrcamento(pedido);
    res.json({
        message: "Orcamento calculado com sucesso!",
        orcamentoTotal: calcularOrcamentoResponse,
    });
});

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
                data: null,
            });
        }

        res.status(200).json({
            status: "success",
            message: " Utilizador encontrado com sucesso!",
            data: getUserByIdResponse,
        });

        res.json(getUserByIdResponse);
    } else {
        res.json({
            mensagem: "ID do utilizador é obrigatório.",
        });
    }
});

//rota para criar utilizador
app.post("/create-user", async (req: Request, res: Response) => {
    const user = req.body;

    if (!user) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null,
        });
    }

    console.log("Dados recebidos:", user);

    const insertUserResponse = await createUser(
        user.id,
        user.nome,
        user.numero_identidade,
        user.data_nascimento,
        user.email,
        user.password,
        user.telefone,
        user.pais,
        user.localidade,
        user.enebled,
        user.created_at,
        user.updated_at,
    );

    res.json(insertUserResponse);
});

//Rota para criar um novo serviço na base de dados
app.post("/create-servico", async (req: Request, res: Response) => {
    const servico = req.body;

    if (!servico) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null,
        });
    }

    console.log("Dados recebidos:", servico);

    const insertServicoResponse = await createServicos(
        servico.id,
        servico.nome,
        servico.descricao,
        servico.categoria,
        servico.enabled,
    );

    res.json(insertServicoResponse);
});

// Listar todos os serviços
app.get("/get-servicos", async (req: Request, res: Response) => {
    const servicos = await getServicos();
    res.json({
        status: "success",
        message: "Serviços encontrados com sucesso!",
        data: servicos,
    });
});

// Buscar serviço por ID
app.get("/get-servico-id", async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID do serviço é obrigatório",
            data: null,
        });
    }

    const servico = await getServicosById(id as string);

    if (!servico) {
        return res.status(404).json({
            status: "error",
            message: "Serviço não encontrado",
            data: null,
        });
    }

    res.json({
        status: "success",
        message: "Serviço encontrado com sucesso!",
        data: servico,
    });
});

// Rota para listar servicos
app.get("/lista-servicos", async (req: Request, res: Response) => {
    const servicos = await listaServicos();

    res.json({
        status: "success",
        message: "Serviços encontrados com sucesso!",
        data: servicos,
    });
});

//Rota para criar uma nova proposta na base de dados
app.post("/create-proposta", async (req: Request, res: Response) => {
    const proposta = req.body;

    if (!proposta) {
        return res.status(400).json({
            status: "error",
            mensagem: "Campos obrigatórios em falta",
            data: null,
        });
    }

    console.log("Dados recebidos:", proposta);

    const insertPropostaResponse = await createPropostas(
        proposta.id,
        proposta.id_prestacao_servico,
        proposta.preco_hora,
        proposta.horas_estimadas,
        proposta.estado,
        proposta.enabled,
    );

    res.json(insertPropostaResponse);
});

// Listar todos as propostas
app.get("/get-propostas", async (req: Request, res: Response) => {
    const propostas = await getPropostas();

    res.json({
        status: "success",
        message: "propostas encontrados com sucesso!",
        data: propostas,
    });
});

// Buscar proposta por ID
app.get("/get-proposta-id", async (req: Request, res: Response) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID da proposta é obrigatório",
            data: null,
        });
    }

    const proposta = await getPropostasById(id as string);

    if (!proposta) {
        return res.status(404).json({
            status: "error",
            message: "proposta não encontrado",
            data: null,
        });
    }

    res.json({
        status: "success",
        message: "proposta encontrado com sucesso!",
        data: proposta,
    });
});

app.post("/create-servico", async (req: Request, res: Response) => {
    const newService: ServiceDBType = req.body;

    if (!newService) {
        return res.status(400).json({
            status: "error",
            message: "Dados de sevico invalidos",
            data: null,
        });
    }
    console.log(newService);

    const createServiceResponse = await addServiceToDB(newService);

    if (!createServiceResponse === null) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao criar servico",
            data: null,
        });
    }

    res.status(200).json({
        status: "sucess",
        message: "servico criado com sucesso",
        data: createServiceResponse,
    });
});

app.get("/get-service-by-id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null,
        });
    }
    const getServiceByIdResponse = await getServiceById(id as string);

 if (!getServiceByIdResponse) {
        return res.status(404).json({
            status: "error",
            message: "servico não encontrado",
            data: null,
        });
    }

    res.status(200).json({
        status: "sucess",
        message: "servico encontrado com sucesso",
        data: getServiceByIdResponse
    });

})


app.get("/get-all-services", async (req: Request, res: Response) => {
    const getAllServiceResponse = await getAllService();

    if (!getAllServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao selecionar servicos",
            data: null,
        });
    }

    res.status(200).json({
        status: "sucess",
        message: "servico encontrado",
        data: getAllServiceResponse
    });

})

app.put("/update-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

const updatedService: ServiceDBType = req.body

if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID é obrigatório",
            data: null,
        });
    }

    if (!updatedService) {
        return res.status(400).json({
            status: "error",
            message: "Dados de servico invalido",
            data: null,
        });
    }

    const updateServiceResponse = await updateService (id as string, updatedService)

    if (!updateServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao atualizar servico",
            data: null,
        });
    }

    return  res.status(200).json({
        status: "sucess",
        message: "servico atualizado com sucesso",
        data: updateServiceResponse
    });
})


app.delete("/delete-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID  obrigatório",
            data: null,
        });
    }

    const deleteServiceResponse = await deleteService (id as string)

    if (!deleteServiceResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao apagar servico",
            data: null,
        });
    }

        return res.status(200).json({
            status: "sucess",
            message: "Servico apagado com sucesso",
            data: deleteServiceResponse
        });
    })


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
