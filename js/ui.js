import { validateProject } from "./validation.js";
import { buildPrompt } from "./prompt.js";
import { loadDemoPlan } from "./api.js";
import { getProjects, saveProject, deleteProject } from "./storage.js";

export function setupSettings() {
  const dialog = document.getElementById("settings-dialog");
  document.getElementById("settings").addEventListener("click", function () {
    dialog.showModal();
  });
}

export function setupDashboard() {
  const list = document.getElementById("projects");
  if (!list) return;

  const empty = document.getElementById("empty");
  const template = document.getElementById("project-card");

  function render() {
    const projects = getProjects();
    list.replaceChildren();
    empty.hidden = projects.length > 0;
    for (const project of projects) {
      const card = template.content.cloneNode(true);
      const total = project.tasks.length;
      const done = project.tasks.filter(function (task) {
        return task.status === "Done";
      }).length;
      const percentage = total === 0 ? 0 : Math.round(done / total * 100);
      card.querySelector("h2").textContent = project.name;
      card.querySelector(".description").textContent = project.description;
      card.querySelector(".counts").textContent = total + " tâches · " + done + " terminées · " + (total - done) + " restantes";
      card.querySelector(".percentage").textContent = "Avancement : " + percentage + " %";
      card.querySelector("progress").value = percentage;
      card.querySelector("button").addEventListener("click", function () {
        if (confirm("Supprimer ce projet ?")) {
          deleteProject(project.id);
          render();
        }
      });
      list.append(card);
    }
  }

  render();
}

export function setupProjectForm() {
  const form = document.getElementById("project-form");
  if (!form) return;

  const button = document.getElementById("generate");
  const retry = document.getElementById("retry");
  const status = document.getElementById("generation");
  const result = document.getElementById("result");
  const touched = new Set();
  let loading = false;
  let saved = false;

  function checkForm() {
    const project = Object.fromEntries(new FormData(form));
    for (const field of Object.keys(project)) {
      project[field] = project[field].trim();
    }
    const errors = validateProject(project);
    for (const field of Object.keys(project)) {
      const message = touched.has(field) ? errors[field] || "" : "";
      document.getElementById(field + "-error").textContent = message;
      document.getElementById(field).setAttribute("aria-invalid", Boolean(message));
    }
    const valid = Object.keys(errors).length === 0;
    button.disabled = loading || saved || !valid;
    retry.disabled = button.disabled;
    return { project, valid };
  }

  form.addEventListener("input", function (event) {
    touched.add(event.target.name);
    saved = false;
    result.hidden = true;
    checkForm();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (loading || saved) return;
    for (const field of new FormData(form).keys()) {
      touched.add(field);
    }
    const { project, valid } = checkForm();
    if (!valid) return;

    loading = true;
    checkForm();
    retry.hidden = true;
    status.textContent = "Chargement du plan démo…";
    const prompt = buildPrompt(project);

    loadDemoPlan()
      .then(function (tasks) {
        saveProject({ ...project, id: crypto.randomUUID(), tasks });
        saved = true;
        const list = document.getElementById("demo-tasks");
        list.replaceChildren();
        for (const task of tasks) {
          const item = document.createElement("li");
          item.textContent = task.title;
          list.append(item);
        }
        document.getElementById("prompt").textContent = prompt;
        status.textContent = "Projet enregistré.";
        result.hidden = false;
      })
      .catch(function (error) {
        status.textContent = error.message;
        retry.hidden = false;
      })
      .finally(function () {
        loading = false;
        checkForm();
      });
  });

  retry.addEventListener("click", function () {
    form.requestSubmit();
  });
  checkForm();
}
