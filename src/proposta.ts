import db from "./lib/db.js";


export async function getPropostas() {
    const [rows] = await db.execute("SELECT * FROM tbl_servicos");
    return rows;
}

export async function getPropostasById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tbl_proposta WHERE id = ?",
        [id]
    );

    if (Array.isArray(rows) && rows.length === 0) return null

    return Array.isArray(rows) ? rows[0] : null;
}
export async function createPropostas(
    id: string,
    id_prestacao_servico: string,
    preco_hora: string,
    horas_estimadas: string,
    estado: string,
    enabled: boolean


) {
    try {

        const [rows] = await db.execute(
            `INSERT INTO tbl_proposta
            ( id, id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                null,
                id_prestacao_servico,
                preco_hora,
                horas_estimadas,
                estado,
                enabled,
                new Date(),
                new Date()
            ]
        );

        console.log({ rows });

        return rows;

    } catch (error) {
        console.log(error);
        return null;
    }
}