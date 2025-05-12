import { Request, response, Response } from "express";
import { getAllUsers, getUserByID, handleDeleteUser, handleOrderTracking, handleSecondHandForm, handleSignUp } from "../services/user_service";

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
const getSignUp = (req: Request, res: Response) => {
    return res.render("signup");
};
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

    //handle Order Tracking
    handleOrderTracking(OrderCode, Email);
    return res.redirect('/');
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    await handleDeleteUser(id);
    return res.redirect("/admin");
}
const postSignUp = async (req: Request, res: Response) => {
    const { FName, LName, Email, Password, Repassword } = req.body;
    try {
        await handleSignUp(FName, LName, Email, Password, Repassword);
        return res.redirect('/sign-up');
    } catch (err) {
        console.error("SignUp error:", err);
        return res.status(500).send("Failed to sign up");
    }
};

const getAdmin = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render('adminhomepage', { users });
};
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    //get by id
    const user = await getUserByID(id);
    return res.render('view_user', {
        id: id,
        user: user
    });
}

export {
    getHomePage, getOrderTracking, getFavourite, getLogIn, getCart, getProduct, getMale, getFemale, getSecondHand, getFaqs, getPolicy,
    postSecondHandForm, getPrivacy, postOrderTracking, getSignUp, postSignUp, getAdmin, postDeleteUser, getViewUser
};
