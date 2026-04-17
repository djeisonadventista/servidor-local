import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { EmpresaDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const EmpresaModel = {
    async create(empresa: EmpresaDBType): Promise<EmpresaDBType | null> {
        try {
            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(
                `INSERT INTO tbl_empresa
                (id, designacao, descricao, localizacao, nif, icone, id_utilizador, enabled, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    empresa.designacao,
                    empresa.descricao,
                    empresa.localizacao,
                    empresa.nif,
                    empresa.icone,
                    empresa.id_utilizador,
                    empresa.enabled,
                    new Date(),
                    new Date(),
                ]
            );
            return rows as EmpresaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<EmpresaDBType[] | null> {
        try {
            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_empresa`
            );
            return rows as EmpresaDBType[];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<EmpresaDBType | null> {
        try {
            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_empresa WHERE id = ?`,
                [id]
            );

            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] as EmpresaDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, empresa: EmpresaDBType): Promise<EmpresaDBType | null> {
        try {
            const [rows] = await db.execute<EmpresaDBType & RowDataPacket[]>(
                `UPDATE tbl_empresa
                SET designacao = ?, descricao = ?, localizacao = ?, nif = ?, icone = ?, id_utilizador = ?, enabled = ?, updated_at = ?
                WHERE id = ?`,
                [
                    empresa.designacao,
                    empresa.descricao,
                    empresa.localizacao,
                    empresa.nif,
                    empresa.icone,
                    empresa.id_utilizador,
                    empresa.enabled,
                    new Date(),
                    id,
                ]
            );
            return rows as EmpresaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<EmpresaDBType | null> {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_empresa WHERE id = ?`,
                [id]
            );

            return rows[0]?.affectedRows === 0 ? null : rows[0] as EmpresaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
