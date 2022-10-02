import { projects } from "./index";
import { saveLocally } from "./localStorage";

export function setUpContent() {
	const content = document.querySelector("#content");
	content.innerHTML = "";

	let currentProject = getCurrentProject();

	createProjectUI(currentProject);
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
	if (currentProject.classList.contains("project")) {
		return projects.find((project) => project.title == currentProject.childNodes[1].childNodes[0].textContent);
	} else {
		return projects.find((project) => project.title == currentProject.textContent.trim());
	}
}

function createProjectUI(currentProject) {
	const content = document.querySelector("#content");
	content.innerHTML = "";

	content.appendChild(projectName(currentProject));

	content.appendChild(createProjectTaskCards(currentProject));
}

function createProjectTaskCards(currentProject) {
	const tasks = document.createElement("div");
	tasks.className = "project-tasks";

	for (let task in currentProject.projectTasks) {
		const card = document.createElement("div");
		card.className = "task-card";

		const taskTitle = document.createElement("p");
		taskTitle.className = "task-title";
		taskTitle.textContent = currentProject.projectTasks[task].title;

		const taskDescription = document.createElement("p");
		taskDescription.className = "task-description";
		taskDescription.textContent = currentProject.projectTasks[task].description;

		const round = document.createElement("div");
		round.className = "round";

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = `checkbox${task}`;

		if (currentProject.projectTasks[task].finished) {
			checkbox.checked = true;
			card.style.backgroundPosition = "right";
			card.style.background = "linear-gradient(to left, rgb(14, 180, 17) 50%, rgba(188, 188, 188, 0.476) 50%) right";
			card.style.backgroundSize = "200%";
		}

		checkbox.addEventListener("click", (event) => {
			let id = event.target.id.toString();
			completeTask(id);
		});

		const checkboxlabel = document.createElement("label");
		checkboxlabel.htmlFor = `checkbox${task}`;

		round.appendChild(checkbox);
		round.appendChild(checkboxlabel);

		card.appendChild(taskTitle);
		card.appendChild(taskDescription);
		card.appendChild(round);

		tasks.appendChild(card);
	}

	// ADD NEW TASK BTN
	const addTaskCard = document.createElement("div");
	addTaskCard.addEventListener("click", createAddTaskUI);
	addTaskCard.className = "task-card add-task";

	const icon = document.createElement("i");
	icon.className = "fas fa-plus";
	icon.ariaHidden = true;

	const addTaskText = document.createElement("p");
	addTaskText.textContent = "Add new task";

	addTaskCard.appendChild(icon);
	addTaskCard.appendChild(addTaskText);
	tasks.appendChild(addTaskCard);

	return tasks;
}

function completeTask(id) {
	animateCard(id);
	let finishedTask = id.substr(id.length - 1);
	finishedTask = getCurrentProject().projectTasks[finishedTask];
	finishedTask.finished = finishedTask.finished ? false : true;
	saveLocally();
}

function createAddTaskUI() {
	const addTaskCard = document.querySelector(".add-task");

	addTaskCard.removeEventListener("click", createAddTaskUI);

	inputAddTask();

	const confirm = document.querySelector(".add-task .confirm");
	const cancel = document.querySelector(".add-task .cancel");

	confirm.addEventListener("click", passTask);
	cancel.addEventListener("click", resetAddTask);
}

function inputAddTask() {
	const addTaskCard = document.querySelector(".add-task");
	addTaskCard.classList.add("active");

	addTaskCard.innerHTML = `<input id="task-name" maxlength= "40" placeholder="Task name">
    <input id="task-description" maxlength= "100" placeholder="Description"></input>
    <div class="confirmation">
    <div class="confirm">Add</div>
    <div class="cancel">Cancel</div>
    </div>`


}

function passTask() {
	const task = Task(document.querySelector("#task-name").value, document.querySelector("#task-description").value);

	if (task.title != "") {
		const currentProject = getCurrentProject();
		currentProject.projectTasks.push(task);
		createProjectUI(currentProject);
		saveLocally();
	}
}

function resetAddTask() {
	const addTaskCard = document.querySelector(".add-task");
	addTaskCard.classList.remove("active");
	addTaskCard.innerHTML = `<i class="fas fa-plus" aria-hidden="true"></i><p>Add new task</p>`;
	setTimeout(() => addTaskCard.addEventListener("click", createAddTaskUI), 1);
}

function projectName(currentProject) {
	const header = document.createElement("h2");
	header.textContent = currentProject.title;

	return header;
}

function animateCard(id) {
	const checkbox = document.getElementById(id);
	const card = checkbox.parentElement.parentElement;
	if (checkbox.checked) {
		card.style.backgroundPosition = "right";
		card.style.background = "linear-gradient(to left, rgb(14, 180, 17) 50%, rgba(188, 188, 188, 0.476) 50%) right";
		card.style.backgroundSize = "200%";
		card.style.transition = ".3s ease-out";
	} else {
		card.style.backgroundPosition = "left";
	}
}

export function Project(title, description) {
	let projectTasks = [];
	return { title, description, projectTasks };
}

export function Task(title, description) {
	let finished = false;
	return { title, description, finished };
}

export function addProject(project) {
	projects.push(project);
	setUpContent();
}