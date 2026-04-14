import type { Request, Response } from "express"
import type { PrestadorDBType, ResponseType } from "../utils/types.js"
import { PrestadorModel } from "../models/prestador.model.js"

export const PrestadorController = {
    async create(req: Request, res: Response) {
        const prestador: PrestadorDBType = req.body

        if (!prestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestador invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const createPrestadorResponse: PrestadorDBType | null = await PrestadorModel.create(prestador)

        if (!createPrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar prestador",
                data: null
            };
            return res.status(500).json(response);
        }

        const response: ResponseType<PrestadorDBType> = {
            status: "success",
            message: "Prestador criado com sucesso",
            data: createPrestadorResponse
        }
        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestadoresResponse: PrestadorDBType[] | null = await PrestadorModel.getAll()

        if (!getAllPrestadoresResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar prestadores",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<PrestadorDBType[]> = {
            status: "success",
            message: "Prestadores buscados com sucesso",
            data: getAllPrestadoresResponse
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

        const getPrestadorByIdResponse = await PrestadorModel.get(id as string)

        if (!getPrestadorByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestador nao encontrado",
                data: null
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<PrestadorDBType> = {
            status: "success",
            message: "Prestador encontrado com sucesso",
            data: getPrestadorByIdResponse
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedPrestador: PrestadorDBType = req.body

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            };
            return res.status(400).json(response);
        }

        if (!updatedPrestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de prestador invalidos",
                data: null
            };
            return res.status(400).json(response);
        }

        const updatePrestadorResponse = await PrestadorModel.update(id as string, updatedPrestador)

        if (!updatePrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar prestador",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<PrestadorDBType> = {
            status: "success",
            message: "Prestador atualizado com sucesso",
            data: updatePrestadorResponse
        };
        return res.status(200).json(response);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            };
            return res.status(400).json(response);
        }

        const deletePrestadorResponse = await PrestadorModel.delete(id as string)

        if (!deletePrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar prestador",
                data: null
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<PrestadorDBType> = {
            status: "success",
            message: "Prestador apagado com sucesso",
            data: deletePrestadorResponse
        };
        return res.status(200).json(response);
    }
}
