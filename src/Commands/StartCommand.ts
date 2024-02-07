import { Command } from "../Classes/Command";

export class StartCommand extends Command {
    Command = "start";
    Description = "Приветствие";

    Handle(): void {
        const bot = this.bot.GetBotInstance();
        bot.on("message", (message,metadata) => {
            if (message.text !== "/start") return;

            const chatId = message.chat.id;
            bot.sendMessage(chatId, "Приветик!");
        })
    }
}