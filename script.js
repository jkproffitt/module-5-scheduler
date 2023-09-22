var busyTime = localStorage.getItem('busy');
var currentHour = parseInt(dayjs().format('H'));
if (localStorage.getItem('busy') == null) {
	var busyObj = [];
} else {
	var busyObj = JSON.parse(localStorage.getItem('busy'));
}

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

	function saveAttempt(event) {
		event.preventDefault();
		var btn = event.target.parentElement.id + 'txt';
		var timeBlockTxt = document.getElementById(
			event.target.parentElement.id + 'txt'
		);
		if (timeBlockTxt.value !== ' ') {
			busyObj.push({
				[btn]: timeBlockTxt.value,
			});
			localStorage.setItem('busy', JSON.stringify(busyObj));
		}
	}

	function fillCalendar() {
		for (var i = 0; i < busyObj.length; i++) {
			var text = JSON.stringify(busyObj[i]);
			var key = Object.keys(busyObj[i])[0];
			var value = Object.values(busyObj[i])[0];
			document.getElementById(key).innerHTML = value;
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
