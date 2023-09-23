import TelegramBot = require('node-telegram-bot-api');
import TelegramAPI = require('node-telegram-bot-api');
import { RebisterBot } from './RebisterBot';

export abstract class BotCommand {
    public readonly Name!: string;
    public readonly Description!: string;
    
    constructor(public readonly bot: RebisterBot) {}

    abstract Handle(): void;
}