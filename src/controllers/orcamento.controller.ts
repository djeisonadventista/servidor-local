import type { Request, Response } from "express";
import {
    calcularOrcamento,
    selecionarServico,
    selecionarPrestador,
    criarPrestadorDeServico,
    editarPrestadorDeServico,
    apagarPrestadorDeServico,
} from "../orcamento.js";

export const OrcamentoController = {

    async calcular(req: Request, res: Response) {
        const { pedido } = req.body;

        if (!pedido) {
            return res.status(400).json({
                status: "error",
                message: "Pedido é obrigatório",
                data: null,
            });
        }

        const total = calcularOrcamento(pedido);

        return res.status(200).json({
            status: "success",
            message: "Orçamento calculado com sucesso",
            data: total,
        });
    },

    async selecionarServico(req: Request, res: Response) {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({
                status: "error",
                message: "Nome do serviço é obrigatório",
                data: null,
            });
        }

        const response = selecionarServico(nome);

        return res.status(200).json({
            status: "success",
            message: "Serviço selecionado com sucesso",
            data: response,
        });
    },

    async selecionarPrestador(req: Request, res: Response) {
        const { nome } = req.body;

        const response = selecionarPrestador(nome);

        return res.status(200).json({
            status: "success",
            message: "Prestador selecionado com sucesso",
            data: response,
        });
    },

    async criarPrestador(req: Request, res: Response) {
        const prestador = req.body;

        const response = criarPrestadorDeServico(prestador);

        return res.status(200).json({
            status: "success",
            message: "Prestador criado com sucesso",
            data: response,
        });
    },

    async editarPrestador(req: Request, res: Response) {
        const { nomePrestador, novosDadosDoPrestador } = req.body;

        const response = editarPrestadorDeServico(
            nomePrestador,
            novosDadosDoPrestador
        );

        return res.status(200).json({
            status: "success",
            message: "Prestador editado com sucesso",
            data: response,
        });
    },

    async apagarPrestador(req: Request, res: Response) {
        const { nomePrestador } = req.query;

        const response = apagarPrestadorDeServico(nomePrestador as string);

        return res.status(200).json({
            status: "success",
            message: "Prestador apagado com sucesso",
            data: response,
        });
    }
};