import { Message } from "node-telegram-bot-api";
import { Command } from "../Command";
import { Bot } from "../Bot";

export class Start extends Command {
    command = "start";
    description = "Приветствие";

    onInit(): void {
        console.log("Inited!");
    }
    
    onCommand(bot: Bot, msg: Message, match: RegExpExecArray): void {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Hello!");
    }
}