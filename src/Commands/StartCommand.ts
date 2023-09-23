import { BotCommand } from "../Classes/BotCommand";

export class StartCommand extends BotCommand {
    Handle(): void {
        const bot = this.bot.GetBotInstance();
        bot.on("message", (message,metadata) => {
            if (message.text !== "/start") return;

            const chatId = message.chat.id;
            bot.sendMessage(chatId, "Приветик!");
        })
    }
}