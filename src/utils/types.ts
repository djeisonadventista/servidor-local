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

export interface ResponseType {
    status: boolean;
    message: string;
    data: ServicoType | null;
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

 export interface ServiceDBType{
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
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
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
    id_servico: string,
    preco_hora: number,
    estado: string,
    id_orcamento: string,
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
    enebled: boolean;
    created_at: Date;
    update_at: Date;
}

