import express, { Application, NextFunction, Request, Response } from "express"
import cors from 'cors';
import { userRouter } from "./app/router/user.router"
import { enrollmentRoute } from "./app/router/enrollment.router"
import { courseRoute } from "./app/router/course.router"
import cookieParser from "cookie-parser"
import { studentsRouter } from "./app/router/students.router";


const app: Application = express()

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://swift-learn-nu.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/api/users/', userRouter)
app.use('/api/courses/', courseRoute)
app.use('/api/enrollment/', enrollmentRoute)
app.use('/api/students/', studentsRouter)


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