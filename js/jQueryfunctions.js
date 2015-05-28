requirejs(["jquery.tinytimer.min"], function(util) {
  //  alert('timer script loaded');
});

function task(tid, cdt, bt){
  this.taskid = tid;
  this.cdTime = cdt;
  this.breakTime = bt;
}

var errMsg = '';
//Array of task objects to organize the flow of the page
var taskArray = [];
var tasks = 0;
var fadeOutMs = 1750;

$(document).ready(function() {
  $('#newTask').click(function() {
    //Grab the values from the form
    var taskName = $('input[name=task]').val();
    var mins = $('input[name=mins]').val();
    var breakMins = $('input[name=break]').val();
    //Error checking the values
    if(taskArray.length===9){
      errMsg = 'You have reached the maximum number of tasks (' +taskArray.length+'). Get to work!';
    } else if(taskName === '' || taskName === undefined){
      errMsg = 'Please enter a task name.';
    } else if(mins === '' || mins === undefined || mins === NaN){
      errMsg = 'Please enter a valid number of minutes (1-360).';
    } else if(breakMins !== '' && typeof breakMins === 'number'){
      errMsg = 'Break minutes must be a valid number (1-120).';
    } else if (mins>360){
      errMsg = "Doing a single task for over 6 hours isn't very efficient!";
    } else if (breakMins>120){
      errMsg = "Try to take a break for less than two hours!";
    }
    if(errMsg!=='') {
      $('#error-msg').remove();
      $('.message-field').append('<p id="error-msg">' + errMsg + "</p>");
    } else {
      $('#error-msg').remove();
      tasks = tasks+1;
      inputTime = mins*60000;
      var newTask = new task(tasks, inputTime, breakMins);
      taskArray.push(newTask);
      //Add the new taskbox to the DOM, start counter if first taskbox
      if(taskArray.length>1){
        $('.taskbox-field').append('<div class="taskbox"><div class="taskname">'+ taskName + '</div><br><div class="timer"><div id="clock' + tasks +'">'+ mins +' Minutes </div></div></div>');
      }
      else {
        $('#description').fadeOut(fadeOutMs);
        $('.taskbox-field').append('<div class="taskbox"><div class="taskname">' + taskName + '</div><br><div class="timer"><div id="clock' + tasks + '"></div></div></div>');
        if(taskArray.length===1){
          timeHandler(taskArray[0]);
        }
      }
      //Add break information to new taskbox
      if(newTask.breakTime>0){
        $('#clock' + tasks).after('<div class="break-info">Break: ' + newTask.breakTime +' Minutes</div>');
      } else {
        $('#clock' + tasks).after('<div class="break-info">No break!</div>');
      }
    }
    errMsg = '';
    // $('.taskbox:not(:first-child)').click(function(){
    //   var n = $(this).children().eq(2).children().eq(0).attr('id');
    //   var clockId = n.charAt(5);
    //   var clockNum = parseInt(clockId)
    //   alert(clockNum);
    //   $(this).fadeOut(3000);
    //   taskArray = taskArray.slice(clockNum-1, clockNum);
    // });
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
  return;
}

function countdownFinished(task){
  taskArray.shift();
  document.getElementById('bell').play();
  $('.taskbox:first-child').fadeOut(fadeOutMs, function(){
    $('.taskbox:first-child').remove();
  });
  if(taskArray.length>0){
    timeHandler(taskArray[0]);
  }
}

function breakHandler(task){
  if(errMsg!==''){
    $('#error-msg').remove();
  }
  $('.message-field').append('<p id="break-msg"> Breaking for <span id="breakclock"></span></p>');
  var b = Date.now() + (task.breakTime*60000);
  $('#breakclock').tinyTimer({ to: b,
                          onEnd: function(){
                            $('#break-msg').fadeOut(fadeOutMs, function(){
                              $('#break-msg').remove();
                            });
                            countdownFinished(task);
                          }});

}
