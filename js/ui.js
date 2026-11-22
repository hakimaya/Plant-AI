import { validation } from "./validation.js";
const projectform = document.querySelector("#project-form");
const generatebutton = document.getElementById("generate");
projectform.addEventListener("input", function(){
    let projectfrom = {
    name : document.getElementById("name").value.trim(),
    description : document.getElementById("description").value.trim(),
    brief : document.getElementById("brief").value.trim(),
    duration : document.getElementById("duration").value.trim(),
    developers : document.getElementById("developers").value.trim(),
    technologies : document.getElementById("technologies").value.trim(),
    difficulty : document.getElementById("difficulty").value.trim(),
}
if(!validation(projectform)){generatebutton.disabled = true}
if(validation(projectform)){generatebutton.disabled = false}
})