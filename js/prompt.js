export function buildPrompt(project) {
  return `You are an experienced Senior Project Manager and Agile Coach specialized in software development.
Your mission is to analyze the project brief below and transform it into a detailed, realistic and well-organized development plan.
PROJECT INFORMATION:
Project Name: ${project.name}
Project Duration: ${project.duration} days
Team Size: ${project.developers} developer(s)
Technologies: ${project.technologies}
Difficulty Level: ${project.difficulty}
Project Description: ${project.description}
Project Brief:
${project.brief}
YOUR TASK:
Analyze the project carefully and break it down into actionable development tasks. For each task, generate the following information:
id: Unique task identifier (TASK-001, TASK-002...).
title: Short, clear and descriptive title.
description: Detailed explanation of what needs to be implemented.
userStories: At least one user story following the format "As a [user], I want [feature] so that [benefit]."
acceptanceCriteria: Clear and testable conditions that define when the task is complete.
priority: Low, Medium, High or Critical.
importance: Low, Medium or High.
size: XS, S, M, L or XL.
estimatedTime: Estimated effort in hours.
deadline: Day 1, Day 2, etc., within the project duration.
status: To Do, In Progress or Done.
dependencies: Array of prerequisite task IDs.
Return a JSON object with a tasks array.`;
}
