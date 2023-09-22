import { RebisterBot } from "./Classes/RebisterBot";
import { StartCommand } from "./Commands/StartCommand";
import { token } from './Config.json';

const bot = new RebisterBot(token, false);
bot.SetCommand(new StartCommand(bot.GetBotInstance()));

bot.LaunchBot();