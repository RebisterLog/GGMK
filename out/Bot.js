"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const TelegramBotAPI = require("node-telegram-bot-api");
class Bot extends TelegramBotAPI {
    constructor() {
        super(...arguments);
        this.commands = [];
    }
    Start(startPollingOptions) {
        this.InitCommands();
        this.startPolling(startPollingOptions);
    }
    Stop(stoptPollingOptions) {
        this.stopPolling(stoptPollingOptions);
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
    InitCommands() {
        this.commands.forEach((command) => {
            command.onInit(this);
            const regexp = new RegExp(`\\/${command.command}`);
            this.onText(regexp, (msg, match) => {
                command.onCommand(this, msg, match);
            });
        });
        const commandsList = [];
        this.commands.forEach(command => {
            commandsList.push({ command: command.command, description: command.description });
        });
        console.log(commandsList);
        this.setMyCommands(commandsList);
    }
}
exports.Bot = Bot;
