"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
let server;
/**
 * Graceful shutdown handler
 */
const exitHandler = (type, error) => __awaiter(void 0, void 0, void 0, function* () {
    if (error) {
        console.error(type, error);
    }
    else {
        console.log(`${type} received. Shutting down gracefully...`);
    }
    try {
        if (server) {
            server.close(() => {
                console.log("HTTP server closed.");
            });
        }
        yield mongoose_1.default.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
    }
    catch (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
    }
});
/**
 * Process-level error handling
 */
process.on("uncaughtException", (error) => exitHandler("Uncaught Exception", error));
process.on("unhandledRejection", (error) => exitHandler("Unhandled Rejection", error));
/**
 * OS signals
 */
["SIGTERM", "SIGINT"].forEach((signal) => {
    process.on(signal, () => exitHandler(signal));
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri);
            console.log("MongoDB connected");
            server = app_1.default.listen(port, () => {
                console.log(`Server listening on port ${port}`);
                console.log(`Server Local link : http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("Startup failed:", error);
            console.log("Shutting down due to startup failure.");
            process.exit(1);
        }
    });
}
main();
