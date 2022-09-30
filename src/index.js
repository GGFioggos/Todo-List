import { setUpSidebar } from "./sidebar";
import { setUpContent } from "./content";
import { Project } from "./content";
import { Task } from "./content";


export let projects = createDefaultProjects();

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
		Task("Finish CS project", ""),
	];

	const thisMonthProject = Project("This Month", "");
	thisMonthProject.projectTasks = [
		Task("Pay Electricity Bills", "Pay bills online"),
		Task("Search for new job", ""),
	];

	return [todayProject, thisWeekProject, thisMonthProject];
}
