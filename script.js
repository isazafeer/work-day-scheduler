$(document).ready(function() {

  var timeDisplayEl = $('#time-display');

  function displayTime() {
    var rightNow = dayjs().format('dddd, DD MMM YYYY, hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }
  
  $('.saveBtn').on('click', function(){
    var value = $(this).siblings('.description').val();
    var hour = $(this).parent().attr('id');

    localStorage.setItem(hour, value);

    $('.notification').addClass('show');

    setTimeout(function() {
      $('.notification').removeClass('show');
    }, 5000);
  });

  $('.description').each(function() {
    var data = $(this).parent().attr('id');
    $(this).val(localStorage.getItem(data));
  });
  
  function scheduleTime() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function() {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      if (blockHour < currentHour) {
        $(this).addClass('past');
      }else if (blockHour == currentHour) {
        $(this).addClass('present');
      }else {
        $(this).addClass('future');
      }
    });
  }

  $(document).ready(function () {
     scheduleTime();
  });

  displayTime();
  setInterval(displayTime, 1000);
});