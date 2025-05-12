import express, { Express } from 'express';
import { Request, Response } from 'express';
import { getAdmin, getCart, getFaqs, getFavourite, getFemale, getHomePage, getLogIn, getMale, getOrderTracking, getPolicy, getPrivacy, getProduct, getSecondHand, getSignUp, getViewUser, postDeleteUser, postOrderTracking, postSecondHandForm, postSignUp } from '../controllers/user_controller';
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
    router.get('/sign-up', getSignUp);
    router.get('/admin', getAdmin);
    router.post('/admin', async (req: Request, res: Response) => {
        await postSignUp(req, res);
    });
    router.post('/handle-second-hand-form', postSecondHandForm);
    router.post('/handle-order-tracking', postOrderTracking);
    router.post('/handle-delete-user/:id', postDeleteUser);
    router.get('/handle-view-user/:id', getViewUser);

    app.use('/', router);
}

export default webRoutes;
