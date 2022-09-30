import { projects } from "./index";


export function saveLocally() {
    projects.forEach( project => {
        localStorage.setItem(project.title, JSON.stringify(project));
    });
}

export function loadLocally() {
    let projectTitles = Object.keys(localStorage);
    let i = 0;
    projectTitles.forEach( projectTitle => {
        projects[i] = JSON.parse(localStorage.getItem(projectTitle));
        i++;
    });
    console.log(projects);
}