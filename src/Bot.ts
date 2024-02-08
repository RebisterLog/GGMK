import TelegramBotAPI = require('node-telegram-bot-api');
import { Command } from './Command';

export class Bot extends TelegramBotAPI{
    private commands: Command[] = [];
    
    public Start(startPollingOptions?: TelegramBotAPI.StartPollingOptions) {
        this.InitCommands();
        this.startPolling(startPollingOptions);
    }

    public Stop(stoptPollingOptions?: TelegramBotAPI.StopPollingOptions) {
        this.stopPolling(stoptPollingOptions);
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

    public InitCommands() {
        this.commands.forEach((command) => {
            command.onInit(this);
            const regexp = new RegExp(`\\/${command.command}`);
            
            this.onText(regexp, (msg, match) => {
                command.onCommand(this, msg, match);
            });
        });

        const commandsList: TelegramBotAPI.BotCommand[] = [];

        this.commands.forEach(command => {
            commandsList.push({command: command.command, description: command.description});
        });

        console.log(commandsList);
        
        this.setMyCommands(commandsList);
    }
}