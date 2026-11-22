export function validation(projectform){
    let isValid = true;

    if(projectform.name == "" || projectform.description == "" || projectform.brief == ""|| projectform.technologies == "")
    {isValid = false}
    if(Number(projectform.duration) < 1|| Number(projectform.developers) < 1 || !Number.isInteger(Number(projectform.duration)) || !Number.isInteger(Number(projectform.developers)))
    {isValid = false}
    if(projectform.difficulty != "Beginner" &&  projectform.difficulty != "Intermediate" && projectform.difficulty != "Advanced")
    {isValid = false}
     return isValid;
}