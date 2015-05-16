$(document).ready(function() {
  $('#newTask').click(function() {
    var errMsg = '';
    //Grab the values from the form
    var taskName = $('input[name=task]').val();
    var mins = $('input[name=mins]').val();
    var breakMins = $('input[name=break]').val();
    //Error checking the values
    if(taskName === '' || taskName === undefined){
      errMsg = 'Please enter a task name.';
    } else if(mins === '' || mins === undefined || mins === NaN){
      errMsg = 'Please enter a valid number of minutes (1-999).';
    } else if(breakMins !== '' && typeof breakMins !== 'number'){
      errMsg = 'Break minutes must be a valid number (1-999).';
    }
    if(errMsg!==''){
      $('#error-msg').remove();
      $('.taskbox-field').prepend('<p id="error-msg">' + errMsg + "</p>");
    } else {
      $('.taskbox-field').append('<div class="taskbox">'+ taskName +'</div>');
    }
  });

  $('button').click(function(){
    $('p').fadeOut('slow');
    $('.taskbox-field').append('<div class="taskbox"> sample </div>');
  });

});
