import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "supersecreto"; 

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(403).json({ message: "Token no proporcionado" });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            res.status(403).json({ message: "Token inválido o expirado" });
            return;
        }
        (req as any).user = user;
        next(); 
    });
}