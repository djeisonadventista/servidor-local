import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import type { info } from "node:console";


export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(
                `INSERT INTO tbl_orcamento
                VALUES (?, ?, ?, ?, ?, ?)`,

                [
                    null,
                    orcamento.total,
                    orcamento.id_utilizadores,
                    orcamento.enabled,
                    new Date(),
                    new Date()
                ]
            )

const [newOrcamento] = await db.execute<OrcamentoDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_orcamento ORDER BY id DESC LIMIT 1`,
            )

return Array.isArray(newOrcamento) && newOrcamento.length > 0 ? newOrcamento[0] as OrcamentoDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<OrcamentoDBType[] | null> {
        const [rows] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>("SELECT * FROM tbl_orcamento")

        return rows as OrcamentoDBType[]
    },

    async get(id: string): Promise<OrcamentoDBType | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(
                `SELECT * FROM tbl_orcamento 
                WHERE tbl_orcamento.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as OrcamentoDBType : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, orcamento: Partial<OrcamentoDBType>) {
        try {
            const query = 
                `UPDATE tbl_orcamento 
                SET total = ?, 
                id_utilizadores = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`
                const queryValues: (number | string | boolean | Date)[] = [
                    orcamento.total!,
                    orcamento.id_utilizadores!,
                    orcamento.enabled!,
                    new Date(),
                    id
                ]
                
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(query, queryValues)
            
console.log({ rows })
return rows as OrcamentoDBType
        } catch (err) {
    console.log(err)
    return null
}
    },


    async delete (id: string): Promise<OrcamentoDBType | null> {
    try {
        const rows: any = await db.execute<OrcamentoDBType & RowDataPacket[]>(
            `DELETE FROM tbl_orcamento
                WHERE id = ?`,

            [id]
        )

        return rows[0].affectedRows === 0 ? null : rows[0] as OrcamentoDBType
    } catch (err) {
        console.log(err)
        return null
    }
},

 async updateBudget(id: string, total: number): Promise<OrcamentoDBType | null> {
    try {
        const rows: any = await db.execute<OrcamentoDBType & RowDataPacket[]>(
            `UPDATE tbl_orcamento SET total = ?, updated_at = ? WHERE id = ?`,
            [total, new Date(), id]
        );
        return rows[0].affectedRows === 0 ? null : rows[0] as OrcamentoDBType;
    } catch (error) {
        console.log(error);
        return null;
    }
}
}



