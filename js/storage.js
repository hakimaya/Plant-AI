const storageKey = "planit-ai-projects";

export function getProjects() {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : [];
}

export function saveProject(project) {
  const projects = getProjects();
  projects.push(project);
  localStorage.setItem(storageKey, JSON.stringify(projects));
}

export function deleteProject(id) {
  const projects = getProjects().filter(function (project) {
    return project.id !== id;
  });
  localStorage.setItem(storageKey, JSON.stringify(projects));
}
