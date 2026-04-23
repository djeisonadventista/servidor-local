
import { ServiceModel } from "../../models/servico.model.js";
import type { ServiceDBType } from "../../utils/types.js";
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
        createService: async (_: any, args: { service: ServiceDBType }) => {
            return await ServiceModel.create(args.service);
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
