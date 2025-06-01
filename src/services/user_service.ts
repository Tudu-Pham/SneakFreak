import { prisma } from "../config/client";
import { Role } from "@prisma/client";

import getConnection from "../config/database"

const handleSecondHandForm = (Name: string, Email: string, Phone: number, brand: string, ModelName: string, Size: number, condition: string, Box: string, yearOfPurchase: number, RetailPrice: number, DesiredPassingPrice: number, images: string, comment: string) => {

    //insert into database

    //return result
}
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
}
const getWaitingByID = async (id: string) => {
    try {
        const waiting = await prisma.secondhand.findFirst({
            where: { id: +id },
        });
        return waiting;
    } catch (err) {
        console.error(err);
        return null;
    }
}
const handleDeleteWaiting = async (id: string) => {
    try {
        await prisma.secondhand.delete({
            where: {
                id: +id
            }
        });
    } catch (err) {
        console.error("Error deleting waiting record:", err);
    }
}
const updateUserByID = async (id: string, role: string) => {
    try {
        await prisma.user.update({
            where: {
                id: +id
            },
            data: {
  role: role as Role
}

        });
    } catch (err) {
        console.error("Error updating user role:", err);
    }
};




export {
    handleSecondHandForm, handleOrderTracking, handleSignUp, getAllUsers, handleDeleteUser,
    getUserByID, getAllSecondForm, getSecondByID, getWaitingByID,handleDeleteWaiting, updateUserByID
}