import { validation,validationdata } from "./validation.js";
import { fetchtasks } from "./api.js";
import { saveproject } from "./storage.js";


const projectformulaire = document.querySelector("#project-form");
const generatebutton = document.getElementById("generate");
const generationp = document.getElementById("generation");

//getting data from formulaire 
export function getdata(){
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


//disbale end enable button and submit 
export async function ui()
{
    if(projectformulaire)
    {
        projectformulaire.addEventListener("input", function(){
        let p = getdata();
        if(!validation(p)){generatebutton.disabled = true}
        if(validation(p)){generatebutton.disabled = false}
        })

        projectformulaire.addEventListener("submit",async function(event){
            event.preventDefault();
            let p = getdata();
            if(!validation(p)){return;}
            else{
                generationp.textContent = "Génération du plan en cours...";
                generatebutton.disabled = true;
                let tasks = await fetchtasks();
                if(validationdata(tasks,p.duration))
                {
                    const project = {
                        ...p,
                        id: crypto.randomUUID(),
                        tasks: tasks.tasks
                    };
                    saveproject(project);
                    window.location.href = `./project.html?id=${project.id}`;
                }
    
            }
        })
    }
}


//counter counting number of tasks 
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


//affichage des tasks
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


export function afficherprojects(projects)
{
    const cardcontainer = document.getElementById("projects-container");
    let content = "";
    for(let project of projects)
    {
        content += `
        <article class="space-y-2 rounded border border-slate-300 bg-white p-4">
            <h2 class="text-lg font-bold">${project.name}</h2>

            <p class="description">${project.description}</p>

            <p class="text-sm">${project.technologies}</p>

            <p class="text-sm">Difficulty: ${project.difficulty}</p>

            <p class="counts text-sm">
                Total tasks: ${project.tasks.length}
            </p>

            <a href="./project.html?id=${project.id}"
               class="text-indigo-600">
                Open Project
            </a>
        </article>
        `;
    }
    cardcontainer.innerHTML = content;
} 
export function checkprojects(projects)
{
    if(projects.length != 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}