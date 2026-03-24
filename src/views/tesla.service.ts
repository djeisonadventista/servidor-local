export function calcularTotalParcelas(dias: number = 30): number {
    let total = 0;
    let valorParcela = 1;

    for (let i = 1; i <= dias; i++) {
        total += valorParcela;
        console.log(`dia ${i}: $${valorParcela} : total: $${total}`)
        valorParcela *= 2;
    }

    return total;
}