import db from "./lib/db.js";

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
    localidade: string
) {

    const [result] = await db.execute(
        `INSERT INTO tbl_utilizadores
        (id, nome, numero_identidade, data_nascimento, email, password, telefone, pais, localidade, enabled, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
            id,
            nome,
            numero_identidade,
            data_nascimento,
            email,
            password,
            telefone,
            pais,
            localidade,
            true
        ]
    );

    return result;
}
