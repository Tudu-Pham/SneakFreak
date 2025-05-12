import getConnection from "../config/database"

const handleSecondHandForm = (Name: string, Email: string, Phone: number, brand: string, ModelName: string, Size: number, condition: string, Box: string, yearOfPurchase: number, RetailPrice: number, DesiredPassingPrice: number, images, comment: string) => {

    //insert into database

    //return result
}
const handleOrderTracking = (OrderCode: string, Email: string) => {

    //insert into database

    //return result
}
const handleSignUp = async (FName: string, LName: string, Email: string, Password: string, Repassword: string) => {
    const connection = await getConnection();
    try {
        const [results] = await connection.query(
            `INSERT INTO users (first_name, last_name, Email, Password, RePassword) VALUES (?, ?, ?, ?, ?)`,
            [FName, LName, Email, Password, Repassword]
        );
        return results;
    } catch (err) {
        console.error("MySQL insert error:", err);
        throw err;
    }
};

const getAllUsers = async () => {
    const connection = await getConnection();

    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
    return "tudu";
}

const handleDeleteUser = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'DELETE FROM `users` WHERE `ID` = ? ';
        const values = [id];
        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const getUserByID = async (id: string) => {
    try {
        const connection = await getConnection();
        const sql = 'SELECT * FROM `users` WHERE `ID` = ?';
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