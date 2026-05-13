import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'
import { summary } from './routes/summary';
import { errorMiddleware } from './middleware/errormiddleware';
import { loggerMiddleware } from './middleware/loggermiddleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize'
import { main } from './config';
import logger from './utils/logger';
import { Inputs } from './routes/main-routes';


const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(mongoSanitize())

const limit = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false
})

app.use(helmet());

app.use(loggerMiddleware)

app.use("/api/v2", Inputs);

app.use(errorMiddleware)


main().then(() => {
    app.listen(PORT, () => {
        logger.info("The Server is live on Port " + PORT)
    })
})
