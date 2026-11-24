

//validation des values de formulaire 
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

/*
 * TASK DATA VALIDATION RULES
 *
 * id                 : Non-empty string, unique task ID.
 * title              : Non-empty string.
 * description        : Non-empty string.
 * userStories        : Array of strings.
 * acceptanceCriteria : Array of strings.
 * priority           : Must be Low, Medium, High, or Critical.
 * importance         : Must be Low, Medium, or High.
 * size               : Must be XS, S, M, L, or XL.
 * estimatedTime      : Positive number (hours).
 * deadline           : Must follow "Day N" and be within project duration.
 * status             : Must be To Do, In Progress, or Done.
 * dependencies       : Array of existing task IDs.
 *
 * Return false if any validation rule fails.
 * Return true only if all tasks are valid.
 */


//validation de data task
const properties = ["id", "title", "description", "userStories", "acceptanceCriteria", "priority", "importance", "size", "estimatedTime", "deadline", "status", "dependencies"];
// Required task properties

export function validationdata(data, duration) {
    let arr = [];

    // Validate the main object
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return false;
    }

    // Validate the tasks array
    if (!Array.isArray(data.tasks) || data.tasks.length === 0) {
        return false;
    }

    for (let i = 0; i < data.tasks.length; i++) {

        let task = data.tasks[i];

        if (typeof task !== "object" || task === null || Array.isArray(task)) {
            return false;
        }

        // Check required properties
        for (let property of properties) {
            if (!Object.hasOwn(task, property)) {
                return false;
            }
        }

        if (typeof task.id !== "string") {
            return false;
        }

        let id = task.id.trim();

        if (id === "" || arr.includes(id)) {
            return false;
        }

        arr.push(id);

        if (typeof task.title !== "string" || task.title.trim() === "") {
            return false;
        }

        if (typeof task.description !== "string" || task.description.trim() === "") {
            return false;
        }

        if (!Array.isArray(task.userStories)) {
            return false;
        }

        for (let story of task.userStories) {
            if (typeof story !== "string" || story.trim() === "") {
                return false;
            }
        }

        if (!Array.isArray(task.acceptanceCriteria)) {
            return false;
        }

        for (let criteria of task.acceptanceCriteria) {
            if (typeof criteria !== "string" || criteria.trim() === "") {
                return false;
            }
        }

        if (!["Low", "Medium", "High", "Critical"].includes(task.priority)) {
            return false;
        }

        if (!["Low", "Medium", "High"].includes(task.importance)) {
            return false;
        }

        if (!["XS", "S", "M", "L", "XL"].includes(task.size)) {
            return false;
        }

        if (typeof task.estimatedTime !== "number" ||
            !Number.isFinite(task.estimatedTime) ||
            task.estimatedTime <= 0) {
            return false;
        }

        if (typeof task.deadline !== "string") {
            return false;
        }

        let deadline = task.deadline.split(" ");

        if (deadline.length !== 2 || deadline[0] !== "Day") {
            return false;
        }

        let day = Number(deadline[1]);

        if (!Number.isInteger(day) || day < 1 || day > Number(duration)) {
            return false;
        }

        if (!["To Do", "In Progress", "Done"].includes(task.status)) {
            return false;
        }

        if (!Array.isArray(task.dependencies)) {
            return false;
        }
    }

    for (let task of data.tasks) {
        for (let dependency of task.dependencies) {

            if (typeof dependency !== "string") {
                return false;
            }

            if (!arr.includes(dependency.trim())) {
                return false;
            }
            if (dependency.trim() === task.id.trim()) {
                return false;
            }
        }
    }

    return true;
}