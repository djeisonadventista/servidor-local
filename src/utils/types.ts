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