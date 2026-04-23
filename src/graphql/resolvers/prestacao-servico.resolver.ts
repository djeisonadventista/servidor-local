
import { EmpresaModel } from "../../models/empresa.model.js";
import { OrcamentoModel } from "../../models/orcamento.model.js";
import { PrestacaoServicoModel } from "../../models/prestacao-servico.model.js";
import { PrestadorModel } from "../../models/prestador.model.js";
import { ServiceModel } from "../../models/servico.model.js";
import { UsersModel } from "../../models/users.model.js";
import type { PrestacaoServicoDBType } from "../../utils/types.js";

export const prestacaoServicoResolver = {
    Query: {
        getAllPrestacaoServico: async () => {
            return await PrestacaoServicoModel.getAll();
        },

        getPrestacaoServicoById: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.get(args.id);
        }
    },
    Mutation: {
        createPrestacaoServico: async (_: any, args: { prestacaoServico: PrestacaoServicoDBType }) => {
            return await PrestacaoServicoModel.create(args.prestacaoServico);
        },
        updatePrestacaoServico: async (_: any, args: { id: string, prestacaoServico: PrestacaoServicoDBType }) => {
            return await PrestacaoServicoModel.update(args.id, args.prestacaoServico);
        },
        deletePrestacaoServico: async (_: any, args: { id: string }) => {
            return await PrestacaoServicoModel.delete(args.id);
        }
    },

    // Relacionamento entre PrestacaoServico, prestador, utilizador,  Service, orcamento e empresa
    PrestacaoServico: {
        prestador: async (parent: { id: string }) => {
            return await PrestadorModel.get(parent.id);
        },

        utilizador: async (parent: { id: string }) => {
            return await UsersModel.get(parent.id);
        },

        service: async (parent: { id: string }) => {
            return await ServiceModel.get(parent.id);
        },

        orcamento: async (parent: { id: string }) => {
            return await OrcamentoModel.get(parent.id);
        },

        empresa: async (parent: { id: string }) => {
            return await EmpresaModel.get(parent.id);
        }
    }

}
