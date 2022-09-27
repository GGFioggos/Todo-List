import { projects } from "./index";

export function Project(title, description) {
    let projectTasks = [];
    return {title, description, projectTasks};
};

export function Task(title, description) {
    return {title, description};
};

export function addProject(project) {
    projects.push(project);
    console.log(projects);
};

