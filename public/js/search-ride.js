$(document).ready(function () {
  // Initialization
  $(".timepicker").timepicker({
    twelveHour: false,
  });

  $(".datepicker").datepicker({
    format: "dd-mmm-yyyy",
    setDefaultDate: true,
  });

  let userId, userEmail;
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    userId = data.id;
    userEmail = data.email;
  });
  // When the signup button is clicked, we validate the email and password are not blank
  $("#btn_search").on("click", function (event) {
    event.preventDefault();
    console.log("search button pressed");
    let newRequest = {
      requestDate: moment().format("DD-MMM-YYYY"), // date can be retrived from date created.
      requiredDate: $("#pickupDate").val().trim(),
      requiredDropOffTimeStart: $("#pickupTime").val().trim(),
      requiredDropOffTimeEnd: $("#dropOffTime").val().trim(), // can be calculated
      requiredPickupLocnId: $("#pickupLocn").val().trim(),
      requiredDropoffLocnId: $("#dropOffLocn").val().trim(),
      addedRouteDistance: 0, // 0 to simplify MVP
      addedRouteTime: 0, // 0 to simplify MVP
      boostersRequired: 0,
      carSeatsRequired: $("#carSeatsRequired").val().trim(),
      creditsOffered: 0,
      booked: false,
      bookedBy: userEmail,
      memberMemId: userId, // made available for back end
    };
    console.log(newRequest);
    createRequest(newRequest);
  });

  function createRequest(newRequestObj) {
    console.log(newRequestObj);

    $.post("/api/createRequest", newRequestObj)
      .then(function (data) {
        window.location.replace("/requests-made");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .fail((err) => {
        handleLoginErr(err);
      });
  }

  function handleLoginErr(err) {
    //$("#alert.msg").text(err.responseJSON);
    //$("#alert").fadeIn(500);

    console.log("login error");
  }
});
