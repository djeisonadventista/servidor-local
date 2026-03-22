import db from "./lib/db.js";
import { formatDateDDMMYYYY } from "./utils/data.js";
import { hashPassword } from "./utils/password.js";
import type { userType } from "./utils/types.js";
import { generateUUID } from "./utils/uuid.js";

export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores")
    return rows;
}

export async function getUserById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tbl_utilizadores WHERE id = ? ", [id]);
    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null;
}

export async function createUser(
    id: string,
    nome: string,
    numero_identidade: string,
    data_nascimento: string,
    email: string,
    password: string,
    telefone: string,
    pais: string,
    localidade: string,
    enebled: boolean,
    created_at: string,
    update_at: string

) {
    try {

        const [rows] = await db.execute(
            `INSERT INTO tbl_utilizadores
        (id, nome, numero_identidade, data_nascimento, email, password, telefone, pais, localidade, enebled, created_at, update_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                generateUUID(),
                nome,
                numero_identidade,
                formatDateDDMMYYYY(data_nascimento),
                email,
                await hashPassword (password),
                telefone,
                pais,
                localidade,
                enebled,
                new Date(),
                new Date()
            ]
        );

        console.log({ rows })
        return rows
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function updateUser(id: string, updatedUser: userType) {
    try {
        const query = `
        UPDATE tbl_utilizadores
        SET
    nome: = ?,
    numero_identidade: = ?,
    data_nascimento: = ?,
    email: = ?,
    password: = ?,
    telefone: = ?,
    pais: = ?,
    localidade: = ?,
    enebled: = ?,
    update_at: = ?
        WHERE
        id=?
        `;

        const values = [
            updatedUser.nome,
            updatedUser.numero_identidade,
            updatedUser.data_nascimento,
            updatedUser.email,
            updatedUser.password,
            updatedUser.telefone,
            updatedUser.pais,
            updatedUser.localidade,
            updatedUser.enebled,
            new Date(),
            id
        ]
        const rows = await db.execute(query, values)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    } catch (error) {
        console.log(error);
        return null
    }
}

export async function deleteUser(id: string) {
    try {

        const query = `DELETE  FROM tbl_utilizadores WHERE id = ?`

        const values = [id]

        const rows: any = await db.execute(query, values)

        return rows[0]?.affectedRows === 0 ? null : rows

    } catch (error) {
        console.log(error);
        return null
    }
}

