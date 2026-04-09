import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_orcamento
                VALUES (?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    orcamento.total,
                    orcamento.id_utilizadores,
                    orcamento.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_orcamento")

        return rows
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_orcamento 
                WHERE tbl_orcamento.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_orcamento 
                SET total = ?, 
                id_utilizadores = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    orcamento.total,
                    orcamento.id_utilizadores,
                    orcamento.enabled,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },


    // trabalho final..................................................
    //(LÓGICA COMPLETA)

    async calcularTotal(idOrcamento: string) {
        try {

            // 1. buscar prestacao_servico
            const [prestacoes]: any = await db.execute(
                `SELECT * FROM tbl_prestacao_servico WHERE id_orcamento = ?`,
                [idOrcamento]
            );

            if (!prestacoes || prestacoes.length === 0) return null;

            let totalFinal = 0;

            for (const prestacao of prestacoes) {

                // 2. buscar proposta aceite
                const [propostas]: any = await db.execute(
                    `SELECT * FROM tbl_proposta 
                 WHERE id_prestacao_servico = ? AND estado = 'Aceite'`,
                    [prestacao.id]
                );

                if (!propostas || propostas.length === 0) continue;

                const proposta = propostas[0];

                let total = proposta.preco_hora * proposta.horas_estimadas;

                // 3. buscar prestador
                const [prestadorRows]: any = await db.execute(
                    `SELECT * FROM tbl_prestador WHERE id = ?`,
                    [proposta.id_prestador]
                );

                const prestador = prestadorRows[0];

                // urgencia
                if (prestador.taxa_urgencia) {
                    total = total * 1.2;
                }

                // desconto
                if (prestador.minimoDesconto <= total) {
                    total = total - (total * prestador.percentagemDesconto / 100);
                }

                totalFinal += total;
            }

            // 4. atualizar orcamento
            await db.execute(
                `UPDATE tbl_orcamento SET total = ? WHERE id = ?`,
                [totalFinal, idOrcamento]
            );

            return totalFinal;

        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async updateBudget(id: string, total: number) {
        try {
            const rows: any = await db.execute(
                `UPDATE tbl_orcamento SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id]
            );
            return rows[0].affectedRows === 0 ? null : rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_orcamento
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
}


