$(document).ready(function () {
  // Getting references to our form and input
  const locationForm = $("form.location");
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    userId = data.id;
    userEmail = data.email;
  });

  // When the signup button is clicked, we validate the email and password are not blank
  $("#signupFrmBtn").on("click", function (event) {
    event.preventDefault();
    console.log("pressed button");
    
    let newAddr = {
      streetnumber: $("#street_number").val(),
      streetname: $("#route").val(),
      suburb: $("#locality").val(),
      postcode: $("#postal_code").val(),
      state: $("#administrative_area_level_1").val(),
      country: $("#country").val(),
      gps: $("#latlong").val(),
      name: $("#name").val(),
      memId: userId //need to get the Member ID from password
    };

    console.log(newAddr);

    if (
      newAddr.gps === null ||
      (newAddr.streetname === "" && newAddr.suburb === "")
    ) {
      console.log("not enough data to save");
      /* const toastHTML = "<span>Oops!Not enough data!</span><button class='btn-flat toast-action'>OK</button>";
            M.toast({html: toastHTML,completeCallback: function(){
                M.toastHTML.dismiss();
                }
            }); */

      return;
    } else if (newAddr.name === "") {
      console.log("enter a short name for this address");
      return;
    } else {
      // If we have an email and password, run the signUpUser function
      addLocation(newAddr);
    }
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  function addLocation() {
    $.post("/api/location", {
      streetnumber: $("#street_number").val(),
      streetname: $("#route").val(),
      suburb: $("#locality").val(),
      postcode: $("#postal_code").val(),
      state: $("#administrative_area_level_1").val(),
      country: $("#country").val(),
      gps: $("#latlong").val(),
      name: $("#name").val(),
      memId: userId //need to get the Member ID from password
    })
      .then(function (data) {
        window.location.replace("/members");
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
