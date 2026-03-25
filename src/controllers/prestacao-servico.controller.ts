import type { Request, Response } from "express"
import type { PrestacaoServicoDBType } from "../utils/types.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js"

export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const prestacaoServico: PrestacaoServicoDBType = req.body

        if (!prestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            })
        }

        const createPrestacaoServicoResponse = await PrestacaoServicoModel.create(prestacaoServico)

        if (!createPrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar prestacao de servico",
                data: null
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicosResponse = await PrestacaoServicoModel.getAll()

        if (!getAllPrestacaoServicosResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicosResponse
        })
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

        const getPrestacaoServicoByIdResponse = await PrestacaoServicoModel.get(id as string)

        if (!getPrestacaoServicoByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico encontrada com sucesso",
            data: getPrestacaoServicoByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedPrestacaoServico: PrestacaoServicoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            })
        }

        const updatePrestacaoServicoResponse = await PrestacaoServicoModel.update(id as string, updatedPrestacaoServico)

        if (!updatePrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar prestacao de servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deletePrestacaoServicoResponse = await PrestacaoServicoModel.delete(id as string)

        if (!deletePrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar prestacao de servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico apagada com sucesso",
            data: deletePrestacaoServicoResponse
        })
    }
}
