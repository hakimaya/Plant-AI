export function saveproject(project){
    const saved = localStorage.getItem("projects") || "[]";
    const projects = JSON.parse(saved);

    projects.push(project);
    localStorage.setItem("projects",JSON.stringify(projects));
}

export function getprojectbyid(id)
{
    const saved = localStorage.getItem("projects") || "[]";
    const projects = JSON.parse(saved);
    
    return projects.find(p=>p.id === id);
}

export function getprojects()
{
    const saved = localStorage.getItem("projects") || "[]";
    const projects = JSON.parse(saved);
    return projects;
}

export function deleteproject(id)
{
    const saved = localStorage.getItem("projects") || "[]";
    const projects = JSON.parse(saved);
    for(let project of projects)
    {
        if(project.id === id)
        {
            projects.splice(projects.indexOf(project),1);
            break;
        }
    }
    localStorage.setItem(("projects"), JSON.stringify(projects));
}