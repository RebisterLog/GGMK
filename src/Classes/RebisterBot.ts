import TelegramAPI = require('node-telegram-bot-api');
import { Command } from './Command';

export class RebisterBot {
    public bot;
    private IsOnline = false;
    private commands: Command[] = [];

    constructor(public readonly token: string, public readonly isPolling?: boolean) {
        this.bot = new TelegramAPI(token, {polling: isPolling || false});
    }

    private InitCommands() {
        this.commands.forEach((command) => { command.Handle(); })
        const commandsList: TelegramAPI.BotCommand[] = [];

        this.commands.forEach(Command => {
            commandsList.push({command: Command.Command, description: Command.Description} as TelegramAPI.BotCommand)
        });

        console.log(commandsList)
        
        this.bot.setMyCommands(commandsList)
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

    public AddCommand(command: Command) {
        this.commands.push(command);
    }

    public SetCommands(commands: Command[]) {
        this.commands = commands;
    }

    public RemoveCommand(command: Command) {
        const index = this.commands.indexOf(command);
        if (index === -1) return;
        this.commands.splice(index,1);
    }

    public GetBotInstance() {return this.bot;}

}