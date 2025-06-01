
import { Request, response, Response } from "express";
import bcrypt from "bcrypt";
import { getAllSecondForm, getAllUsers, getSecondByID, getUserByID, getWaitingByID, handleDeleteUser, handleDeleteWaiting, handleOrderTracking, handleSecondHandForm, handleSignUp, updateUserByID } from "../services/user_service";

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
const postOrderTracking = (req: Request, res: Response) => {
    const { OrderCode, Email } = req.body;
    console.log(req.body);

    //handle Order Tracking
    handleOrderTracking(OrderCode, Email);
    return res.redirect('/');
}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const a = await handleDeleteUser(id);
    return res.redirect("/admin");
}

const postDeleteWaiting = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteWaiting(id);
    return res.redirect("/handle-second-hand-form");
}

const postSecondHandForm = async (req: Request, res: Response) => {
    try {
        const {
            Name,
            Email,
            Phone,
            brand,
            ModelName,
            Size,
            condition,
            Box,
            yearOfPurchase,
            RetailPrice,
            DesiredPassingPrice,
            image,
            comment,
        } = req.body;

        // Chuyển string sang số cho các trường cần thiết
        const phoneNum = Number(Phone);
        const sizeNum = Number(Size);
        const yearNum = Number(yearOfPurchase);
        const retailPriceNum = Number(RetailPrice);
        const desiredPriceNum = Number(DesiredPassingPrice);

        await handleSecondHandForm(
            Name,
            Email,
            phoneNum,
            brand,
            ModelName,
            sizeNum,
            condition,
            Box,
            yearNum,
            retailPriceNum,
            desiredPriceNum,
            image,
            comment
        );
        return res.redirect('/second-hand-form');
    } catch (err) {
        console.error("Post error:", err);
        return res.status(500).send("Failed to post item");
    }
};


const postSignUp = async (req: Request, res: Response) => {
    const { FName, LName, Email, Password } = req.body;
    try {
        await handleSignUp(FName, LName, Email, Password);
        return res.redirect('/log-in');
    } catch (err) {
        console.error("SignUp error:", err);
        return res.status(500).send("Failed to sign up");
    }
};


const postLogIn = async (req: Request, res: Response) => {
    const { Email, Password } = req.body;

    try {
        const users = await getAllUsers();
        const user = users.find(u => u.email === Email);

        if (!user) {
            return res.status(401).render("login", { error: "Email is not registered!" });
        }

        const isMatch = await bcrypt.compare(Password, user.password);
        if (!isMatch) {
            return res.status(401).render("login", { error: "Incorrect password!" });
        }

        // ✅ Sử dụng ép kiểu any để tránh lỗi TS2339
        (req as any).session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        // ✅ Điều hướng theo role
        if (user.role === "ADMIN") {
            return res.redirect("/admin");
        } else {
            return res.redirect("/");
        }

    } catch (err) {
        console.error("Login error:", err); // 👈 Xem lỗi tại đây
        return res.status(500).render("login", { error: "Internal Server Error" });
    }
};





const getAdmin = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render('admin/adminhomepage', { users });
};

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    //get by id
    const user = await getUserByID(id);
    return res.render('admin/view_user', {
        id: id,
        user: user
    });
}

const getViewWaiting = async (req: Request, res: Response) => {
    const { id } = req.params;

    const waiting = await getWaitingByID(id);
    return res.render('admin/view_waiting', {
        id: id,
        secondhand: waiting
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, role } = req.body;
    //update role by id
    await updateUserByID(id, role);
    return res.redirect("/admin");
}

const getSecondHandForm = async (req: Request, res: Response) => {
    const secondhands = await getAllSecondForm();
    return res.render('admin/view_secondhand', { secondhands });
}

const getManageProduct = async (req: Request, res: Response) => {
    return res.render('admin/manage_product');
}

const getManageOrder = async (req: Request, res: Response) => {
    return res.render('admin/manage_order');
}

const getAnalytic = async (req: Request, res: Response) => {
    return res.render('admin/analytic');
}





export {
    getHomePage, getOrderTracking, getFavourite, getLogIn, getCart, getProduct, getMale, getFemale, getSecondHand, getFaqs, getPolicy,
    postSecondHandForm, getPrivacy, postOrderTracking, getSignUp, postSignUp, postLogIn, getAdmin, postDeleteUser, getViewUser, getSecondHandForm,
    getManageProduct, getManageOrder, getAnalytic, postUpdateUser, getViewWaiting, postDeleteWaiting
};
