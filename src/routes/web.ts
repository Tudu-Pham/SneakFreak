import express, { Express } from 'express';
import { getCart, getFaqs, getFavourite, getFemale, getHomePage, getLogIn, getMale, getOrderTracking, getPolicy, getPrivacy, getProduct, getSecondHand, postSecondHandForm } from '../controllers/user_controller';
import { getActiveResourcesInfo } from 'node:process';

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/order-tracking', getOrderTracking);
    router.get('/favourite', getFavourite);
    router.get('/log-in', getLogIn);
    router.get('/cart', getCart);
    router.get('/product', getProduct);
    router.get('/product/male', getMale);
    router.get('/product/female', getFemale);
    router.get('/second-hand-form', getSecondHand);
    router.get('/faqs', getFaqs);
    router.get('/policy', getPolicy);
    router.get('/privacy', getPrivacy);
    router.post('/handle-second-hand-form', postSecondHandForm);

    app.use('/', router);
}

export default webRoutes;
