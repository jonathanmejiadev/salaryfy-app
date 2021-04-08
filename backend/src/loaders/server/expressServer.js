import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import passportMiddleware from '../../middlewares/passport';
import config from '../../config';
import indexRouter from '../../routes/index.routes';
import swaggerDoc from '../../docs/swagger.json';
import logger from '../logger';
import { errorNotFoundHandler, errorHandler } from '../../handlers/errorHandler';

class ExpressServer {
    constructor() {
        this.app = express();
        this.port = config.port || 3000;
        this.basePath = config.api.prefix;

        this._middlewares();
        this._passport();
        this._routes();
        this._swagger();
        this._error404NotFound();
        this._errorHandler();
    };

    _middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    };

    _passport() {
        this.app.use(passport.initialize());
        passport.use(passportMiddleware);
    };

    _routes() {
        this.app.head(`${this.basePath}/status`, (req, res) => {
            res.status(200).end();
        });
        this.app.use(`${this.basePath}`, indexRouter);
    };

    _swagger() {
        this.app.use(`${this.basePath}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    };

    _error404NotFound() {
        this.app.use(errorNotFoundHandler);
    }

    _errorHandler() {
        this.app.use(errorHandler);
    }

    async start() {
        this.app.listen(config.port, (err) => {
            if (err) {
                logger.error(err);
                process.exit(1);
            }
        })
    };
}

export default ExpressServer;