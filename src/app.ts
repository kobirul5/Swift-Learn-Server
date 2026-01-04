import express, { Application, NextFunction, Request, Response } from "express"
import cors from 'cors';
import cookieParser from "cookie-parser"
import GlobalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./router";


const app: Application = express()

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://swift-learn-nu.vercel.app',
    'https://swift-learn-production.up.railway.app',
    'https://swift-learn1.vercel.app',
    'https://swift-learn-nu.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Swift Learn Management')
})
// Routes
app.use("/api/v1", router)
app.use(GlobalErrorHandler)



app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("HIT APP.TS 404 HANDLER");
  res.status(404).json({
    success: false,
    message: 'Route not found - MODIFIED MYSTERY',
  });
  next()
});


export default app;