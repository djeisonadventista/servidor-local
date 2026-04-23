
import {OrcamentoModel} from "../../models/orcamento.model.js";
import { UsersModel } from "../../models/users.model.js";
import type { OrcamentoDBType } from "../../utils/types.js";

export const orcamentoResolver = {
    Query: {
        getAllOrcamento: async () => {
            return await OrcamentoModel.getAll();
        },

        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.get(args.id);
        }
    },
    Mutation: {
        createOrcamento: async (_: any, args: { orcamento: OrcamentoDBType }) => {
            return await OrcamentoModel.create(args.orcamento);
        },
        updateOrcamento: async (_: any, args: { id: string, orcamento: OrcamentoDBType }) => {
            return await OrcamentoModel.update(args.id, args.orcamento);
        },
        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.delete(args.id);
        }
    },

    // Relacionamento entre Orcamento e Utilizador
    Orcamento: {
        utilizador: async (parent: { id_utilizadores: string }) => {
            return await UsersModel.get(parent.id_utilizadores);
        }
    }
}
