import db from "../lib/db.js";

export const PropostaModel = {

    async create(proposta: any) {
        try {

            const query = `
            INSERT INTO tbl_proposta
            (id, id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                null,
                proposta.id_prestacao_servico,
                proposta.preco_hora,
                proposta.horas_estimadas,
                proposta.estado,
                proposta.enabled,
                new Date(),
                new Date()
            ];

            const rows = await db.execute(query, values);

            return rows;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll() {
        try {
            const query = `SELECT * FROM tbl_proposta`;

            const rows = await db.execute(query);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : [];

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string) {
        try {

            const query = `SELECT * FROM tbl_proposta WHERE id = ?`;

            const values = [id];

            const rows = await db.execute(query, values);

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
};