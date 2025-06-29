import { Server } from "http"
import 'dotenv/config'
import mongoose from "mongoose";
import app from "./app"
const port = process.env.PORT || 5000



const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.dgvjh.mongodb.net/SwiftLearn?retryWrites=true&w=majority&appName=Cluster0`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;

async function main() {
    try {
        await mongoose.connect(uri);
        server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
        })

    } catch (error) {
        console.log(error, "something is wrong")
    }
}

main()