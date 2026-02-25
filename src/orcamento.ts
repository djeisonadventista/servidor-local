

interface pedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}



function calcularOrcamento(pedido: pedidoServicoType, precoHora: number) {
let total: number = 0;

    total = (pedido.horasEstimadas * precoHora ) 

 

}