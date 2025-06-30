import express, { Application, NextFunction, Request, Response } from "express"
import { userRouter } from "./app/controllers/user.controller"
import { enrollmentRoute } from "./app/controllers/enrollment.controller"
import { courseRoute } from "./app/controllers/course.controllers"
const app: Application = express()
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