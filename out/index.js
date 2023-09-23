"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RebisterBot_1 = require("./Classes/RebisterBot");
const StartCommand_1 = require("./Commands/StartCommand");
const Config_json_1 = require("./Config.json");
const GetSchedules_1 = require("./Commands/GetSchedules");
const bot = new RebisterBot_1.RebisterBot(Config_json_1.token, false);
bot.SetCommands([
    new StartCommand_1.StartCommand(bot),
    new GetSchedules_1.GetSchedules(bot),
]);
bot.LaunchBot();
