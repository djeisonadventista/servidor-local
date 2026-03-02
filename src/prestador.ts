class Prestador {
    nome: string;
    precoHora: number;
    profissao: string;
    minimoParaDesconto: number;
    percentagemDesconto: number;
    taxaUrgencia: number;

    constructor(nomeDoPrestador: string, precoHoraDoPrestador: number, profissaoDoPrestador: string, minimoParaDescontoDoPrestador: number, percentagemDescontoDoPrestador: number, taxaUrgenciaDoPrestador: number) {
        this.nome = nomeDoPrestador;
        this.precoHora = precoHoraDoPrestador;
        this.profissao = profissaoDoPrestador;
        this.minimoParaDesconto = minimoParaDescontoDoPrestador;
        this.percentagemDesconto = percentagemDescontoDoPrestador;
        this.taxaUrgencia = taxaUrgenciaDoPrestador;
    }
    alterarPrecoHora(novoPrecoHora: number) {
    this.precoHora = novoPrecoHora;
}
alterarNome(novoNome: string) {
    this.nome = novoNome;
}
}

const prestador1 = new Prestador("Djeison", 50, "Programador", 100, 0.1, 1.3);


/*
nome: Djeison
precoHora: 50
profissao: Programador
minimoParaDesconto: 100
percentagemDesconto: 0.1
taxaUrgencia: 1.3
*/