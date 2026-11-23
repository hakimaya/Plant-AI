import { validation } from "./validation.js";
import { ui,affichercounter,affichertask } from "./ui.js";
import { fetchtasks } from "./api.js";
ui();
let tasks = await fetchtasks();
affichercounter(tasks);
affichertask(tasks);