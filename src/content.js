import { projects } from "./index";

export function setUpContent() {
	const content = document.querySelector("#content");
	content.innerHTML = "";

	let currentProject = getCurrentProject();

	createProjectUI(currentProject);
}

export function Project(title, description) {
	let projectTasks = [];
	return { title, description, projectTasks };
}

export function Task(title, description) {
	return { title, description };
}

export function addProject(project) {
	projects.push(project);
	setUpContent();
}

function noProjects() {
	const header = document.createElement("h2");
	header.className = "header";
	header.textContent = "Create a project to add Tasks";
	return header;
}

function getCurrentProject() {
	const possibilities = [
		...document.querySelectorAll(".projects li"),
		...document.querySelectorAll(".default-timetables li"),
	];

	for (let possibility in possibilities) {
		if (possibilities[possibility].classList.contains("active") && !possibilities[possibility].classList.contains("add-project")) {
			var currentProject = possibilities[possibility];
			break;
		}
	}
	if (currentProject.classList.contains("project")){
		return projects.find((project) => project.title == currentProject.childNodes[1].childNodes[0].textContent);
	}else {
		return projects.find((project) => project.title == currentProject.textContent.trim());
	}
	throw 
}

function createProjectUI(currentProject) {
	const content = document.querySelector("#content");

	content.appendChild(projectName(currentProject));

	for (let task in currentProject.projectTasks){
		const card = document.createElement("div");
		card.className = "task-card";

		const taskTitle = document.createElement("p");
		taskTitle.className = "task-title";
		taskTitle.textContent = currentProject.projectTasks[task].title;

		const taskDescription = document.createElement("p");
		taskDescription.className = "task-description";
		taskDescription.textContent = currentProject.projectTasks[task].description;

		card.appendChild(taskTitle);
		card.appendChild(taskDescription);

		content.appendChild(card);
	}

}

function projectName(currentProject) {
	const header = document.createElement("h2");
	header.textContent = currentProject.title;

	return header;
}
