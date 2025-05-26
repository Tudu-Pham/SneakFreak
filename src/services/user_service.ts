import { prisma } from "../config/client";
import getConnection from "../config/database"

const handleSecondHandForm = async (Name: string, Email: string, Phone: number, brand: string, ModelName: string, Size: number, condition: string, Box: string, yearOfPurchase: number, RetailPrice: number, DesiredPassingPrice: number, images: string, comment: string) => {
    await prisma.secondhand.create({
        data: {
            full_name: Name,
            email: Email,
            phone: Phone,
            brand: brand,
            model_name: ModelName,
            size: Size,
            condition: condition,
            box: Box,
            yearPurchase: yearOfPurchase,
            retailPrice: RetailPrice,
            desiredPrice: DesiredPassingPrice,
            images: images,
            comment: comment
        }
    })
};

const handleOrderTracking = (OrderCode: string, Email: string) => {

    //insert into database

    //return result
}
const handleSignUp = async (FName: string, LName: string, Email: string, Password: string) => {
    await prisma.user.create({
        data: {
            first_name: FName,
            last_name: LName,
            email: Email,
            password: Password
        }
    })
};

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const handleDeleteUser = async (id: string) => {
    await prisma.user.delete({
        where: {
            id: +id,
        },
    })
}

const handleDeleteWaiting = async (id: string) => {
    await prisma.secondhand.delete({
        where: {
            id: +id,
        },
    })
}

const getUserByID = async (id: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: +id },
        });
        return user;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getWaitingByID = async (id: string) => {
    try {
        const secondhand = await prisma.secondhand.findFirst({
            where: { id: +id },
        });
        return secondhand;
    } catch (err) {
        console.error(err);
        return null;
    }
}


const updateUserByID = async (id: string, role: string) => {
    try {
        const connection = await getConnection();
        const sql = 'UPDATE users SET role = ? WHERE id = ?';
        const values = ['ADMIN', id];
        await connection.execute(sql, values);
    } catch (err) {
        console.log(err);
        return [];
    }
};


const getAllSecondForm = async () => {
    const secondhands = await prisma.secondhand.findMany();
    return secondhands;
}

const getSecondByID = async (id: string) => {
    try {
        const secondhand = await prisma.secondhand.findFirst({
            where: { id: +id },
        });
        return secondhand;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export {
    handleSecondHandForm, handleOrderTracking, handleSignUp, getAllUsers, handleDeleteUser,
    getUserByID, getAllSecondForm, getSecondByID, updateUserByID, getWaitingByID, handleDeleteWaiting
}