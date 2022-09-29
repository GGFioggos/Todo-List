import { Project } from "./content";
import { addProject } from "./content";
import { setUpContent } from "./content";

export function setUpSidebar() {
    setActiveEventListeners(document.querySelectorAll(".default-timetables li"));

    const addProject = document.querySelector(".add-project");
    addProject.addEventListener("click", createProjectUI);
}

function setActiveEventListeners(li_items) {
    li_items.forEach((li) => {
        if (!li.classList.contains("add-project")) {
            li.addEventListener("click", () => {
                li_items.forEach((li) => {
                    li.classList.remove("active");
                });
                li.classList.add("active");
                setUpContent();
            })
        }
    });
}

function createProjectUI() {
    const addProject = document.querySelector(".add-project");

    addProject.removeEventListener("click", createProjectUI);

    inputAddProject();

    const confirm = document.querySelector(".confirm");
    const cancel = document.querySelector(".cancel");

    confirm.addEventListener("click", passProject);
    cancel.addEventListener("click", resetAddProject);
}

function resetAddProject() {
    const addProject = document.querySelector(".add-project");
    addProject.classList.remove("active");
    addProject.innerHTML = `<i class="fas fa-plus" aria-hidden="true"></i>
    <div class="add-text">Add project</div>`;
    setTimeout(() => addProject.addEventListener("click", createProjectUI), 1);
}

function inputAddProject() {
    const addProject = document.querySelector(".add-project");
    addProject.classList.add("active");

    addProject.innerHTML = `<input id="project-name" placeholder="Project name">
    <textarea id="project-description" placeholder="Description"></textarea>
    <div class="confirmation">
    <div class="confirm">Add</div>
    <div class="cancel">Cancel</div>
    </div>`
}

function passProject() {
    const project = Project(document.querySelector("#project-name").value, document.querySelector("#project-description").value);

    if (project.title != "") {
        addProject(project);
        createProject(project);
    }
    resetAddProject();
}

function createProject(project) {
    const projectsUL = document.querySelector(".projects");
    const addProject = document.querySelector(".add-project");
    const li = document.createElement("li");
    li.className = "project";

    const icon = document.createElement("i");
    icon.className = "fas fa-tasks";
    icon.ariaHidden = true;

    const projectTitle = document.createElement("div");
    projectTitle.className = "project-title";
    projectTitle.textContent = project.title;

    const projectDescription = document.createElement("div");
    projectDescription.className = "project-description";
    projectDescription.textContent = project.description;

    const projectinfo = document.createElement("div");
    projectinfo.className = "project-info";

    projectinfo.appendChild(projectTitle);
    projectinfo.appendChild(projectDescription);

    li.appendChild(icon);
    li.appendChild(projectinfo);

    projectsUL.insertBefore(li, addProject);

    setActiveEventListeners(document.querySelectorAll("#sidebar ul li"));
}

