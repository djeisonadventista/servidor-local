
import { ServiceModel } from "../models/servico.model.js";
import type { ServiceDBType } from "../utils/types.js";
import type { Request, Response } from "express";


export const ServicoController = {

    async createServico(req: Request, res: Response) {
        const newService: ServiceDBType = req.body

        if (!newService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de sevico invalidos",
                data: null,
            });
        }

        const createServiceResponse = await ServiceModel.Create(newService);

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
    },

    async getAll(req: Request, res: Response) {
        const getAllServiceResponse = await ServiceModel.getAll()


        if (!getAllServiceResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "sucess",
            message: "servico buscado com sucesso",
            data: getAllServiceResponse,
        });
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do servico nao fornecido",
                data: null,
            });
        }

        const getServiceResponse = await ServiceModel.get(id as string);

        if (!getServiceResponse) {
            return res.status(404).json({
                status: "error",
                message: "Servico nao encontrado",
                data: null,
            });
        }

        return res.status(200).json({
            status: "sucess",
            message: "servico encontrado com sucesso",
            data: getServiceResponse,
        });
    },

    async update(req: Request, res: Response) {
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

        const updateServiceResponse = await ServiceModel.update(id as string, updatedService)

        if (!updateServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "sucess",
            message: "servico atualizado com sucesso",
            data: updateServiceResponse
        });
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID  obrigatório",
                data: null,
            });
        }

        const deleteServiceResponse = await ServiceModel.delete(id as string)

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
    }
};





