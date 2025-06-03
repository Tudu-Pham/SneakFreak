
import { Request, response, Response } from "express";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { getAllProduct, getAllSecondForm, getAllUsers, getProductByID, getSecondByID, getUserByID, getWaitingByID, handleCreateProduct, handleDeleteProduct, handleDeleteUser, handleDeleteWaiting, handleOrderTracking, handleSecondHandForm, handleSignUp, updateUserByID, updateUserPassword } from "../services/user_service";
import { productSchema, TproductSchema } from "../validation/product_schema";
import { getProductById, uploadProducts } from "../services/product_service";

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

const getProduct = async (req: Request, res: Response) => {
    const products = await uploadProducts();
    return res.render("product", {
        products
    });
}

const getDetailProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);
    return res.render('detail_product', {
        product
    });
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
            role: user.role,
            first_name: user.first_name
        };

        // ✅ Điều hướng theo role
        if (user.role === "ADMIN") {
            return res.redirect("/admin");
        } else {
            return res.redirect("/");
        }

    } catch (err) {
        console.error("Login error:", err);
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
    const products = await getAllProduct();
    return res.render('admin/manage_product', { products });
}

const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    //get by id
    const product = await getProductByID(id);
    return res.render('admin/view_product', {
        id: id,
        product: product
    });
}

const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteProduct(id);
    return res.redirect("/handle-product");
}

const getManageOrder = async (req: Request, res: Response) => {
    return res.render('admin/manage_order');
}

const getAnalytic = async (req: Request, res: Response) => {
    return res.render('admin/analytic');
}

const getCreateProduct = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        brand: "",
        condition: ""
    }
    return res.render('admin/create_product', {
        errors, oldData
    });
}

const postCreateProduct = async (req: Request, res: Response) => {
    try {
        const {
            name, price, detailDesc, shortDesc, quantity, brand, condition
        } = req.body as TproductSchema;
        const validate = productSchema.safeParse(req.body);
        if (!validate.success) {
            const errorsZod = validate.error.issues;
            const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`);
            const oldData = {
                name, price, detailDesc, shortDesc, quantity, brand, condition
            }
            return res.render("admin/create_product", {
                errors, oldData
            });
        }
        const file = req.file;
        const image = file?.filename ?? null;

        // Chuyển string sang số cho các trường cần thiết
        const priceNum = Number(price);
        const quantityNum = Number(quantity);

        await handleCreateProduct(
            name, priceNum, image, detailDesc, shortDesc, quantityNum, brand, condition
        );
        return res.redirect('/create-product');
    } catch (err) {
        console.error("Post error:", err);
        return res.status(500).send("Failed to post item");
    }
};

const resetTokens: { [token: string]: string } = {}; // token → email mapping

const handleForgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const users = await getAllUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.render("forgot_password", { error: "Email not found!" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    resetTokens[token] = email;

    const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });

    return res.render("forgot_password", { message: "Reset link sent to your email." });
};

export const renderResetForm = async (req: Request, res: Response) => {
    const { token } = req.params;
    const email = resetTokens[token];
    if (!email) return res.send("Invalid or expired token");

    return res.render("reset_password", { token });
};

export const handleResetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { newPassword, repeatPassword } = req.body;

    const email = resetTokens[token];
    if (!email) return res.send("Invalid or expired token");

    if (newPassword !== repeatPassword) {
        return res.send("Passwords do not match.");
    }

    const users = await getAllUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.send("User not found.");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(user.id, hashedPassword);

    delete resetTokens[token];

    return res.send(`
  <html>
    <body>
      <p>Password reset successfully. Redirecting to login...</p>
      <script>
        setTimeout(() => {
          window.location.href = '/log-in';
        }, 1000);
      </script>
    </body>
  </html>
`);

};

const postUpdateWaiting = async (req: Request, res: Response) => {
    const { id, email } = req.body;

    // Gửi email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    await transporter.sendMail({
        to: email,
        subject: 'Notification from SneakFreak',
        html: `<p>Giày của bạn đã được <b>chấp nhận</b>. Chúng tôi sẽ liên hệ lại với bạn sớm nhất.</p>`
    });

    // Trả về thông báo thành công (popup + redirect)
    res.send(`
    <script>
      alert("Successful! Email was sent.");
      window.location.href = "/handle-second-hand-form";
    </script>
  `);
};

export {
    getHomePage, getOrderTracking, getFavourite, getLogIn, getCart, getProduct, getMale, getFemale, getSecondHand, getFaqs, getPolicy,
    postSecondHandForm, getPrivacy, postOrderTracking, getSignUp, postSignUp, postLogIn, getAdmin, postDeleteUser, getViewUser, getSecondHandForm,
    getManageProduct, getManageOrder, getAnalytic, postUpdateUser, getViewWaiting, postDeleteWaiting, getCreateProduct, postCreateProduct, handleForgotPassword, postUpdateWaiting
    , getViewProduct, postDeleteProduct, getDetailProduct
};
