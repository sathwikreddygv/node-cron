"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const dataSchema = new db_1.default.Schema({
    phone: {
        required: true,
        type: String
    },
    date: {
        required: false,
        type: Date
    }
});
module.exports = db_1.default.model('Data', dataSchema);
