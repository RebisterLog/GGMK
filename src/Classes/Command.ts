import BotCommand = require('node-telegram-bot-api');
import { RebisterBot } from './RebisterBot';

export abstract class Command {
    abstract Command: string;
    abstract Description: string;
    
    constructor(public readonly bot: RebisterBot) {}

    abstract Handle(): void;
}