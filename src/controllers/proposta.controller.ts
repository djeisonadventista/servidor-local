import type { Request, Response } from "express"
import { PropostaModel } from "../models/proposta.model.js"
import type { PropostaDBType, ResponseType } from "../utils/types.js"


export const PropostaController = {
    async create(req: Request, res: Response) {
        const proposta: PropostaDBType = req.body

        if (!proposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const createPropostaResponse: PropostaDBType | null = await PropostaModel.create(proposta)

        if (!createPropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            })
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
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const getPropostaByIdResponse = await PropostaModel.get(id as string)

        if (!getPropostaByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Proposta nao encontrada",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta encontrada com sucesso",
            data: getPropostaByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedProposta: PropostaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados de proposta invalidos",
                data: null
            })
        }

        const updatePropostaResponse = await PropostaModel.update(id as string, updatedProposta)

        if (!updatePropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar proposta",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta atualizada com sucesso",
            data: updatePropostaResponse
        })
    },

    // trabalho final..................................................
    //ACEITAR PROPOSTA 

    async aceitar(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatório",
                    data: null
                });
            }

            const result = await PropostaModel.aceitarProposta(id as string);

            if (!result) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao aceitar proposta",
                    data: null
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Proposta aceite com sucesso",
                data: result
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno",
                data: error
            });
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


