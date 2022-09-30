import { setUpSidebar } from "./sidebar";
import { setUpContent } from "./content";
import { Project } from "./content";
import { Task } from "./content";
import { loadLocally, saveLocally } from "./localStorage";

export let projects = [];

if( localStorage.length == 0){
	projects = createDefaultProjects();
	saveLocally();
}else {
	loadLocally();
}

setUpSidebar();
setUpContent();

function createDefaultProjects() {
	const todayProject = Project("Today", "");
	todayProject.projectTasks = [
		Task("Groceries", "Get groceries from the supermarket"),
		Task("Homework", "Do the homework"),
	];

	const thisWeekProject = Project("This Week", "");
	thisWeekProject.projectTasks = [
		Task("Service car", "Service the car to Tomas' service shop"),
		Task("Finish CS project", "Finish finals project about AI"),
	];

	const thisMonthProject = Project("This Month", "");
	thisMonthProject.projectTasks = [
		Task("Pay Electricity Bills", "Pay bills online"),
		Task("Search for new job", "Search linkedIn for job postings"),
	];

	return [todayProject, thisWeekProject, thisMonthProject];
}
