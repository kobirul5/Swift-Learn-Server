import express, { Application, NextFunction, Request, Response } from "express"
import cors from 'cors';
import { userRouter } from "./app/router/user.router"
import { enrollmentRoute } from "./app/router/enrollment.router"
import { courseRoute } from "./app/router/course.router"



const app: Application = express()

app.use(cors())
app.use(express.json())



app.use('/api/users/', userRouter)
app.use('/api/courses/', courseRoute)
app.use('/api/enrollment/', enrollmentRoute)


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