import express, { Application, urlencoded, json } from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import rateLimit from 'express-rate-limit';
import { router } from './routes/routers';



export const app: Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});


app.use(json());
app.use(urlencoded({ extended: true }));
app.use(limiter);
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Medial og images API !' });
});


app.get('/success', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Loggged In Successfully' });
});

const getHealth = async (req, res) => {
  try {
    const response = await axios.get('https://um-ai-task.onrender.com/sysetem/health/');
  } catch (error) {
    console.log(error);
  }
}

setInterval(() => {   
  getHealth(null, null);
}, 60000);


app.get('/_health', (req: Request, res: Response) => {
  return res.status(200).json({
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  });
});


// Handle 404 errors
app.use('*', (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Endpoint not found',
    data: null,
  });
});
