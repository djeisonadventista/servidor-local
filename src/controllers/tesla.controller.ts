import type { Request, Response } from "express";
import { calcularTotalParcelas } from "../views/tesla.service.js";

export function getTotalParcelas(req: Request, res: Response) {
    const dias = Number(req.query.dias) || 30;

    const total = calcularTotalParcelas(dias);

    return res.json({
        dias,
        total
    });
}