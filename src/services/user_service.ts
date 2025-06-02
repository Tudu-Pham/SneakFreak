import { prisma } from "../config/client";
import { Role } from "@prisma/client";
import bcrypt from 'bcrypt';
const saltRounds = 10;

const handleSecondHandForm = async (Name: string, Email: string, Phone: number, brand: string, ModelName: string, Size: number, condition: string, Box: string, yearOfPurchase: number, RetailPrice: number, DesiredPassingPrice: number, images: string, comment: string) => {
    await prisma.secondhand.create({
        data: {
            full_name: Name,
            email: Email,
            phone: Phone,
            brand,
            model_name: ModelName,
            size: Size,
            condition,
            box: Box,
            yearPurchase: yearOfPurchase,
            retailPrice: RetailPrice,
            desiredPrice: DesiredPassingPrice,
            images,
            comment
        }
    });
};



const handleOrderTracking = (OrderCode: string, Email: string) => {
    // TODO: Implement this function
};

const handleSignUp = async (FName: string, LName: string, Email: string, Password: string) => {
    const defaultPassword = await bcrypt.hash(Password, saltRounds);
    await prisma.user.create({
        data: {
            first_name: FName,
            last_name: LName,
            email: Email,
            password: defaultPassword
        }
    });
};

const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const handleDeleteUser = async (id: string) => {
    await prisma.user.delete({
        where: { id: +id }
    });
};

const getUserByID = async (id: string) => {
    try {
        return await prisma.user.findFirst({
            where: { id: +id }
        });
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getWaitingByID = async (id: string) => {
    try {
        return await prisma.secondhand.findFirst({
            where: { id: +id }
        });
    } catch (err) {
        console.error(err);
        return null;
    }
};

const handleDeleteWaiting = async (id: string) => {
    try {
        await prisma.secondhand.delete({
            where: { id: +id }
        });
    } catch (err) {
        console.error("Error deleting waiting record:", err);
    }
};

const updateUserByID = async (id: string, role: string) => {
    try {
        await prisma.user.update({
            where: { id: +id },
            data: { role: role as Role }
        });
    } catch (err) {
        console.error("Error updating user role:", err);
    }
};

const getAllSecondForm = async () => {
    return await prisma.secondhand.findMany();
};

const getSecondByID = async (id: string) => {
    try {
        return await prisma.secondhand.findFirst({
            where: { id: +id }
        });
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getAllProduct = async () => {
    return await prisma.product.findMany();
}

const getProductByID = async (id: string) => {
    try {
        return await prisma.product.findFirst({
            where: { id: +id }
        });
    } catch (err) {
        console.error(err);
        return null;
    }
};

const handleDeleteProduct = async (id: string) => {
    try {
        await prisma.product.delete({
            where: { id: +id }
        });
    } catch (err) {
        console.error("Error deleting product record:", err);
    }
};

export const updateUserPassword = async (id: number, hashedPassword: string) => {
    await prisma.user.update({
        where: { id },
        data: { password: hashedPassword }
    });
};

const handleCreateProduct = async (
    modelName: string,
    price: number,
    image: string,
    detail: string,
    short: string,
    quantity: number,
    brand: string,
    condition: string) => {

    const newProduct = await prisma.product.create({
        data: {
            name: modelName,
            price: price,
            image: image,
            detailDesc: detail,
            shortDesc: short,
            quantity: quantity,
            brand: brand,
            condition: condition
        }
    })
    return newProduct;
}


export {
    handleSecondHandForm,
    handleOrderTracking,
    handleSignUp,
    handleDeleteUser,
    getUserByID,
    getAllSecondForm, getAllProduct, getAllUsers,
    getSecondByID,
    updateUserByID,
    getWaitingByID, getProductByID,
    handleDeleteWaiting, handleDeleteProduct,
    handleCreateProduct
};
