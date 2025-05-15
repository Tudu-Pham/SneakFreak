import { prisma } from "../config/client";
import getConnection from "../config/database"

const handleSecondHandForm = (Name: string, Email: string, Phone: number, brand: string, ModelName: string, Size: number, condition: string, Box: string, yearOfPurchase: number, RetailPrice: number, DesiredPassingPrice: number, images, comment: string) => {

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
        const connection = await getConnection();
        const sql = 'SELECT * FROM `user` WHERE `ID` = ?';
        const values = [id];
        const [result, fields] = await connection.execute(sql, values);
        return result[0];
    } catch (err) {
        console.log(err);
        return [];
    }
}

export {
    handleSecondHandForm, handleOrderTracking, handleSignUp, getAllUsers, handleDeleteUser,
    getUserByID
}