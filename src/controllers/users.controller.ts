import type { Request, Response } from "express";
import { createUser, getUserById, getUsers } from "../users.js";
import { UsersModel } from "../models/users.model.js";
import type { userType } from "../utils/types.js";
import { comparePassword } from "../utils/password.js";
import jwt from "jsonwebtoken";


export const UsersController = {

    // Criar utilizador
    async create(req: Request, res: Response) {
        try {
            const user = req.body;

            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "Campos obrigatórios em falta",
                    data: null,
                });
            }

            const insertUserResponse = await createUser(
                user.id,
                user.nome,
                user.numero_identidade,
                user.data_nascimento,
                user.email,
                user.password,
                user.telefone,
                user.pais,
                user.localidade,
                user.enabled,
                user.created_at,
                user.updated_at,
            );

            return res.status(201).json({
                status: "success",
                message: "Utilizador criado com sucesso!",
                data: insertUserResponse,
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno ao criar utilizador",
                data: error,
            });
        }
    },

    // Buscar todos utilizadores
    async getAll(req: Request, res: Response) {
        try {
            const getUsersResponse = await getUsers();

            return res.status(200).json({
                status: "success",
                message: "Utilizadores encontrados com sucesso!",
                data: getUsersResponse,
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar utilizadores",
                data: error,
            });
        }
    },

    // Buscar utilizador por ID
    async getById(req: Request, res: Response) {

        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do utilizador é obrigatório",
                    data: null,
                });
            }

            const getUserByIdResponse = await getUserById(id as string);

            if (!getUserByIdResponse) {
                return res.status(404).json({
                    status: "error",
                    message: "Utilizador não encontrado",
                    data: null,
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Utilizador encontrado com sucesso!",
                data: getUserByIdResponse,
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno",
                data: error,
            });
        }
    },

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Credenciais inválidas",
                data: null,
            });
        }

        const userData = await UsersModel.getByEmail(email as string);

        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "Nao existe nenhuma conta com esse email",
                data: null,
            });
        }

        const isPasswordValid = await comparePassword(password, userData.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Credenciais inválidas",
                data: null,
            });
        }

        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
        };
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        return res.status(200).json({
            status: "success",
            message: "Login bem-sucedido",
            data: {
                token,
                user: payload,
            }
        });


    },

// UPDATE PASSWORD (seguro)
    // trabalho final..................................................

async updatePassword(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (!id || !oldPassword || !newPassword) {
            return res.status(400).json({
                status: "error",
                message: "Dados obrigatórios em falta",
                data: null
            });
        }

        const user = await UsersModel.get(id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            });
        }

        const isValid = await comparePassword(oldPassword, user.password);

        if (!isValid) {
            return res.status(401).json({
                status: "error",
                message: "Password antiga inválida",
                data: null
            });
        }

        const updated = await UsersModel.updatePassword(id, newPassword);

        return res.status(200).json({
            status: "success",
            message: "Password atualizada com sucesso",
            data: updated
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Erro interno",
            data: error
        });
    }
}

//RESET PASSWORD

async resetPassword(req: Request, res: Response) {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                status: "error",
                message: "Dados obrigatórios em falta",
                data: null
            });
        }

        const user = await UsersModel.getByEmail(email);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            });
        }

        const updated = await UsersModel.updatePassword(user.id, newPassword);

        return res.status(200).json({
            status: "success",
            message: "Password redefinida com sucesso",
            data: updated
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Erro interno",
            data: error
        });
    }
}




/*
   
    import { UserService } from "../services/users.service";

    const userService = new UserService();

    export class UserController {

        // 🔐 UPDATE PASSWORD
        async updatePassword(req: Request, res: Response) {
            try {
                const userId = req.user.id; // vem do authGuard
                const { oldPassword, newPassword } = req.body;

                const result = await userService.updatePassword(
                    userId,
                    oldPassword,
                    newPassword
                );

                return res.status(200).json({
                    status: true,
                    message: result.message
                });

            } catch (error: any) {
                return res.status(400).json({
                    status: false,
                    message: error.message
                });
            }
        },

  // 🔄 RESET PASSWORD
  async resetPassword(req: Request, res: Response) {
    try {
        const { email, newPassword } = req.body;

        const result = await userService.resetPassword(email, newPassword);

        return res.status(200).json({
            status: true,
            message: result.message
        });

    } catch (error: any) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
}
}

*/









    // Atualizar utilizador
    async update(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updatedUser: userType = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID é obrigatório",
                data: null,
            });
        }

        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados inválidos",
                data: null,
            });
        }

        const updateUserResponse = await UsersModel.update(id as string, updatedUser);

        if (!updateUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar utilizador",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador atualizado com sucesso",
            data: updateUserResponse
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Erro interno",
            data: error,
        });
    }
},

    // Apagar utilizador
    async delete (req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatório",
                data: null,
            });
        }

        const deleteUserResponse = await UsersModel.delete(id as string);

        if (!deleteUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Erro interno",
            data: error,
        });
    }
}
};

