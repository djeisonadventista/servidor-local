
export enum Role {
    CLIENTE = "cliente",
    ADMIN = "admin",
    PRESTADOR = "prestador",
    EMPRESA = "empresa"
}

export enum EstadoProposta {
    PENDENTE = "PENDENTE",
    ACEITE = "ACEITE",
    RECUSADA = "RECUSADA"
}

export enum EstadoPrestacaoServico {
    PENDENTE = "PENDENTE",
    EM_PROGRESSO = "EM_PROGRESSO",
    FINALIZADO = "FINALIZADO",
    CANALIZADO = "CANALIZADO"
}

export enum TipoPrestador {
    PARTICULAR = "particular",
    EMPRESA = "empresa"
}

export interface pedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontado: number;
    porcentagemDesconto: number;
}

export interface PrestadorType {
    nome: string;
    precoHora: number;
    profissao: string;
    minimoParaDesconto: number;
    percentagemDesconto: number;
    taxaUrgencia: number;
}

export interface userType {
    id: string;
    nome: string;
    numero_identidade: string;
    data_nascimento: string;
    email: string;
    password: string;
    telefone: string;
    pais: string;
    localidade: string;
    role: Role;
    enebled: boolean;
    created_at: Date;
    update_at: Date;
}

export interface ServicosType {
    id: string;
    nome: string;
    descricao: string;
    categoria: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface PropostasType {
    id: string;
    id_prestacao_servico: string;
    preco_hora: string;
    horas_estimadas: string;
    estado: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface ServicoDBType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PrestadorDBType {
    id: string,
    taxa_urgencia: number,
    percentagem_desconto: number,
    minimo_desconto: number,
    nif: string,
    profissao: string,
    enable: boolean,
    created_at: string,
    updated_at: string
}

export interface ServiceDBType {
    id: string;
    nome: string;
    descricao: string;
    categoria: string;
    enabled_at: boolean;
    created_at: string;
    updated_at: string;
}

export interface OrcamentoDBType {
    id: string,
    total: number,
    id_utilizadores: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PropostaDBType {
    id: string,
    id_prestacao_servico: string,
    id_prestador: string,
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
    owner: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}


export interface PrestacaoServicoDBType {
    id: string,
    designacao: string,
    subtotal: number,
    horas_estimadas: number,
    id_prestador: string,
    id_utilizador: string,
    id_servico: string,
    preco_hora: number,
    estado: string,
    id_orcamento: string,
    id_empresa: string,
    tipo_prestador: TipoPrestador,
    urgente: boolean,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface UserDBType {
    id: string;
    nome: string;
    numero_identidade: string;
    data_nascimento: string;
    email: string;
    password: string;
    telefone: string;
    pais: string;
    localidade: string;
    role: Role;
    enebled: boolean;
    created_at: Date;
    update_at: Date;
}

export interface ResponseType<T> {
    status: "success" | "error";
    message: string;
    data: T | null;
}

export interface PrestacaoServicoDetalhadoType {
    id: string;
    nome_utilizador: string;
    nome_servico: string;
    descricao: string;
    data_pedido: string;
    urgente: boolean;
}

export interface ServicoDetalhadoType {
    id: string;
    nome: string;
    descricao: string;
    designacao_categoria: string;
    icone_categoria: string;
    id_empresa: string;
    designacao_empresa: string;
    icone_empresa: string;
    enabled: boolean;

}

export interface CategoriaDBType {
    id: string;
    designacao: string;
    icone: string;
    created_at: string;
    updated_at: string;
}

export interface EmpresaDBType {
    id: string;
    designacao: string;
    descricao: string;
    localizacao: string;
    nif: string;
    icone: string;
    id_utilizador: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface PrestacaoServicoByCategoriaType {
    id_prestacao_servico: string;
    descricao: string;
    nome_servico: string;
    nome_categoria: string;
    icone_categoria: string;
    data_pedido: string;
    urgente: boolean;
}