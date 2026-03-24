import { Router } from "express";
const router = Router();

router.get("/tesla-total", (req, res) => {
    res.json({ message: "Rota funcionando 🚀" });
});

export default router;







