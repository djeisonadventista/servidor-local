import type { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../lib/db.js";
import type { CategoriaDBType } from "../utils/types.js";

export const CategoriaModel = {
    async create(categoria: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            const [result] = await db.execute<ResultSetHeader>(
                `INSERT INTO tbl_categoria (designacao, icone, created_at, updated_at)
                 VALUES (?, ?, ?, ?)`,
                [
                    categoria.designacao,
                    categoria.icone,
                    new Date(),
                    new Date(),
                ]
            );

            return {
                id: result.insertId.toString(),
                designacao: categoria.designacao,
                icone: categoria.icone,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            } as CategoriaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getAll(): Promise<CategoriaDBType[] | null> {
        try {
            const [rows] = await db.execute<CategoriaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_categoria`
            );
            return rows as CategoriaDBType[];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<CategoriaDBType | null> {
        try {
            const [rows] = await db.execute<CategoriaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_categoria WHERE id = ?`,
                [id]
            );

            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] as CategoriaDBType : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async update(id: string, categoria: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            await db.execute(
                `UPDATE tbl_categoria
                 SET designacao = ?, icone = ?, updated_at = ?
                 WHERE id = ?`,
                [
                    categoria.designacao,
                    categoria.icone,
                    new Date(),
                    id,
                ]
            );

            return {
                id,
                designacao: categoria.designacao,
                icone: categoria.icone,
                created_at: categoria.created_at,
                updated_at: new Date().toISOString(),
            } as CategoriaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async delete(id: string): Promise<CategoriaDBType | null> {
        try {
            const [result] = await db.execute<ResultSetHeader>(
                `DELETE FROM tbl_categoria WHERE id = ?`,
                [id]
            );

            return result.affectedRows === 0 ? null : { id } as CategoriaDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
