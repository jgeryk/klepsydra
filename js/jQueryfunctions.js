requirejs(["jquery.tinytimer.min"], function(util) {
  //  alert('timer script loaded');
});

function task(tid, cdt, bt){
  this.taskid = tid;
  this.cdTime = cdt;
  this.breakTime = bt;
}

var errMsg = '';
var taskArray = [];
var tasks = 0;

$(document).ready(function() {
  $('#newTask').click(function() {
    //Grab the values from the form
    var taskName = $('input[name=task]').val();
    var mins = $('input[name=mins]').val();
    var breakMins = $('input[name=break]').val();
    //Error checking the values
    if(taskArray.length===9){
      errMsg = 'You have reached the maximum number of tasks. Get to work!';
    } else if(taskName === '' || taskName === undefined){
      errMsg = 'Please enter a task name.';
    } else if(mins === '' || mins === undefined || mins === NaN){
      errMsg = 'Please enter a valid number of minutes (1-999).';
    } else if(breakMins !== '' && typeof breakMins === 'number'){
      errMsg = 'Break minutes must be a valid number (1-999).';
    } else if (mins>360){
      errMsg = "Doing a single task for over 6 hours isn't very efficient!";
    } else if (breakMins>120){
      errMsg = "Try to take a break for less than two hours!";
    }
    if(errMsg!==''){
      $('#error-msg').remove();
      $('.taskbox-field').prepend('<p id="error-msg">' + errMsg + "</p>");
    } else {
      tasks = tasks+1;
      inputTime = mins*60000;
      var newTask = new task(tasks, inputTime, breakMins);
      taskArray.push(newTask);
      if(taskArray.length>1){
        $('.taskbox-field').append('<div class="taskbox"><div class="taskname">'+ taskName + '</div><br><div class="timer"><span id="clock' + tasks +'">'+ mins +' Minutes </span></div></div>');
      }
      else {
        $('.taskbox-field').append('<div class="taskbox"><div class="taskname">' + taskName + '</div><br><div class="timer"><span id="clock' + tasks + '"></span></div></div>');
        timeHandler(taskArray[0]);
      }
    }
  });

});



function timeHandler(currtask){
  if(errMsg!==''){
    $('#error-msg').remove();
  }
  var t = Date.now() + currtask.cdTime;
  $('#clock' + currtask.taskid).tinyTimer({ to: t,
                          onEnd: function(){
                            if(currtask.breakTime !== undefined && currtask.breakTime>0){
                              document.getElementById('bell').play();
                              breakHandler(currtask);
                            } else {
                              countdownFinished(currtask);
                            }
                          }});
  // $('.clock' + currtask.taskid).countdown(countdownTime, function(event) {
  //   if (event.offset.seconds === 0 && event.offset.minutes === 0 && event.offset.hours === 0){
  //     countdownFinished();
  //   }
  //   $(this).html(event.strftime('%H:%M:%S'));
  // });
  return;
}

function countdownFinished(task){
  var fadeOutMs = 2500;
  taskArray.shift();
  document.getElementById('bell').play();
  $('.taskbox:first-child').fadeOut(fadeOutMs);
  setTimeout(function () {$('.taskbox:first-child').remove();}, fadeOutMs);
  if(taskArray.length>0){
    timeHandler(taskArray[0]);
  }
}

function breakHandler(task){
  if(errMsg!==''){
    $('#error-msg').remove();
  }
  $('.taskbox-field').prepend('<p id="break-msg"> Breaking for <span id="breakclock"></span></p>');
  var b = Date.now() + (task.breakTime*60000);
  $('#breakclock').tinyTimer({ to: b,
                          onEnd: function(){
                            $('#break-msg').fadeOut(2000);
                            $('#break-msg').remove();
                            countdownFinished(task);
                          }});

}
