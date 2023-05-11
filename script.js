// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const today = dayjs();
$(function () {
  // Listener for click events on the save button
  $('.time-block').on('click', '.saveBtn', saveEvent);
  
  // Apply the past, present, or future class to each time
  // block by comparing the id to the current hour
  setColors();

  // Get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  loadEvents();
  // Display the current date in the header of the page.
  $('#currentDay').text(today.format('dddd, MMMM D'));
});

function saveEvent(event) {
  const eventItem = $(event.target).parent();
  const eventText = eventItem.children('textarea').val();
  const eventId = eventItem.attr('id');
  localStorage.setItem(eventId, eventText);
}

function loadEvents() {
  for(var i=9; i<=17; i++) {
    var eventId = `hour-${i}`;
    var eventText = localStorage.getItem(eventId);
    if(eventText !== null) {
      $("#"+eventId).children('textarea').text(eventText);
    }
  }
}

function setColors() {
  const currentHour = parseInt(today.format('H'));
  for(var i=9; i<=17; i++) {
    var eventId = `#hour-${i}`;
    if(currentHour < i) {
      $(eventId).addClass('future');
    }
    else if(currentHour === i) {
      $(eventId).addClass('present');
    }
    else {
      $(eventId).addClass('past');
    }
  }
}