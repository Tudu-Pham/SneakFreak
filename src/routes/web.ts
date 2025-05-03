import express, { Express } from 'express';
import { getCart, getFaqs, getFavourite, getFemale, getHomePage, getLogIn, getMale, getOrderTracking, getPolicy, getProduct, getSecondHand } from '../controllers/user_controller';
import { getActiveResourcesInfo } from 'node:process';

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
    router.get('/faqs', getFaqs);
    router.get('/policy', getPolicy);

    app.use('/', router);
}

export default webRoutes;
