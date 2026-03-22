import type { Request, Response } from "express";
import { createPropostas, getPropostas, getPropostasById } from "../proposta.js";

export const PropostaController = {

    async create(req: Request, res: Response) {
        const proposta = req.body;

        if (!proposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados da proposta inválidos",
                data: null,
            });
        }

        console.log("Dados recebidos:", proposta);

        const createResponse = await createPropostas(
            proposta.id,
            proposta.id_prestacao_servico,
            proposta.preco_hora,
            proposta.horas_estimadas,
            proposta.estado,
            proposta.enabled,
        );

        return res.status(200).json({
            status: "success",
            message: "Proposta criada com sucesso",
            data: createResponse,
        });
    },

    async getAll(req: Request, res: Response) {
        const propostas = await getPropostas();

        if (!propostas) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar propostas",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Propostas encontradas com sucesso",
            data: propostas,
        });
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;

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
                message: "Proposta não encontrada",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta encontrada com sucesso",
            data: proposta,
        });
    }
};