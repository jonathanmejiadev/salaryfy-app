import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import indexRouter from './routes/index.routes';
import mongoConnect from './database';
import config from './config';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

const app = express();
const PORT = config.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());
passport.use(passportMiddleware);

//testing
app.get('/products', (req, res) => {
    res.status(200).json({ msg: 'all products' })
});

app.get('/products/:id', (req, res) => {
    if (req.params.id === 'U0001') {
        return res.json('Product U0001 Found');
    }
    return res.status(404).json('Product not found');
})

app.post('/products', (req, res) => {
    const { name, stock } = req.body;
    if (name && stock) {
        return res.status(201).json({ success: true, message: 'Product has been created' });
    }
    return res.status(400).json({ success: false, message: 'Bad Request' });
})

app.get('/users', (req, res) => {
    res.status(200).json({ msg: 'all users' })
});

//routes
app.use('/v1', indexRouter);

const startApp = () => {
    if (config.NODE_ENV != 'test') {
        mongoConnect();
    }
    app.listen(PORT, function () {
        console.log(`Connected on http://localhost:${PORT}/v1`)
    });
}
startApp();

export default app;

//"test" : "NODE_ENV=test nodemon --exec 'mocha -R min'"
