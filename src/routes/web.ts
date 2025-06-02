import express, { Express } from 'express';
import { Request, Response } from 'express';
import { getAdmin, getAnalytic, getCart, getCreateProduct, getFaqs, getFavourite, getFemale, getHomePage, getLogIn, getMale, getManageOrder, getManageProduct, getOrderTracking, getPolicy, getPrivacy, getProduct, getSecondHand, getSecondHandForm, getSignUp, getViewUser, getViewWaiting, postCreateProduct, postDeleteUser, postDeleteWaiting, postOrderTracking, postSecondHandForm, postSignUp, postUpdateUser, postLogIn, postUpdateWaiting } from '../controllers/user_controller';
import { handleForgotPassword, renderResetForm, handleResetPassword } from '../controllers/user_controller';

import { getActiveResourcesInfo } from 'node:process';
import { isAdmin } from "../middleware/auth";
import fileUploadMiddleware from '../middleware/multer';


const router = express.Router();
const webRoutes = (app: Express) => {
  router.get('/', getHomePage);
  router.get('/order-tracking', getOrderTracking);
  router.get('/favourite', getFavourite);
  router.get('/log-in', getLogIn);
  router.post('/log-in', async (req: Request, res: Response) => {
    await postLogIn(req, res);
  });

  router.get('/cart', getCart);
  router.get('/product', getProduct);
  router.get('/product/male', getMale);
  router.get('/product/female', getFemale);
  router.get('/second-hand-form', getSecondHand);
  router.get('/faqs', getFaqs);
  router.get('/policy', getPolicy);
  router.get('/privacy', getPrivacy);
  router.get('/sign-up', getSignUp);

  //admin page
  router.get('/admin', isAdmin, getAdmin);
  router.post('/admin', (req: Request, res: Response, next) => {
    postSignUp(req, res).catch(next);
  });
  router.post('/handle-second-hand-form', async (req: Request, res: Response) => {
    await postSecondHandForm(req, res);
  });
  router.post('/handle-order-tracking', postOrderTracking);
  router.post('/handle-delete-user/:id', postDeleteUser);
  router.post('/handle-update-user', postUpdateUser);
  router.post('/handle-delete-waiting/:id', postDeleteWaiting);
  router.post('/create-product', fileUploadMiddleware('image'), async (req: Request, res: Response) => {
    await postCreateProduct(req, res);
  });
  router.get('/handle-view-waiting/:id', getViewWaiting);
  router.get('/handle-view-user/:id', getViewUser);
  router.get('/handle-second-hand-form', getSecondHandForm);
  router.get('/handle-product', getManageProduct);
  router.get('/handle-order', getManageOrder);
  router.get('/analytic', getAnalytic);
  router.get('/create-product', getCreateProduct);
  router.get('/profile', (req: Request, res: Response) => {
    const user = (req as any).session.user;
    if (!user) return res.redirect('/log-in');

    res.render('profile', { user });
  });
  router.get('/forgot-password', (req, res) => {
    res.render('forgot_password');
  });
  // Gửi link reset mật khẩu qua email
  router.post('/forgot-password', async (req: Request, res: Response) => {
    await handleForgotPassword(req, res);
  });

  // Giao diện nhập mật khẩu mới (từ link trong email)
  router.get('/reset-password/:token', async (req: Request, res: Response) => {
    await renderResetForm(req, res);
  });

  // Xử lý đổi mật khẩu mới
  router.post('/reset-password/:token', async (req: Request, res: Response) => {
    await handleResetPassword(req, res);
  });
  router.post('/handle-update-waiting', postUpdateWaiting);


  app.use('/', router);
}

export default webRoutes;