import { validation } from "./validation.js";
const projectformulaire = document.querySelector("#project-form");
const generatebutton = document.getElementById("generate");
const generationp = document.getElementById("generation");
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
    if(projectformulaire)
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
            else{
                generationp.textContent = "Génération du plan en cours...";
                generatebutton.disabled = true;
            }
        })
    }
}
const totaltask = document.getElementById("total-tasks");
const todocount = document.getElementById("todo-count");
const progresscount = document.getElementById("progress-count");
const donecount = document.getElementById("done-count");
export function affichercounter(tasks)
{
    if(totaltask)
    {
            let todo = 0;
        let done = 0;
        let progress = 0;
        for(let task of tasks.tasks)
        {
            if(task.status === "Done"){
                done ++;
            }
            else if(task.status === "To Do")
            {
                todo ++;
            }
            else if(task.status === "In Progress")
            {
                progress++;
            }
        }
        totaltask.textContent = done + todo + progress;
        todocount.textContent = todo;
        donecount.textContent = done;
        progresscount.textContent = progress;
    }
    
}

export function affichertask(tasks)
{
    if(totaltask)
    {
        const todotask = document.getElementById("todo-tasks");
        const progresstask = document.getElementById("progress-tasks");
        const donetask = document.getElementById("done-tasks");

        let contenutodo = "";
        let contenuprogress = "";
        let contenudone = "";

        for(let task of tasks.tasks)
        {
            if(task.status === "Done")
            {
                contenudone += `<article class="task-card border border-slate-300 rounded-lg bg-white p-4 mb-3">
                <span class="task-id">${task.id}</span>

                <h3 class="task-title">${task.title}</h3>

                <div class="task-info">
                    <span class="task-priority">${task.priority}</span>
                    <span class="task-time">${task.estimatedTime}</span>
                    <span class="task-deadline">${task.deadline}</span>
                </div>
                </article>`
            }
        }
        donetask.innerHTML = contenudone;
        for(let task of tasks.tasks)
        {
            if(task.status === "To Do")
            {
                contenutodo += `<article class="task-card border border-slate-300 rounded-lg bg-white p-4 mb-3">
                <span class="task-id">${task.id}</span>

                <h3 class="task-title">${task.title}</h3>

                <div class="task-info">
                    <span class="task-priority">${task.priority}</span>
                    <span class="task-time">${task.estimatedTime}</span>
                    <span class="task-deadline">${task.deadline}</span>
                </div>
                </article>`
            }
        }
        todotask.innerHTML = contenutodo;
        for(let task of tasks.tasks)
        {
            if(task.status === "In Progress")
            {
                contenuprogress += `<article class="task-card border border-slate-300 rounded-lg bg-white p-4 mb-3">
                <span class="task-id">${task.id}</span>

                <h3 class="task-title">${task.title}</h3>

                <div class="task-info">
                    <span class="task-priority">${task.priority}</span>
                    <span class="task-time">${task.estimatedTime}</span>
                    <span class="task-deadline">${task.deadline}</span>
                </div>
                </article>`
            }
        }
        progresstask.innerHTML = contenuprogress;
    }

}
