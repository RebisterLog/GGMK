"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedules = void 0;
const Command_1 = require("../Command");
const Parser_1 = require("../Classes/Parser");
const fs = require("fs");
function delay(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
}
class Schedules extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.command = "schedules";
        this.description = "Изменения в расписании";
        this.parser = new Parser_1.Parser();
    }
    onInit(bot) {
        this.parser.ParseUrls();
        this.parser.DownloadImages();
        console.log("Inited Schedules");
    }
    onCommand(bot, msg, match) {
        const chatId = msg.chat.id;
        this.parser.DownloadImages();
        console.log(this.parser.imagePaths);
        this.parser.imagePaths.forEach(path => {
            const file = fs.readFileSync(path);
            bot.sendPhoto(chatId, file);
        });
    }
}
exports.Schedules = Schedules;
