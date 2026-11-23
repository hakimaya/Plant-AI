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
        function affichertask()
        {
            let total = 0;
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
            }
            totaltask.textContent = done + todo;
            todocount.textContent = todo;
            donecount.textContent = done;
        }
        affichertask();
    }
    
    catch(error){
        console.log(error.message);
    }

}