import express, { Express } from 'express';
import { getCart, getFavourite, getFemale, getHomePage, getLogIn, getMale, getOrderTracking, getProduct, getSecondHand } from '../controllers/user_controller';

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/order-tracking', getOrderTracking);
    router.get('/favourite', getFavourite);
    router.get('/log-in', getLogIn);
    router.get('/cart', getCart);
    router.get('/product', getProduct);
    router.get('/male', getMale);
    router.get('/female', getFemale);
    router.get('/second-hand-form', getSecondHand);

    app.use('/', router);
}

export default webRoutes;
