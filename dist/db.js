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
exports.connectDB = void 0;
// db.ts
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
// MongoDB connection URI
const mongoURI = process.env.MONGODB_URL ? process.env.MONGODB_URL : '';
// Function to connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
});
exports.connectDB = connectDB;
exports.default = mongoose_1.default; // Export mongoose instance for use in other files
