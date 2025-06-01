import express from "express";
import session from "express-session";
import 'dotenv/config';
import webRoutes from "./routes/web";

const app = express();
const port = process.env.PORT || 8080;

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session
app.use(session({
    secret: 'sneakfreak_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1h
}));

// Middleware toàn cục: truyền user cho tất cả các view
app.use((req, res, next) => {
    res.locals.user = (req as any).session?.user || null;
    next();
});


// static files
app.use(express.static('public'));

// routes
webRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
