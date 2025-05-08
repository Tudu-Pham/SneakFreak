import getConnection from "../config/database"

const handleSecondHandForm = (Name: string, Email: string, Phone: number, brand: string, ModelName: string, Size: number, condition: string, Box: string, yearOfPurchase: number, RetailPrice: number, DesiredPassingPrice: number, images, comment: string) => {

    //insert into database

    //return result
}
const handleOrderTracking = (OrderCode: string, Email: string) => {

    //insert into database

    //return result
}
const handleSignUp = (FName: string, LName: string, Email: string, Password: string, Repassword: string) => {

    //insert into datbase

    //return result
}
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

export { handleSecondHandForm, handleOrderTracking, handleSignUp, getAllUsers }