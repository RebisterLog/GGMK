"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const Command_1 = require("../Classes/Command");
class StartCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.Command = "start";
        this.Description = "Приветствие";
    }
    Handle() {
        const bot = this.bot.GetBotInstance();
        bot.on("message", (message, metadata) => {
            if (message.text !== "/start")
                return;
            const chatId = message.chat.id;
            bot.sendMessage(chatId, "Приветик!");
        });
    }
}
exports.StartCommand = StartCommand;
