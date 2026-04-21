
import {CategoriaModel} from "../../models/categoria.model.js";
import type { CategoriaDBType} from "../../utils/types.js";

export const categoriaResolver = {
    Query: {
        getAllCategoria: async () => {
            return await CategoriaModel.getAll();
        },

        getCategoriaById: async (_: any, args: { id: string }) => {
            return await CategoriaModel.get(args.id);
        }
    },
    Mutation: {
        createCategoria: async (_: any, args: { categoria: CategoriaDBType }) => {
            return await CategoriaModel.create(args.categoria);
        },
        updateCategoria: async (_: any, args: { id: string, categoria: CategoriaDBType }) => {
            return await CategoriaModel.update(args.id, args.categoria);
        },
        deleteCategoria: async (_: any, args: { id: string }) => {
            return await CategoriaModel.delete(args.id);
        }
    }
}
