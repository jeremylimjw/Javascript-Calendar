var calendar_selected_date = new Date()

$(document).ready(function() {
	updateCalendarHeader()
	generateDates()
});

$("#calendar-nav-left").click(function() {
	decrementMonth()
	updateCalendarHeader()
	generateDates()
})

$("#calendar-nav-right").click(function() {
	incrementMonth()
	updateCalendarHeader()
	generateDates()
})

$("#calendar-body").on("click", "td", function() {
	alert($(this).data("value"))
})

generateDates = () => {
	$("#calendar-body").empty()

	var dates = []
	var pointer = new Date(calendar_selected_date.getFullYear(), calendar_selected_date.getMonth(), 1)
	var upper_bound_date = new Date(calendar_selected_date.getFullYear(), calendar_selected_date.getMonth() + 1, 0)

	if (pointer.getDay() > 0) pointer.setDate(pointer.getDate() - pointer.getDay())
	if (upper_bound_date.getDay() < 6) upper_bound_date.setDate(upper_bound_date.getDate() + (6 - upper_bound_date.getDay()))

	while (pointer <= upper_bound_date) {
		dates.push(new Date(pointer))
		pointer.setDate(pointer.getDate() + 1)
	}

	populateCalendar(dates)
}

populateCalendar = (dates) => {
	var counter = 1
	var str = "<tr>"

	for(var i = 0; i < dates.length; i++) {
		str += constructCell(dates[i])

		if (counter === 7) {
			str += "</tr>"
			$("#calendar-body").append(str)
			str = "<tr>"
			counter = 1
		} else {
			counter++
		}
	}
}

constructCell = (date) => {
	var today = new Date()

	if (date.toDateString() == today.toDateString()) {
		var str = "<td data-value='" + date + "'><div class='day today'>" + date.getDate() + "</div><div class='calendar-label'>Do work</div></td>"
	} else if (date.getMonth() === calendar_selected_date.getMonth()) {
		var str = "<td data-value='" + date + "'><div class='day'>" + date.getDate() + "</div></td>"
	} else {
		var str = "<td class='disabled' data-value='" + date + "'><div class='day'>" + date.getDate() + "</div></td>"
	}
	return str
}

toFullMonthString = (date) => {
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
	return months[date.getMonth()];
}

updateCalendarHeader = () => {
	$("#calendar-header-text").text(toFullMonthString(calendar_selected_date) + " " + calendar_selected_date.getFullYear())
}

decrementMonth = () => {
	calendar_selected_date.setMonth(calendar_selected_date.getMonth() - 1)
}

incrementMonth = () => {
	calendar_selected_date.setMonth(calendar_selected_date.getMonth() + 1)
}
