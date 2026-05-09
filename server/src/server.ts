import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { transcript } from './route';
import { errorMiddleware } from './middleware/errormiddleware';



const app = express()
app.use(express.json())
app.use("/transcript", transcript)

app.use(errorMiddleware)

app.listen(4000)