import { Request, response, Response } from "express";
import { handleOrderTracking, handleSecondHandForm } from "../services/user_service";

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
const getProduct = (req: Request, res: Response) => {
    return res.render("product");
}
const getMale = (req: Request, res: Response) => {
    return res.render("male");
}
const getFemale = (req: Request, res: Response) => {
    return res.render("female");
}
const getSecondHand = (req: Request, res: Response) => {
    return res.render("secondhand");
}
const getFaqs = (req: Request, res: Response) => {
    return res.render("faqs");
}
const getPolicy = (req: Request, res: Response) => {
    return res.render("policy");
}
const getPrivacy = (req: Request, res: Response) => {
    return res.render("privacy");
}
const postSecondHandForm = (req: Request, res = response) => {
    const { Name, Email, Phone, brand, ModelName, Size, condition, Box, yearOfPurchase, RetailPrice, DesiredPassingPrice, images, comment } = req.body;

    //handle SecondHand Form
    handleSecondHandForm(Name, Email, Phone, brand, ModelName, Size, condition, Box, yearOfPurchase, RetailPrice, DesiredPassingPrice, images, comment);
    return res.redirect("/");
}
const postOrderTracking = (req: Request, res: Response) => {
    const { OrderCode, Email } = req.body;
    console.log(req.body);

    //handle Orede4r Tracking
    handleOrderTracking(OrderCode, Email);
    return res.redirect('/');

}

export {
    getHomePage, getOrderTracking, getFavourite, getLogIn, getCart, getProduct, getMale, getFemale, getSecondHand, getFaqs, getPolicy,
    postSecondHandForm, getPrivacy, postOrderTracking
}