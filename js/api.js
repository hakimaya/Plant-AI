//Receive an array of tasks.
//Read each task's status.
//Display it in the correct column: To Do, In Progress, or Done.
const totaltask = document.getElementById("total-tasks");
const todocount = document.getElementById("todo-count");
const progresscount = document.getElementById("progress-count");
const donecount = document.getElementById("done-count");
export async function fetchtasks(){
    try{
        let response = await fetch("./data/sample-plan.json");
        if(!response.ok) throw new Error(response.status);
        let tasks = await response.json();
        console.log(tasks);
        function affichercounter()
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

        function affichertask()
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
        affichertask();
        affichercounter();
    }
    
    catch(error){
        console.log(error.message);
    }

}