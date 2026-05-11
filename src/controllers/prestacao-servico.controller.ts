import type { Request, Response } from "express"
import type { PrestacaoServicoDBType, PrestacaoServicoByCategoriaType, ResponseType } from "../utils/types.js"
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

        return res.status(200).json(response)
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
const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        if (!updatedPrestacaoServico) {

            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updatePrestacaoServicoResponse = await PrestacaoServicoModel.update(id as string, updatedPrestacaoServico)

        if (!updatePrestacaoServicoResponse) {

const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar prestacao de servico",
                data: null
            }
            return res.status(400).json(response)
        }

const response: ResponseType<PrestacaoServicoDBType> = {
            status: "success",
            message: "Prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse
        }
        return res.status(200).json(response)
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
        const { limit, offset, categoria } = req.query as { limit?: string, offset?: string, categoria?: string }

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)

        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

            if (!categoria) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Categoria obrigatoria",
                    data: null
                };
                return res.status(400).json(response);
            }

        const getAllPrestacaoServicoByCategoriaDetalhadoResponse = await PrestacaoServicoModel.getAllPrestacaoServicoByCategoriaDetalhado(categoria as string, LIMIT, OFFSET)

        if (!getAllPrestacaoServicoByCategoriaDetalhadoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: null
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<PrestacaoServicoByCategoriaType[]> = {
            status: "success",
            message: "Prestacao de servico detalhada buscada com sucesso",
            data: getAllPrestacaoServicoByCategoriaDetalhadoResponse
        };
        return res.status(200).json(response);

    }
}
