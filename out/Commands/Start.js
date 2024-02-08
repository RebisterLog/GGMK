"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Start = void 0;
const Command_1 = require("../Command");
class Start extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.command = "start";
        this.description = "Приветствие";
    }
    onInit() {
        console.log("Inited!");
    }
    onCommand(bot, msg, match) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Hello!");
    }
}
exports.Start = Start;
