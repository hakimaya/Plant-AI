export function loadDemoPlan() {
  return fetch("./data/sample-plan.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Impossible de charger le plan démo (HTTP " + response.status + ").");
      }
      return response.json();
    })
    .then(function (plan) {
      if (!plan || !Array.isArray(plan.tasks) || !plan.tasks.length) {
        throw new Error("Le fichier démo ne contient pas de tâches.");
      }
      return plan.tasks;
    })
    .catch(function (error) {
      throw new Error("Échec du mode démo. " + error.message);
    });
}
