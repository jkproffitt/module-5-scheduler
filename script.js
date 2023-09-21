var busyTime = localStorage.getItem('busy');

// TODO: change to below when done-
// var currentHour = parseInt(dayjs().format('H'));
var currentHour = 11;
if (localStorage.getItem('busy') == null) {
	var busyObj = [];
} else {
	var busyObj = JSON.parse(localStorage.getItem('busy'));
}
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
	var hourEl = document.getElementsByClassName('row time-block');
	for (var i = 0; i < hourEl.length; i++) {
		var divHr = hourEl[i].id.slice(5);
		hourEl[i].addEventListener('click', saveAttempt);
		canBeScheduled(currentHour, divHr);
	}
	if (busyObj != []) {
		fillCalendar();
	}
	// TODO: Add a listener for click events on the save button. This code should
	// use the id in the containing time-block as a key to save the user input in
	// local storage. HINT: What does `this` reference in the click listener
	// function? How can DOM traversal be used to get the "hour-x" id of the
	// time-block containing the button that was clicked? How might the id be
	// useful when saving the description in local storage?
	//
	// TODO: Add code to apply the past, present, or future class to each time
	function canBeScheduled(currentHour, divHr) {
		var hourBlockEl = document.getElementById('hour-' + divHr);

		if (currentHour > divHr) {
			hourBlockEl.classList.add('past');
		} else if (currentHour == divHr) {
			hourBlockEl.classList.add('present');
		} else {
			hourBlockEl.classList.add('future');
		}
	}

	// TODO: Add code to get any user input that was saved in localStorage and set
	// the values of the corresponding textarea elements. HINT: How can the id
	// attribute of each time-block be used to do this?

	function fillCalendar() {
		for (var i = 0; i < busyObj.length; i++) {
			var text = JSON.stringify(busyObj[i]);
			console.log(text);
		}
	}

	function saveAttempt(event) {
		event.preventDefault();
		var btn = event.target.parentElement.id + 'txt';
		var timeBlockTxt = document.getElementById(
			event.target.parentElement.id + 'txt'
		);
		console.log(btn, timeBlockTxt.value);
		if (timeBlockTxt.value !== ' ') {
			busyObj.push({
				[btn]: timeBlockTxt.value,
			});
			console.log(busyObj);
			localStorage.setItem('busy', JSON.stringify(busyObj));
		}
	}
	// TODO: Add code to display the current date in the header of the page.
	// Current Time
	var time = dayjs().format('h:mm:ss A');
	$('#currentTime').text('The current time is: ' + time);
	// Today's Date
	var date = dayjs().format('MMM DD, YYYY');
	$('#currentDateAndTime').text('Today is: ' + date + ' at ' + time);
});
