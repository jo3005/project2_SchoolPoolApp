
  let reqIdObj;

  $('select').formSelect(); // initialize form selection
  document
    .getElementById("accept")
    .addEventListener("click", function () {
      acceptBooking(reqIdObj)
    });
  //Get requests from database
  let newOption;
  $.get("/api/requests").then(function (data) {
    console.log("Requests", data);
    data.forEach((request) => {
      newOption = $("<option>");
      if (!request.booked) {
        newOption.html(
          request.requiredPickupLocnId
        );
        newOption.data("reqId", request.reqId); // contains id
        console.log(newOption);
        $("#waypoints").append(newOption);
      }
    });
  });

  // Update a given request with status booked and update database
  function acceptBooking(reqIdObj) {
    console.log("Accept button pressed", reqIdObj)

    $.ajax({
      method: "PUT",
      url: "/api/requests",
      data: reqIdObj
    })
      .then(function () {
        M.toast({
          html:
            "<i class='material-icons prefix'>email</i><span>Great! A Booking confirmation email has been sent to notify the requestor.</span><button class='btn-flat toast-action'>OK</button>"
        });
        location.reload();
      });
  }
  function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: -31.95, lng: 115.85 }, // Perth lat, lng
    });
    directionsRenderer.setMap(map);

    document
      .getElementById("submit")
      .addEventListener("click", function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
      });
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    var waypts = [];
    var checkboxArray = document.getElementById("waypoints");

    for (var i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        console.log($(checkboxArray.options[i]).data('reqId'));
        reqIdObj = { reqId: $(checkboxArray.options[i]).data('reqId') };
        console.log(reqIdObj);
        waypts.push({
          location: checkboxArray[i].value,
          stopover: true,
        });
      }
    }

    directionsService.route(
      {
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: "DRIVING",
      },
      function (response, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          var route = response.routes[0];
          var summaryPanel = document.getElementById("directions-panel");
          summaryPanel.innerHTML = "<h5>Route Information</h5>";
          // For each route, display summary information.
          for (var i = 0; i < route.legs.length; i++) {
            var routeSegment = i + 1;
            summaryPanel.innerHTML +=
              "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML +=
              route.legs[i].distance.text + "<br><br>";
          }
        } else {
          let errMsg = "Directions request failed due to " + status;
          M.toast({
            html:
              "<i class='material-icons prefix'>email</i><span>" + errMsg + "</span><button class='btn-flat toast-action'>OK</button>"
          });
        }
      }
    );
  }
