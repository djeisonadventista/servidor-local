import type { Request, Response } from "express"
import { PropostaModel } from "../models/proposta.model.js"
import type { PropostaDBType } from "../utils/types.js"


export const PropostaController = {
    async create(req: Request, res: Response) {
        try {
            const propostaData = req.body as PropostaDBType
            const propostaResponse = await PropostaModel.create(propostaData)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao criar proposta" })

            return res.status(201).json({ message: "Proposta criada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao criar proposta" })
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const propostaResponse = await PropostaModel.getAll()

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao buscar propostas" })

            return res.status(200).json({ message: "Propostas encontradas com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao buscar propostas" })
        }
    },

    async get(req: Request, res: Response) {
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

    async update(req: Request, res: Response) {
        const { id } = req.params
        try {
            const propostaData = req.body as PropostaDBType
            const propostaResponse = await PropostaModel.update(id as string, propostaData)

            if (!propostaResponse) return res.status(400).json({ message: "Erro ao atualizar proposta" })

            return res.status(200).json({ message: "Proposta atualizada com sucesso", propostaResponse })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Erro ao atualizar proposta" })
        }
    },

    // trabalho final..................................................
//ACEITAR PROPOSTA (CASCATA)

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

        const result = await PropostaModel.aceitarProposta(id);

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
    }
}


