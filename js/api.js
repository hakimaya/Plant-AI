//Receive an array of tasks.
//Read each task's status.
//Display it in the correct column: To Do, In Progress, or Done.
export async function fetchtasks(){
    try{
        let response = await fetch("./data/sample-plan.json");
        if(!response.ok) throw new Error(response.status);
        let task = await response.json();
        console.log(task);
        return task;
        function taskstatus()
        {
            
        }
    }
    
    catch(error){
        console.log(error.message);
    }

}