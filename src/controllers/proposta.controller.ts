import type { Request, Response } from "express"
import { PropostaModel } from "../models/proposta.model.js"
import type { PropostaDBType, ResponseType } from "../utils/types.js"


export const PropostaController = {
    async create(req: Request, res: Response) {
        const proposta: PropostaDBType = req.body

        if (!proposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const createPropostaResponse: PropostaDBType | null = await PropostaModel.create(proposta)

        if (!createPropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            };
            return res.status(500).json(response);
        }

        const response: ResponseType<PropostaDBType> = {
            status: "success",
            message: "Proposta criada com sucesso",
            data: createPropostaResponse
        };
        return res.status(201).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllPropostasResponse: PropostaDBType[] | null = await PropostaModel.getAll()

        if (!getAllPropostasResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar propostas",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PropostaDBType[]> = {
            status: "success",
            message: "Propostas buscadas com sucesso",
            data: getAllPropostasResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            };
            return res.status(400).json(response);
        }

        const getPropostaByIdResponse = await PropostaModel.get(id as string)

        if (!getPropostaByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Proposta nao encontrada",
                data: null
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<PropostaDBType> = {
            status: "success",
            message: "Proposta encontrada com sucesso",
            data: getPropostaByIdResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedProposta: PropostaDBType = req.body

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            };
            return res.status(400).json(response);
        }

        if (!updatedProposta) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de proposta invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const updatePropostaResponse = await PropostaModel.update(id as string, updatedProposta)

        if (!updatePropostaResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar proposta",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<PropostaDBType> = {
            status: "success",
            message: "Proposta atualizada com sucesso",
            data: updatePropostaResponse
        };
        return res.status(200).json(response);
    },

    // trabalho final..................................................
    //ACEITAR PROPOSTA 

    async aceitar(req: Request, res: Response) {
        const { id } = req.params;
        try {

            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID obrigatório",
                    data: null
                };
                return res.status(400).json(response);
            }

            const propostaAceitadoResponse = await PropostaModel.aceitarProposta(id as string);

            if (!propostaAceitadoResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao aceitar proposta",
                    data: null
                };
                return res.status(400).json(response);
            }

            const response: ResponseType<PropostaDBType> = {
                status: "success",
                message: "Proposta aceite com sucesso",
                data: propostaAceitadoResponse
            };
            return res.status(200).json(response);

        } catch (error) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro interno",
                data: null
            };
            return res.status(500).json(response);
        }
    },


    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaResponse = await PropostaModel.delete(id as string)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao deletar proposta" })

            return res.status(200).json({ message: "Proposta deletada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao deletar proposta" })
        }
    },

    // trabalho final..................................................

    async getByPrestacaoServico(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaResponse = await PropostaModel.get(id as string)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao buscar proposta" })

            return res.status(200).json({ message: "Proposta encontrada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao buscar proposta" })
        }
    },

}


