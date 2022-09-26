export function setUpSidebar() {
    setDefaultEventListeners();

    const addProject = document.querySelector(".add-project");
    addProject.addEventListener("click", createProject);

    //insert before
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
    const testinput = document.createElement("input");
    testinput.placeholder = "Project name";

    addProject.removeEventListener("click", createProject);

    inputAddProject();
    const confirm = document.querySelector(".confirm");
    const cancel = document.querySelector(".cancel");

    // confirm.addEventListener("click", addProject); //TO BE ADDED
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

    addProject.innerHTML = `<input placeholder="Project name">
    <div class="confirmation">
    <div class="confirm">Add</div>
    <div class="cancel">Cancel</div>
    </div>`
}
