import TelegramAPI = require('node-telegram-bot-api');
import { BotCommand } from './BotCommand';

export class RebisterBot {
    public bot;
    private IsOnline = false;
    private commands: BotCommand[] = [];

    constructor(public readonly token: string, public readonly isPolling?: boolean) {
        this.bot = new TelegramAPI(token, {polling: isPolling || false});
    }

    private InitCommands() {
        this.commands.forEach((command) => { command.Handle(); })
    }

    public LaunchBot() {
        if (this.isPolling) return;

        this.InitCommands();
        this.bot.startPolling();

        this.IsOnline = true;
    }

    public StopBot() {
        if (!this.IsOnline) return
        
        this.bot.stopPolling();
    }

    public SetCommand(command: BotCommand) {
        this.commands.push(command);
    }

    public RemoveCommand(command: BotCommand) {
        const index = this.commands.indexOf(command);
        if (index === -1) return;
        this.commands.splice(index,1);
    }

    public GetBotInstance() {return this.bot;}

}