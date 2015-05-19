requirejs(["jquery.countdown.min"], function(util) {
  //alert('timer script loaded');
});

function task(cdt, bt){
  this.cdTime = cdt;
  this.breakTime = bt;
}

var taskArray = [];
var tasks = 0;

$(document).ready(function() {
  $('#newTask').click(function() {
    var errMsg = '';
    //Grab the values from the form
    var taskName = $('input[name=task]').val();
    var mins = $('input[name=mins]').val();
    var breakMins = $('input[name=break]').val();
    //Error checking the values
    if(tasks===9){
      errMsg = 'You have reached the maximum number of tasks. Get to work!';
    } else if(taskName === '' || taskName === undefined){
      errMsg = 'Please enter a task name.';
    } else if(mins === '' || mins === undefined || mins === NaN){
      errMsg = 'Please enter a valid number of minutes (1-999).';
    } else if(breakMins !== '' && typeof breakMins === 'number'){
      errMsg = 'Break minutes must be a valid number (1-999).';
    }
    if(errMsg!==''){
      $('#error-msg').remove();
      $('.taskbox-field').prepend('<p id="error-msg">' + errMsg + "</p>");
    } else {
      tasks = tasks+1;
      inputTime = mins*60000;
      var newTask = new task(inputTime, breakMins);
      taskArray.push(newTask);
      if(tasks>1){
        $('.taskbox-field').append('<div class="taskbox">'+ taskName + '<br><span id="clock">'+ mins +' Minutes </span></div>');
      }
      else {
        $('.taskbox-field').append('<div class="taskbox">'+ taskName + '<br><span id="clock"></span></div>');
        var currentTask = taskArray.shift();
        timeHandler(currentTask);
      }
    }
  });

});



function timeHandler(currtask){
  var countdownTime = new Date().getTime() + currtask.cdTime;
  $('#clock').countdown(countdownTime, function(event) {
    if(event.offset.seconds === 0 && event.offset.minutes=== 0 && event.offset.hours === 0){
      countdownFinished();
    }
    $(this).html(event.strftime('%H:%M:%S'));
  });
  return;
}

function countdownFinished(){
  $('.taskbox').first().fadeOut('slow');
  if(taskArray.size>0){

  }
}
