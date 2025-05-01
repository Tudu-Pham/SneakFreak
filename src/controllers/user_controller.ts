import { Request, Response } from "express";

const getHomePage = (req: Request, res: Response) => {
    return res.render("home");
}
const getOrderTracking = (req: Request, res: Response) => {
    return res.render("order_tracking");
}
const getFavourite = (req: Request, res: Response) => {
    return res.render("favourite");
}
const getLogIn = (req: Request, res: Response) => {
    return res.render("login");
}
const getCart = (req: Request, res: Response) => {
    return res.render("cart");
}

export { getHomePage, getOrderTracking, getFavourite, getLogIn, getCart }