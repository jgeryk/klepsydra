requirejs(["jquery.timer"], function(util) {
  alert('timer script loaded');
});

//var inputTime;


$(document).ready(function() {
  var tasks = 0;
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
      inputTime = mins*6000;
      // var timer = $.timer(function() {
      //   alert('okay');
      // });
      // timer.set({ time : 5000, autostart : true });
      $('.taskbox-field').append('<div class="taskbox">'+ taskName + '<br><p id="countdown">' + mins +':00' + '</p></div>');
      timeHandler(inputTime);
    }
  });

});

function timeHandler(inputTime){
  var stopwatch = new (function(){
    var $countdown,
        incrementTime = 1000,
        currentTime = inputTime,
        updateTimer = function() {
              $countdown.html(formatTime(currentTime));
              if (currentTime == 0) {
                  stopwatch.Timer.stop();
                  timerComplete();
                  stopwatch.resetCountdown();
                  return;
              }
              currentTime -= incrementTime / 10;
              if (currentTime < 0) currentTime = 0;
          },
          timerComplete = function() {
              alert('Countdown timer complete!');
          },
          init = function() {
              $countdown = $('#countdown');
              stopwatch.Timer = $.timer(updateTimer, incrementTime, true);
          };
      $(init);
  });
}
// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}
