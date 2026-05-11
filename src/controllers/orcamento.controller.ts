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
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orçamento inválidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const createOrcamentoResponse: OrcamentoDBType | null = await OrcamentoModel.create(orcamento)

        if (!createOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar orçamento",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        };
        return res.status(200).json(response);
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentosResponse: OrcamentoDBType[] | null = await OrcamentoModel.getAll()

        if (!getAllOrcamentosResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<OrcamentoDBType[]> = {
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentosResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null
            }
            return res.status(400).json(response)
        }

        const getOrcamentoByIdResponse: OrcamentoDBType | null = await OrcamentoModel.get(id as string)

        if (!getOrcamentoByIdResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Orcamento não encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoByIdResponse
        }
        return res.status(200).json(response)
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedOrcamento: OrcamentoDBType = req.body

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null
            }
            return res.status(400).json(response)
        }

        if (!updatedOrcamento) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados de orçamento inválidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updatedOrcamento)

        if (!updateOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar orçamento",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse
        }
        return res.status(200).json(response)
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
            const response: ResponseType<null> = {
                status: "error",
                message: "Nenhuma proposta encontrada",
                data: null
            };
            return res.status(404).json(response);
        }

        //find accepted proposal
        const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal) => proposal.estado === EstadoProposta.ACEITE);

        if (!acceptedProposal) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Nenhuma proposta aceita encontrada",
                data: null
            };
            return res.status(404).json(response);
        }

        const precoHora = acceptedProposal.preco_hora;
        const horasEstimadas = acceptedProposal.horas_estimadas;

        //fetch prestador to get urgency tax minimum discount and discount percentage based on attrs in utilts/types.ts
        const prestador = await PrestadorModel.get(acceptedProposal.id_prestador);
        if (!prestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Prestador não encontrado",
                data: null
            };
            return res.status(404).json(response);
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
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            };
            return res.status(400).json(response);
        }

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar orçamento",
                data: null
            }
            return res.status(400).json(response)
        }

        const response: ResponseType<OrcamentoDBType> = {
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        };
        return res.status(200).json(response);
    }
}
