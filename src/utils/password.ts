import { hash, compare} from "bcrypt"

export async function hashPassword(passwordEmTexto: string) {
    return await hash (passwordEmTexto, 12)
}

export async function comparePassword(passwordEmTexto: string, passwordHash: string) {
    return await compare (passwordEmTexto, passwordHash)
}

export async function updatePassword( passwordEmTexto: string, passwordHash: string) {
    return await updatePassword (passwordEmTexto, passwordHash)
}