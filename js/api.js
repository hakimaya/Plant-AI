export async function fetchtasks(){
    try{
        let response = await fetch("./data/sample-plan.json");
        if(!response.ok) throw new Error(response.status);
        let tasks = await response.json();
        //console.log(tasks);
        return(tasks);
    }
    
    catch(error){
        console.log(error.message);
    }

}