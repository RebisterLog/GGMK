import { Message } from "node-telegram-bot-api";
import { Command } from "../Command";
import { Bot } from "../Bot";
import { Parser } from "../Classes/Parser";
import fs = require("fs");

export class Schedules extends Command {
    command = "schedules";
    description = "Изменения в расписании";

    private parser = new Parser();

    onInit(bot: Bot): void {
        this.parser.ParseUrls();
        this.parser.DownloadImages();

        console.log("Inited Schedules");
    }
    
    onCommand(bot: Bot, msg: Message, match: RegExpExecArray): void {
        const chatId = msg.chat.id;
        this.parser.DownloadImages();
        console.log(this.parser.imagePaths);

        this.parser.imagePaths.forEach(path => {
            const file = fs.readFileSync(path)
            bot.sendPhoto(chatId, file);
        });
    }
}