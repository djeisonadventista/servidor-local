import { typeDefs } from "./typedefs/typedefs.js";
import { usersResolver } from "./resolvers/users.resolver.js";
import { serviceResolver } from "./resolvers/servico.resolver.js";
import { prestacaoServicoResolver } from "./resolvers/prestacao-servico.resolver.js";
import { prestadorResolver } from "./resolvers/prestador.resolver.js";
import { orcamentoResolver } from "./resolvers/orcamento.resolver.js";
import { empresaResolver } from "./resolvers/empresa.resolver.js";
import { categoriaResolver } from "./resolvers/categoria.resolver.js";
import { propostaResolver } from "./resolvers/proposta.resolver.js";

export const resolvers = {
    Query: {
        ...usersResolver.Query,
        ...serviceResolver.Query,
        ...propostaResolver.Query,
        ...prestadorResolver.Query,
        ...prestacaoServicoResolver.Query,
        ...orcamentoResolver.Query,
        ...empresaResolver.Query,
        ...categoriaResolver.Query,


    },
    Mutation: {
        ...usersResolver.Mutation,
        ...serviceResolver.Mutation,
        ...propostaResolver.Mutation,
        ...prestadorResolver.Mutation,
        ...prestacaoServicoResolver.Mutation,
        ...orcamentoResolver.Mutation,
        ...empresaResolver.Mutation,
        ...categoriaResolver.Mutation,

    }
}



export { typeDefs } 