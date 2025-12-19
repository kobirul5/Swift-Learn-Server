import express, { Application, NextFunction, Request, Response } from "express"
import cors from 'cors';
import cookieParser from "cookie-parser"
import router from "./router";
import GlobalErrorHandler from "./app/middlewares/globalErrorHandler";


const app: Application = express()

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://swift-learn-nu.vercel.app',
    'https://swift-learn-production.up.railway.app',
    'https://swift-learn1.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/v1",router)
app.use(GlobalErrorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Swift Learn Management')
})

app.use((req:Request, res:Response, next:NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
  next() 
}); 


export default app;