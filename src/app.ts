import express, { Application, NextFunction, Request, Response } from "express"
const app: Application = express()
app.use(express.json())


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