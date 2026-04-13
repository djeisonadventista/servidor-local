import type { Request, Response } from "express"
import type { PrestacaoServicoDBType, ResponseType } from "../utils/types.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js"

export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const prestacaoServico: PrestacaoServicoDBType = req.body

        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }


        const createPrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.create(prestacaoServico)

        if (!createPrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "success",
            message: "Prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        };

        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicosResponse: PrestacaoServicoDBType[] | null = await PrestacaoServicoModel.getAll()

        if (!getAllPrestacaoServicosResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PrestacaoServicoDBType[]> = {
            status: "success",
            message: "Prestacoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicosResponse
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
            }
            return res.status(400).json(response)
        }

        const getPrestacaoServicoByIdResponse = await PrestacaoServicoModel.get(id as string)

        if (!getPrestacaoServicoByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "success",
            message: "Prestacao de servico encontrada com sucesso",
            data: getPrestacaoServicoByIdResponse
        }
        return res.status(200).json(response)
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
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const deletePrestacaoServicoResponse = await PrestacaoServicoModel.delete(id as string)

        if (!deletePrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar prestacao de servico",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<PrestacaoServicoDBType> = {
            status: "success",
            message: "Prestacao de servico apagada com sucesso",
            data: deletePrestacaoServicoResponse
        };
        return res.status(200).json(response);
    },

    async getAllPrestacaoServicoDetalhado(req: Request, res: Response) {
        const { limit, offset } = req.query as { limit?: string, offset?: string }

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)

        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

        const getAllPestacaoSerevicoResponse = await PrestacaoServicoModel.getAllPrestacaoServicoDetalhado(LIMIT, OFFSET)

        if (!getAllPestacaoSerevicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestacoes de servico",
                data: null
            };
            return res.status(500).json(response);
        }

        const response: ResponseType<PrestacaoServicoDBType[]> = {
            status: "success",
            message: "Prestacoes de servico detalhadas buscadas com sucesso",
            data: getAllPestacaoSerevicoResponse
        };
        return res.status(200).json(response);

    }
}
