import express from 'express';
import {json} from "express";
import cors from 'cors';
import "express-async-errors"
import {handleError, ValidationError} from "./utils/errors";
import rateLimit from 'express-rate-limit';

const app = express();

app.use(cors({
    origin: 'https://localhost:3000'
}));

app.use(json());
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})
app.use(limiter)

app.get('/', async (req, res) => {
    throw new ValidationError("Damn!")
});

app.use(handleError)


app.listen(3001, '0.0.0.0', () => {
    console.log("localhost listening http://localhost:3001");
});