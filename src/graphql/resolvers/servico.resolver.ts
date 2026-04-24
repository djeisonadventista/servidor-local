
import { ServiceModel } from "../../models/servico.model.js";
import type { ServiceDBType, ServicoDBType } from "../../utils/types.js";
import { CategoriaModel } from "../../models/categoria.model.js";

export const serviceResolver = {
    Query: {
        getAllService: async () => {
            return await ServiceModel.getAll();
        },

        getServiceById: async (_: any, args: { id: string }) => {
            return await ServiceModel.get(args.id);
        }
    },
    Mutation: {
        createService: async (_: any, args: { nome: string, descricao: string, categoria: string, enabled_at: boolean }) => {
            const service: ServiceDBType = {
                id: "",
                nome: args.nome,
                descricao: args.descricao,
                categoria: args.categoria,
                enabled_at: args.enabled_at,
                created_at: "",
                updated_at: ""
            }
            return await ServiceModel.create(service);
        },

        updateService: async (_: any, args: { id: string, service: ServiceDBType }) => {
            return await ServiceModel.update(args.id, args.service);
        },

        deleteService: async (_: any, args: { id: string }) => {
            return await ServiceModel.delete(args.id);
        },
    },

    // Relacionamento entre Service e Categoria
    Servico: {
        categoria: async (parent: { id: string }) => {
            return await CategoriaModel.get(parent.id);
        }
    }
}
