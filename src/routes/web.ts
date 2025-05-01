import express, { Express } from 'express';
import { getCart, getFavourite, getHomePage, getLogIn, getOrderTracking } from '../controllers/user_controller';

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/order-tracking', getOrderTracking);
    router.get('/favourite', getFavourite);
    router.get('/log-in', getLogIn);
    router.get('/cart', getCart);

    app.use('/', router);
}

export default webRoutes;
