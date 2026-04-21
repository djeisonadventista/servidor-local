
import { gql } from "graphql-tag";

export const typeDefs = gql`
    enum Role {
    CLIENTE = "cliente",
    ADMIN = "admin",
    PRESTADOR = "prestador",
    EMPRESA = "empresa"
}
    
enum EstadoProposta {
    PENDENTE = "PENDENTE",
    ACEITE = "ACEITE",
    RECUSADA = "RECUSADA"
}

enum EstadoPrestacaoServico {
    PENDENTE = "PENDENTE",
    EM_PROGRESSO = "EM_PROGRESSO",
    FINALIZADO = "FINALIZADO",
    CANALIZADO = "CANALIZADO"
}

enum TipoPrestador {
    PARTICULAR = "particular",
    EMPRESA = "empresa"
}

type Utilizador {
    id: ID!;
    nome: String!;
    numero_identidade: String!;
    data_nascimento: String!;
    email: String!;
    password: String;
    telefone: String!;
    pais: String!;
    localidade: String;
    role: Role;
    enebled: Boolean;
    created_at: String;
    update_at: String;
}
    
type Proposta {
    id: ID!;
    id_prestacao_servico: ID!,
    id_prestador: ID!,
    preco_hora: Float!,
    horas_estimadas: Int!,
    estado: EstadoProposta,
    owner: String,
    enabled: Boolean,
    created_at: String,
    updated_at: String
}

type Servico {
    id: ID!;
    nome: String!;
    descricao: String!;
    categoria: String!;
    enabled: Boolean!;
    created_at: String!;
    updated_at: String!;
}

type Prestador {
    id: ID!;
    taxa_urgencia: Float!;
    percentagem_desconto: Float!;
    minimo_desconto: Float!;
    nif: String!;
    profissao: String!;
    enable: Boolean!;
    created_at: String!;
    updated_at: String!;
}

type Orcamento {
    id: ID!;
    total: Float!;
    id_utilizadores: ID!;
    enabled: Boolean!;
    created_at: String!;
    updated_at: String!;
}

type PrestacaoServico {
    id: ID!;
    designacao: String!;
    subtotal: Float!;
    horas_estimadas: Int!;
    id_prestador: ID!;
    id_utilizador: ID!;
    id_servico: ID!;
    preco_hora: Float!;
    estado: EstadoPrestacaoServico;
    id_orcamento: ID;
    id_empresa: ID;
    tipo_prestador: TipoPrestador;
    urgente: Boolean!;
    enabled: Boolean!;
    created_at: String!;
    updated_at: String!;
}

type Categoria {
    id: ID!;
    designacao: String!;
    icone: String!;
    created_at: String!;
    updated_at: String!;
}

type Empresa {
    id: ID!;
    designacao: String!;
    descricao: String!;
    localizacao: String!;
    nif: String!;
    icone: String!;
    id_utilizador: ID!;
    enabled: Boolean!;
    created_at: String!;
    updated_at: String!;
}
    `
    