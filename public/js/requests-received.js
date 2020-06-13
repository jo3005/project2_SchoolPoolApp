$(document).ready(function () {
  /* global moment */

  // requestContainer holds all of our ride requests
  var requestContainer = $(".request-container");
  var statusSelect = $("#booked");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  // Variable to hold our posts
  var posts;
  let userId, userEmail;
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    userId = data.id;
    userEmail = data.email;
  });
  // The code below handles the case where we want to get blog posts for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;

  if (userId) {
    getPosts(userId);
  }
  // If there's no userId we just get all posts as usual
  else {
    getPosts();
  }

  // This function grabs posts from the database and updates the view
  function getPosts(user) {
    $.get("/api/requests", function (data) {
      console.log("Requests", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/requests/" + id,
    }).then(function () {
      console.log("Deleted request");
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    requestContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    requestContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-title-text");
    var deleteBtn = $("<button>");
    deleteBtn.text("DELETE");
    deleteBtn.addClass("delete btn waves-effect red");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn waves-effect lime");
    var newPostTitle = $("<h5>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h6>");
    newPostAuthor.text("Requested by: " + post.bookedBy);
    newPostAuthor.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px",
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-content");
    var newPostBody = $("<p>");
    newPostTitle.text(
      "From: " +
        post.requiredPickupLocnId +
        " To: " +
        post.requiredDropoffLocnId +
        " "
    );
    newPostBody.html(
      "<br> <p>Car Seats Required: " +
        post.carSeatsRequired +
        "</p>" +
        "<br> <p>Date Required: " +
        post.requiredDate +
        "</p>" +
        "<br> <p>Pick up Time: " +
        post.requiredDropOffTimeStart +
        "</p>" +
        "<br> <p>Credits offered: " +
        post.creditsOffered +
        "</p>"
    );
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("request", post);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    console.log($(this));
    var currentPost = $(this).parent().parent().data("request");
    deletePost(currentPost.reqId);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    //   var currentPost = $(this)
    //     .parent()
    //     .parent()
    //     .data("post");
    //   window.location.href = "/cms?post_id=" + currentPost.id;
    window.location.href = "/manage-driver";
  }

  // This function displays a message when there are no Requests
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    requestContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No ride bookings made yet" +
        partial +
        ", navigate <a href='/search-ride" +
        query +
        "'>here</a> in order to get started."
    );
    requestContainer.append(messageH2);
  }

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
        alert("GREAT! BOOKING CONFIRMATION EMAIL HAS BEEN SENT TO THE REQUESTOR.")
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
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }


});
