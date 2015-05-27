requirejs(["jquery.tinytimer.min"], function(util) {
  //  alert('timer script loaded');
});

function task(tid, cdt, bt){
  this.taskid = tid;
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
    if(taskArray.length===10){
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
      var newTask = new task(tasks, inputTime, breakMins);
      taskArray.push(newTask);
      if(taskArray.length>1){
        $('.taskbox-field').append('<div class="taskbox">'+ taskName + '<br><span id="clock' + tasks +'">'+ mins +' Minutes </span></div>');
      }
      else {
        $('.taskbox-field').append('<div class="taskbox">'+ taskName + '<br><span id="clock' + tasks + '"></span></div>');
        timeHandler(taskArray[0]);
      }
    }
  });

});



function timeHandler(currtask){
  var t = Date.now() + currtask.cdTime;
  $('#clock' + currtask.taskid).tinyTimer({ to: t,
                          onEnd: function(){
                            countdownFinished(currtask);
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
  taskArray.shift();
  $('.taskbox-field').first().fadeOut('slow');
  // alert(taskArray.length);
  if(taskArray.length>0){
    timeHandler(taskArray[0]);
  }
}
