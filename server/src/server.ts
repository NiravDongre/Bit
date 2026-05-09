import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { summary } from './route';
import { errorMiddleware } from './middleware/errormiddleware';
import { loggerMiddleware } from './middleware/loggermiddleware';
import helmet from 'helmet';
import { main } from './config';
import logger from './utils/logger';


const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(helmet());

app.use(loggerMiddleware)

app.post("/transcript", summary);

app.use(errorMiddleware)


main().then(() => {
    app.listen(PORT, () => {
        logger.info("The Server is live on Port" + PORT)
    })
})
