"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSchedules = void 0;
const BotCommand_1 = require("../Classes/BotCommand");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class Parser {
    constructor() {
        this.url = 'http://uoggmk.by/%D1%80%D0%B0%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5/';
        this.headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.0 (Edition Yx GX)"
        };
        this.Axio = axios_1.default.create();
        this.imagesUrls = [];
    }
    GetImages() {
        return this.imagesUrls;
    }
    ParseUrls() {
        this.Axio.get(this.url).then(response => {
            const html = response.data;
            const parsedInfo = cheerio_1.default.load(html);
            const table = parsedInfo("img");
            this.imagesUrls[0] = table[5].attribs["src"];
            this.imagesUrls[1] = table[6].attribs["src"];
            return this.imagesUrls;
        });
    }
}
const parser = new Parser();
parser.ParseUrls();
class GetSchedules extends BotCommand_1.BotCommand {
    Handle() {
        const bot = this.bot.GetBotInstance();
        bot.on("message", (message, metadata) => {
            if (message.text !== "/get_schedules")
                return;
            parser.ParseUrls();
            const urls = parser.GetImages();
            const chatId = message.chat.id;
            bot.sendMessage(chatId, "Изменения в расписании:");
            bot.sendMessage(chatId, `${urls[0]}\n${urls[1]}`);
        });
    }
}
exports.GetSchedules = GetSchedules;
