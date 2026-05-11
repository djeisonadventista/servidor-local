import { type Request, type Response } from "express";
import { UsersModel } from "../models/users.model.js";
import type { ResponseType, UserDBType, userType } from "../utils/types.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

export const UsersController = {

    //  Criar utilizador
    async createUsers(req: Request, res: Response) {
        const user: UserDBType = req.body;

        if (!user) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Campos obrigatórios em falta",
                data: null,
            };
            return res.status(400).json(response);
        }

        const createUserResponse = await UsersModel.create(user)

        const response: ResponseType<UserDBType> = {
            status: "success",
            message: "Utilizador criado com sucesso!",
            data: createUserResponse,
        };
        return res.status(200).json(response);
    },

    //  Buscar todos utilizadores
    async getAll(req: Request, res: Response) {
        const getAllUsersResponse = await UsersModel.getAll();

        if (!getAllUsersResponse) {
            const response: ResponseType<UserDBType[]> = {
                status: "success",
                message: "Utilizadores encontrados com sucesso!",
                data: getAllUsersResponse,
            };
            return res.status(200).json(response);

        }
        const response: ResponseType<null> = {
            status: "error",
            message: "Erro ao buscar utilizadores",
            data: null,
        };
        return res.status(500).json(response);

    },

    //  Buscar utilizador por ID
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID do utilizador é obrigatório",
                    data: null,
                };
                return res.status(400).json(response);
            }

            const getUserByIdResponse = await UsersModel.getById(id as string);

            if (!getUserByIdResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Utilizador não encontrado",
                    data: null,
                };
                return res.status(404).json(response);
            }

            const response: ResponseType<UserDBType> = {
                status: "success",
                message: "Utilizador encontrado com sucesso!",
                data: getUserByIdResponse,
            };
            return res.status(200).json(response);

        } catch (error) {
            console.error(error);
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro interno",
                data: null,
            };
            return res.status(500).json(response);
        }
    },

    //  LOGIN
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Credenciais inválidas",
                data: null,
            };
            return res.status(400).json(response);
        }

        const userData = await UsersModel.getByEmail(email);

        if (!userData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Não existe nenhuma conta com esse email",
                data: null,
            };
            const reponse: ResponseType<null> = {
                status: "error",
                message: "Não existe nenhuma conta com esse email",
                data: null,
            };
            return res.status(404).json(response);
        }

        const isPasswordValid = await comparePassword(password, userData.password);

        if (!isPasswordValid) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Credenciais inválidas",
                data: null,
            };
            return res.status(401).json(response);
        }


        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            role: userData.role,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        const response: ResponseType<{token: string, user: typeof payload}>= {
            status: "success",
            message: "Login bem-sucedido",
            data: {
                token,
                user: payload,
            },
        } 
        return res.status(200).json(response)
    }, 

    async updatePassword(req: any, res: Response) {

        const { id } = req.params;
        const { password, newPassword } = req.body;

        if (!password || !newPassword) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados obrigatórios em falta",
                data: null,
            };
            return res.status(400).json(response);

        }

        const userData = await UsersModel.getById(id as string)

        if (!userData) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            };
            return res.status(404).json(response);
        }

        const isPwdValid = await comparePassword(password, userData!.password)

        if (!isPwdValid) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Password antiga inválida",
                data: null
            };
            return res.status(401).json(response);
        }

        const updatePasswordResponse = await UsersModel.updatePassword(userData.id, await hashPassword(newPassword))

        if (!updatePasswordResponse) {
            const response: ResponseType<UserDBType> = {
                status: "success",
                message: "Password atualizada com sucesso",
                data: updatePasswordResponse
            }
            return res.status(200).json(response);
        }

        const response: ResponseType<null> = {
            status: "error",
            message: "Erro interno",
            data: null
        };
        return res.status(500).json(response);
    },

    //  RESET PASSWORD (VERSÃO SIMPLES)
    async resetPassword(req: Request, res: Response) {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados obrigatórios em falta",
                data: null
            };
            return res.status(400).json(response);
        }

        const user = await UsersModel.getByEmail(email);

        if (!user) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            };
            return res.status(404).json(response);
        }

        const hashedPassword = await hashPassword(newPassword);

        await UsersModel.updatePassword(user.id, hashedPassword);

        const response: ResponseType<UserDBType> = {
            status: "success",
            message: "Password redefinida com sucesso",
            data: null
        };
        return res.status(200).json(response);
    },


    //  Atualizar utilizador
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedUser: userType = req.body;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID é obrigatório",
                data: null,
            };
            return res.status(400).json(response);
        }

        if (!updatedUser) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Dados inválidos",
                data: null,
            };
            return res.status(400).json(response);
        }

        const updateUserResponse = await UsersModel.update(id as string, updatedUser);

        if (!updateUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<UserDBType> = {
            status: "success",
            message: "Utilizador atualizado com sucesso",
            data: updateUserResponse
        };
        return res.status(200).json(response);
    },

    //  Apagar utilizador
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "ID obrigatório",
                data: null,
            };
            return res.status(400).json(response);
        }

        const deleteUserResponse = await UsersModel.delete(id as string);

        if (!deleteUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null,
            };
            return res.status(400).json(response);
        }

        const response: ResponseType<UserDBType> = {
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse
        };
        return res.status(200).json(response);
    },
}


