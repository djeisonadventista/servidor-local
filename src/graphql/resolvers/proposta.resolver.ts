
import {PropostaModel} from "../../models/proposta.model.js";
import type { PropostaDBType,} from "../../utils/types.js";

export const propostaResolver = {
    Query: {
        getAllProposta: async () => {
            return await PropostaModel.getAll();
        },

        getPropostaById: async (_: any, args: { id: string }) => {
            return await PropostaModel.get(args.id);
        }
    },
    Mutation: {
        createProposta: async (_: any, args: { proposta: PropostaDBType }) => {
            return await PropostaModel.create(args.proposta);
        },
        updateProposta: async (_: any, args: { id: string, proposta: PropostaDBType }) => {
            return await PropostaModel.update(args.id, args.proposta);
        },
        deleteProposta: async (_: any, args: { id: string }) => {
            return await PropostaModel.delete(args.id);
        }
    }
}
