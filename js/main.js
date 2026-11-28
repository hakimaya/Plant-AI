import { validation, validationdata } from "./validation.js";
import { getdata,ui,affichercounter,affichertask } from "./ui.js";
import { fetchtasks } from "./api.js";
import { getprojectbyid } from "./storage.js";
ui();
if (window.location.pathname.endsWith("/project.html")) {
    const params = new URLSearchParams(window.location.search);
    let p = getprojectbyid(params.get("id"));
    if (p) {
        affichercounter(p);
        affichertask(p);
    }
}
