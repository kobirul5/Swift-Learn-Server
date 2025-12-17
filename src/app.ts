import express, { Application, NextFunction, Request, Response } from "express"
import cors from 'cors';
import { courseRoute } from "./app/course/course.router"
import cookieParser from "cookie-parser"
import { moduleRoute } from "./app/courseModule/module.router";
import { lectureRoute } from "./app/lecture/lecture.route";
import { userRouter } from "./app/users/user.router";
import { enrollmentRoute } from "./app/enrollment/enrollment.router";
import { studentsRouter } from "./app/student/students.router";


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


app.use('/api/users/', userRouter)
app.use('/api/courses/', courseRoute)
app.use('/api/enrollment/', enrollmentRoute)
app.use('/api/students/', studentsRouter)
app.use('/api/modules/', moduleRoute)
app.use('/api/lecture/', lectureRoute)


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