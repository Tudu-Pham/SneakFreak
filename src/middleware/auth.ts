import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const sessionUser = (req as any).session?.user;

    if (sessionUser && sessionUser.role === "ADMIN") {
        return next();
    }

    return res.status(403).render("login", {
        error: "Access denied. Admins only."
    });
};
