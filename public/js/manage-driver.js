$(document).ready(function () {
  //Get current logged in user data
  let userId, userEmail;
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    userId = data.id;
    userEmail = data.email;
  });

  $("#btn_registerDriver").on("click", function (event) {
    event.preventDefault();
    console.log("Become a driver! button pressed");
    let newDriver = {
      licenceNumber: $("#licenceNumber").val().trim(),
      defaultVehicle: $("#defaultVehicle").val().trim(),
      freeSpots: $("#freeSpots").val().trim(),
      defaultRoute: $("#defaultRoute").val().trim(),
      homeAddress: $("#homeAddress").val().trim(), // can be calculated
      memberMemId: userId, // made available for back end
    };
    console.log(newDriver);
    registerDriver(newDriver);
  });

  function registerDriver(newDriverObj) {
    $.post("/api/registerDriver", newDriverObj)
      .then(function (data) {
        window.location.replace("/requests-received");
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
