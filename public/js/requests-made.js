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
 
  if (userId)  {
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
      getPosts(statusSelect.val());
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
    deleteBtn.text("x");
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
    newPostTitle.text("From: "+ post.requiredPickupLocnId + " To: " + post.requiredDropoffLocnId + " ");
    newPostBody.html(
        "<br> <p>Car Seats Required: " + post.carSeatsRequired+ "</p>" + 
        "<br> <p>Date Required: " + post.requiredDate +"</p>" + 
        "<br> <p>Pick up Time: " + post.requiredDropOffTimeStart + "</p>"+
        "<br> <p>Credits offered: " + post.creditsOffered +"</p>"
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
    window.location.href = "/search-ride";
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
      "No ride bookings make yet" +
        partial +
        ", navigate <a href='/search-ride" +
        query +
        "'>here</a> in order to get started."
    );
    requestContainer.append(messageH2);
  }
});
