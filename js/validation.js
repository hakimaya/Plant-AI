export function validateProject(project) {
  const errors = {};
  for (const field of ["name", "description", "brief", "technologies"]) {
    if (!/\S/.test(project[field])) {
      errors[field] = "Ce champ est obligatoire.";
    }
  }
  for (const field of ["duration", "developers"]) {
    const value = Number(project[field]);
    if (!/^\d+$/.test(project[field]) || !Number.isSafeInteger(value) || value < 1) {
      errors[field] = "Saisissez un entier supérieur ou égal à 1.";
    }
  }
  if (!["Beginner", "Intermediate", "Advanced"].includes(project.difficulty)) {
    errors.difficulty = "Choisissez un niveau de difficulté.";
  }
  return errors;
}
