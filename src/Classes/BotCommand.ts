import TelegramBot = require('node-telegram-bot-api');
import TelegramAPI = require('node-telegram-bot-api');

export abstract class BotCommand {
    public readonly Name!: string;
    public readonly Description!: string;
    
    constructor(public readonly bot: TelegramBot) {}

    abstract Handle(): void;
}