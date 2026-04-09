import type { Request, Response } from "express";
import { EstadoProposta, type OrcamentoDBType, type PropostaDBType, type ResponseType } from "../utils/types.js"
import { OrcamentoModel } from "../models/orcamento.model.js"
import { PropostaModel } from "../models/proposta.model.js";
import { PrestacaoServicoModel } from "../models/prestacao-servico.model.js";
import { PrestadorModel } from "../models/prestador.model.js";


export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const orcamento: OrcamentoDBType = req.body

        if (!orcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const createOrcamentoResponse = await OrcamentoModel.create(orcamento)

        if (!createOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentosResponse = await OrcamentoModel.getAll()

        if (!getAllOrcamentosResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentosResponse
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

        const getOrcamentoByIdResponse = await OrcamentoModel.get(id as string)

        if (!getOrcamentoByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedOrcamento: OrcamentoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updatedOrcamento)

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse
        })
    },


    //CALCULAR ORÇAMENTO
    //(CRIAR / COMPLETAR)


    async calculateBudget(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null
            };
            return res.status(400).json(response);
        }

        const prestacaoServico = await PrestacaoServicoModel.getByIdOrcamento(id as string);

        if (!prestacaoServico) {
            const response: ResponseType<null> = {
            
                status: "error",
                message: "Nenhuma prestação de serviço encontrada",
                data: null
            };
        return res.status(404).json(response);
    }


        //fetch all proposal
        const proposals = await PropostaModel.getByPrestacaoServico(prestacaoServico.id);
        if (!proposals) {
            return res.status(404).json({
                status: "error",
                message: "Nenhuma proposta encontrada",
                data: null
            });
        }

        //find accepted proposal
        const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal) => proposal.estado === EstadoProposta.ACEITE);

        if (!acceptedProposal) {
            return res.status(404).json({
                status: "error",
                message: "Nenhuma proposta aceita encontrada",
                data: null
            });
        }

        const precoHora = acceptedProposal.preco_hora;
        const horasEstimadas = acceptedProposal.horas_estimadas;

        //fetch prestador to get urgency tax minimum discount and discount percentage based on attrs in utilts/types.ts
        const prestador = await PrestadorModel.get(acceptedProposal.id_prestador);
        if (!prestador) {
            return res.status(404).json({
                status: "error",
                message: "Prestador não encontrado",
                data: null
            });
        }

        const urgencyTax = prestador.taxa_urgencia;
        const minumumDiscount = prestador.minimo_desconto;
        const discountPercentage = prestador.percentagem_desconto;

        // Calculate the budget based on utils/types.ts
        let subtotal = precoHora * horasEstimadas;

        //if minimum discount is great than discount percentage
        if (subtotal > minumumDiscount) {
            subtotal = subtotal * (1 - discountPercentage);
        }

        if (prestacaoServico.urgente) {
            // adda urgency tax
            subtotal = subtotal * (1 + urgencyTax);
        }

        const updatedOrcamentoResponse = await OrcamentoModel.updateBudget(id as string, subtotal)

        if (!updatedOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao calcular orçamento",
                data: null
            });
        }
        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orçamento calculado com sucesso",
            data: updatedOrcamentoResponse
        };
        return res.status(200).json(response);
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

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error", 
                message: "Erro ao apagar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        })
    }
}
