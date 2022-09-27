import { Project } from "./content";
import { addProject } from "./content";

export function setUpSidebar() {
    setDefaultEventListeners();

    const addProject = document.querySelector(".add-project");
    addProject.addEventListener("click", createProject);
}

function setDefaultEventListeners() {
    const default_timetables_li = document.querySelectorAll(".default-timetables li");

    default_timetables_li.forEach((timetable) => {
        timetable.addEventListener("click", () => {
            default_timetables_li.forEach((timetable) => {
                timetable.classList.remove("active");
            });
            timetable.className = "active";
        })
    });
}

function createProject() {
    const addProject = document.querySelector(".add-project");

    addProject.removeEventListener("click", createProject);

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
    setTimeout(() => addProject.addEventListener("click", createProject), 1);
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

function passProject(){
    const project = Project(document.querySelector("#project-name").value, document.querySelector("#project-description").value);
    if (project.title != ""){
        addProject(project);
    }
    resetAddProject();
}

