
import { ServiceModel } from "../models/servico.model.js";
import type { ResponseType, ServiceDBType } from "../utils/types.js";
import type { Request, Response } from "express";


export const ServicoController = {

    async createServico(req: Request, res: Response) {
        const newService: ServiceDBType = req.body

        if (!newService) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de sevico invalidos",
                data: null,
            };
            return res.status(400).json(response);
        }

        const createServiceResponse: ServiceDBType | null = await ServiceModel.create(newService);

        if (!createServiceResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar servico",
                data: null,
            };
            return res.status(400).json(response);
        }

        const responde: ResponseType<ServiceDBType> = {
            status: "success",
            message: "servico criado com sucesso",
            data: createServiceResponse,
        };
        return res.status(200).json(responde);
    },

    async getAll(req: Request, res: Response) {
        const getAllServiceResponse: ServiceDBType[] | null = await ServiceModel.getAll()


        if (!getAllServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servico",
                data: null,
            };
            return res.status(500).json(response);
        }

        const response: ResponseType<ServiceDBType[]> = {
            status: "success",
            message: "Servico buscado com sucesso",
            data: getAllServiceResponse,
        };
        return res.status(200).json(response);
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID do servico nao fornecido",
                data: null,
            };
            return res.status(400).json(response);
        }

        const getServiceResponse = await ServiceModel.get(id as string);

        if (!getServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Servico nao encontrado",
                data: null,
            };
            return res.status(404).json(response);
        }

        const response: ResponseType<ServiceDBType> = {
            status: "success",
            message: "Servico encontrado com sucesso",
            data: getServiceResponse,
        };
        return res.status(200).json(response);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;

        const updatedService: ServiceDBType = req.body

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID é obrigatório",
                data: null,
            };
            return res.status(400).json(response);
        }

        if (!updatedService) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de servico invalido",
                data: null,
            };
            return res.status(400).json(response);
        }

        const updateServiceResponse = await ServiceModel.update(id as string, updatedService)

        if (!updateServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar servico",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<ServiceDBType> = {
            status: "success",
            message: "Servico atualizado com sucesso",
            data: updateServiceResponse
        };
        return res.status(200).json(response);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID  obrigatório",
                data: null,
            };
            return res.status(400).json(response);
        }

        const deleteServiceResponse = await ServiceModel.delete(id as string)

        if (!deleteServiceResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar servico",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<ServiceDBType> = {
            status: "success",
            message: "Servico apagado com sucesso",
            data: deleteServiceResponse
        };
        return res.status(200).json(response);
    },

    async getAllServicoDetalhado(req: Request, res: Response) {
        const { limit, offset } = req.query
        let LIMIT = 10
        let OFFSET = 0

        if (limit) {
            LIMIT = parseInt(limit as string)
        }

        if (offset) {
            OFFSET = parseInt(offset as string)
        }

        const getAllServicoDetalhadoResponse = await ServiceModel.getAllServicoDetalhado(LIMIT, OFFSET)

        if (!getAllServicoDetalhadoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar servicos detalhados",
                data: null,
            };
            return res.status(404).json(response);
        }
    }
}