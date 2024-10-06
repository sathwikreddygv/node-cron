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
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("./db");
const Model = require('./models/data');
const whatsAppClient = require("@green-api/whatsapp-api-client");
require('dotenv').config();
const restAPI = whatsAppClient.restAPI({
    idInstance: process.env.ID_INSTANCE || '',
    apiTokenInstance: process.env.API_TOKEN_INSTANCE || ''
});
const _main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let records = yield Model.find();
        if (records && records.length > 0) {
            for (let i = 0; i < records.length; i++) {
                let single_record = records[i];
                if (single_record.phone && single_record.date) {
                    if (new Date() > new Date(single_record.date)) {
                        const differenceInMilliseconds = new Date().getTime() - new Date(single_record.date).getTime();
                        const millisecondsInDay = 1000 * 60 * 60 * 24;
                        const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInDay);
                        if (differenceInDays >= 26 && differenceInDays <= 36) {
                            yield restAPI.message.sendMessage(single_record.phone, null, `Hey there! 🌼 Flow Friend is Back with a friendly reminder: Your period is around the corner. It's been ${differenceInDays} days since your last one.\n\nJust reply with "Got my period" to update your date.`);
                        }
                    }
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
node_cron_1.default.schedule(`0 11 * * *`, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`running your task...`);
    (0, db_1.connectDB)().then(() => { _main(); });
}));
