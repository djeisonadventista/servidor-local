import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
const authHeader = req.headers.authorization;
// "Bearer", "qwertyuioplkjhgfdsazxcvbnm"

    if (!authHeader) {
        return res.status(401).json({
            status: "error",
            message: "Utilizador nao autenticado",
            
        });
    }
    const token = authHeader.split(" ")[1];
    // ["Bearer", "qwertyuioplkjhgfdsazxcvbnm"]

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string);
        next();
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Token inválido",
        
        });
    }

};


/*

🔐 4. Middleware (auth.guard.ts)

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY") as any;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}



*/

/*
req: {
    hesders: {
        authorization: "bearer qwertyuioplkjhgfdsazxcvbnm"
}
}
*/