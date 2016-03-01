/**
 * Stephen Calabro
 * sac357@drexel.edu
 * CS338:GUI, Assignment 2
 */

var todos = [];

/**
 * Model for the task
 * @param name The name for the task
 * @param status The status of the task 
 * @param completeDate The date the task has been completed in form of js date object
 */
function task(name, status, completeDate) {
    this.name = name;
    this.status = status;
    this.completeDate = completeDate;
}

/**
 * Event handler for adding a task 
 */
function AddTask()
{
	// get to do item from user input
	var name = document.getElementsByName('task')[0].value;

	if(name == "") {
		alert('Please enter task name.');
		return;
	}

	var status = false;
	var completeDate = "";

	// create new task
	var newTask = new task(name, status, completeDate);
	// add new task to list
	todos.push(newTask);
		
	//update view
	this.view();
}

/**
 * Function used to update a row
 * @param taskIndex The index in the todos array
 */
function updateStatus(taskIndex)
{
	// update the model: if the item has been checked, set status to complete
	// and add completion date. If item is unchecked, set status to incomplete
	// and set completion date to be empty.
	
	if(todos[taskIndex].status == true) {
		todos[taskIndex].status = false;
		todos[taskIndex].completeDate = "";
	} else {
		todos[taskIndex].status = true;
		var d = new Date();
		todos[taskIndex].completeDate = " " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + formatAMPM(d);
	}
	
	// update the view
	view();

}

/**
 * Function used to update the view
 */
function view()
{
	// This function takes care of rendering the to do list
	// All UI elements should be added to the "container" 
	// section of the HTML. 

	// get container element by id
	var container = document.getElementById("container");

	container.innerHTML = "";

	// go through todo list items and add them
	for(var i = 0; i < todos.length; i ++) {
		var div = document.createElement('div');

		div.className = 'row';

		var status = '';

		if(todos[i].status == true) {
			status = 'checked';
		}

		div.innerHTML = '<input class="todoItem" type="checkbox" onclick="updateStatus('+i+')" '+status+'>\
   						 <label for="todoItem">'+todos[i].name+'</label>'+todos[i].completeDate+' \
   						 <br>';

		container.appendChild(div);
	}
	

    // clear the text in the input field for todo item
	document.getElementsByName("task")[0].value = "";

}

/**
 * Function used to calculate the am/pm time at the end of the date
 * @param date The js date object to be converted
 * @return The string of time formated HH:MM:SS AM/PM
 */
function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0'+minutes : minutes;

	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	var strTime = hours + ':' + minutes + ":" + seconds + ' ' + ampm;
	return strTime;
}
