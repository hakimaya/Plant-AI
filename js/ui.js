import { validation } from "./validation.js";
const projectformulaire = document.querySelector("#project-form");
const generatebutton = document.getElementById("generate");
function getdata(){
    let projectform = {
    name : document.getElementById("name").value.trim(),
    description : document.getElementById("description").value.trim(),
    brief : document.getElementById("brief").value.trim(),
    duration : document.getElementById("duration").value.trim(),
    developers : document.getElementById("developers").value.trim(),
    technologies : document.getElementById("technologies").value.trim(),
    difficulty : document.getElementById("difficulty").value.trim(),
    }
    return projectform;
}
export function ui()
{
    projectformulaire.addEventListener("input", function(){
        let p = getdata();
    if(!validation(p)){generatebutton.disabled = true}
    if(validation(p)){generatebutton.disabled = false}
    })

    projectformulaire.addEventListener("submit",function(event){
        event.preventDefault();
        let p = getdata();
        if(!validation(p)){return;}
    })
}
