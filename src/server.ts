
import { Server } from "http";
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.dgvjh.mongodb.net/SwiftLearn?retryWrites=true&w=majority&appName=Cluster0`;

let server: Server;

/**
 * Graceful shutdown handler
 */
const exitHandler = async (type: string, error?: unknown) => {
  if (error) {
    console.error(type, error);
  } else {
    console.log(`${type} received. Shutting down gracefully...`);
  }

  try {
    if (server) {
      server.close(() => {
        console.log("HTTP server closed.");
      });
    }

    await mongoose.connection.close();
    console.log("MongoDB connection closed.");

    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
};

/**
 * Process-level error handling
 */
process.on("uncaughtException", (error) =>
  exitHandler("Uncaught Exception", error)
);

process.on("unhandledRejection", (error) =>
  exitHandler("Unhandled Rejection", error)
);

/**
 * OS signals
 */
["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => exitHandler(signal));
});

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");

    server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      console.log(`Server Local link : http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
}

main();




// import { Server } from "http"
// import 'dotenv/config'
// import mongoose from "mongoose";
// import app from "./app"
// const port = process.env.PORT || 5000



// const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.dgvjh.mongodb.net/SwiftLearn?retryWrites=true&w=majority&appName=Cluster0`

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// let server: Server;

// async function main() {
//     try {
//         await mongoose.connect(uri);
//         server = app.listen(port, () => {
//         console.log(`Example app listening on port ${port}`)
//         })

//     } catch (error) {
//         console.log(error, "something is wrong")
//     }
// }

// main()