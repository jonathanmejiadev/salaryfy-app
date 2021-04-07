import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import indexRouter from './routes/index.routes';
import mongoConnect from './database';
import config from './config';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';
import swaggerDoc from './docs/swagger.json';


const app = express();
const PORT = config.PORT || 5000;

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());
passport.use(passportMiddleware);

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

