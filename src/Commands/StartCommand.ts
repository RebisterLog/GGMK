import { BotCommand } from "../Classes/BotCommand";

export class StartCommand extends BotCommand {
    Handle(): void {
        this.bot.on("message", (message,metadata) => {
            if (message.text !== "/start") return;

            const chatId = message.chat.id;
            this.bot.sendMessage(chatId, "Приветик!");
        })
    }
}