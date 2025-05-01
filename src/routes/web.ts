import express, { Express } from 'express';
import { getHomePage, getOrderTracking } from '../controllers/user_controller';

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/order-tracking', getOrderTracking);

    app.use('/', router);
}

export default webRoutes;
