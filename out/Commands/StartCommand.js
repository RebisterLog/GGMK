"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const BotCommand_1 = require("../Classes/BotCommand");
class StartCommand extends BotCommand_1.BotCommand {
    Handle() {
        this.bot.on("message", (message, metadata) => {
            if (message.text !== "/start")
                return;
            const chatId = message.chat.id;
            this.bot.sendMessage(chatId, "Приветик!");
        });
    }
}
exports.StartCommand = StartCommand;
