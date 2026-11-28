import { getdata,ui,affichercounter,affichertask,afficherprojects,checkprojects } from "./ui.js";
import { getprojectbyid,getprojects } from "./storage.js";
import { validation } from "./validation.js";
ui();
if (window.location.pathname.endsWith("/project.html")) {
    const params = new URLSearchParams(window.location.search);
    let p = getprojectbyid(params.get("id"));
    if (p) {
        affichercounter(p);
        affichertask(p);
    }
}
if(window.location.pathname === "/" || window.location.pathname.endsWith("/index.html"))
{
    const empty = document.getElementById("empty");
    if(checkprojects(getprojects()))
    {
        empty.classList.add("hidden");
    }
    else
    {
        empty.classList.remove("hidden");
    }
    afficherprojects(getprojects());
}
