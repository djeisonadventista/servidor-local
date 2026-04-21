
import {EmpresaModel} from "../../models/empresa.model.js";
import type { EmpresaDBType } from "../../utils/types.js";

export const empresaResolver = {
    Query: {
        getAllEmpresas: async () => {
            return await EmpresaModel.getAll();
        },

        getEmpresaById: async (_: any, args: { id: string }) => {
            return await EmpresaModel.get(args.id);
        }
    },
    Mutation: {
        createEmpresa: async (_: any, args: { empresa: EmpresaDBType }) => {
            return await EmpresaModel.create(args.empresa);
        },
        updateEmpresa: async (_: any, args: { id: string, empresa: EmpresaDBType }) => {
            return await EmpresaModel.update(args.id, args.empresa);
        },
        deleteEmpresa: async (_: any, args: { id: string }) => {
            return await EmpresaModel.delete(args.id);
        }
    }
}
