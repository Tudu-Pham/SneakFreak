import express, { Express } from 'express';
import { getHomePage } from '../controllers/user_controller';

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    app.use('/', router);
}

export default webRoutes;
