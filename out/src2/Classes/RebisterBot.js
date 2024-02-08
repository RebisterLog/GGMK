"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RebisterBot = void 0;
const TelegramAPI = require("node-telegram-bot-api");
class RebisterBot {
    constructor(token, isPolling) {
        this.token = token;
        this.isPolling = isPolling;
        this.IsOnline = false;
        this.commands = [];
        this.bot = new TelegramAPI(token, { polling: isPolling || false });
    }
    InitCommands() {
        this.commands.forEach((command) => { command.Handle(); });
        const commandsList = [];
        this.commands.forEach(Command => {
            commandsList.push({ command: Command.Command, description: Command.Description });
        });
        console.log(commandsList);
        this.bot.setMyCommands(commandsList);
    }
    LaunchBot() {
        if (this.isPolling)
            return;
        this.InitCommands();
        this.bot.startPolling();
        this.IsOnline = true;
    }
    StopBot() {
        if (!this.IsOnline)
            return;
        this.bot.stopPolling();
    }
    AddCommand(command) {
        this.commands.push(command);
    }
    SetCommands(commands) {
        this.commands = commands;
    }
    RemoveCommand(command) {
        const index = this.commands.indexOf(command);
        if (index === -1)
            return;
        this.commands.splice(index, 1);
    }
    GetBotInstance() { return this.bot; }
}
exports.RebisterBot = RebisterBot;
