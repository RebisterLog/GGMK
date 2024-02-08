import TelegramBot, { BotCommand } from 'node-telegram-bot-api';
import { Bot } from './Bot';

export abstract class Command implements BotCommand{
    abstract onInit(bot: Bot): void
    abstract onCommand(bot: Bot, msg: TelegramBot.Message, match: RegExpExecArray | null): void
    abstract command: string;
    abstract description: string;
}