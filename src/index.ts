import { RebisterBot } from "./Classes/RebisterBot";
import { StartCommand } from "./Commands/StartCommand";
import { token } from './Config.json';
import { GetSchedules } from "./Commands/GetSchedules";


const bot = new RebisterBot(token, false);

bot.SetCommands([
    new StartCommand(bot),
    new GetSchedules(bot),
]);

bot.LaunchBot();