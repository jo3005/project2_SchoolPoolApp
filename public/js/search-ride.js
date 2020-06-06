$(document).ready(function() {
  // Initialization
  const currYear = (new Date()).getFullYear();
  $('.timepicker').timepicker({
    twelveHour: false
  });

  $(".datepicker").datepicker({
    defaultDate: new Date(),
    showDaysInNextAndPreviousMonths: true   
  });

  // Getting references to our form and inputs
  const timeStart = $("#timestart");
  
  // When the form is submitted, we validate there's an email and password entered
  // timeStart.on("click", function(event) {
  //   event.preventDefault();
  //   timepickerInst.open();
  //   var userData = {
  //     requiredDropOffTimeStart: timeStart.val().trim(),
  //   };
  //   console.log(userData);
  // });

});
