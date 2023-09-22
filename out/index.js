"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RebisterBot_1 = require("./Classes/RebisterBot");
const StartCommand_1 = require("./Commands/StartCommand");
const Config_json_1 = require("./Config.json");
const bot = new RebisterBot_1.RebisterBot(Config_json_1.token, false);
bot.SetCommand(new StartCommand_1.StartCommand(bot.GetBotInstance()));
bot.LaunchBot();
