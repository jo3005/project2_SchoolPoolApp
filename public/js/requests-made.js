$(document).ready(function () {
  /* global moment */

  // requestContainer holds all of our ride requests
  var requestContainer = $(".request-container");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  // Variable to hold our request posts
  var posts;
  let userId;
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    userId = data.id;
    userEmail = data.email;
  });

  if (userId) {
    getPosts(userId);
  }
  // If there's no userId we just get all ride request posts as usual
  else {
    getPosts();
  }

  // This function grabs ride request posts from the database and updates the view
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

  // This function does an API call to delete ride request posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/requests/" + id,
    }).then(function () {
      console.log("Deleted request");
      M.toast({
        html:
          "<i class='material-icons prefix'>delete</i><span>Request has been deleted!</span><button class='btn-flat toast-action'>OK</button>",
      });
      window.location.href = "/requests-made";
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
    deleteBtn.html(
    "<i class='material-icons prefix'>delete</i><span>DELETE</span>");
    deleteBtn.addClass("delete btn waves-effect red");
    var editBtn = $("<button>");
    editBtn.html("<i class='material-icons prefix'>create</i><span>EDIT</span>");
    editBtn.addClass("edit btn btn waves-effect lime");
    var newPostTitle = $("<h5>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h6>");
    newPostAuthor.text("Requested by: " + post.bookedBy);
    newPostAuthor.css({
      
      color: "blue",
     
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-content");
    var newPostBody = $("<p>");
    newPostTitle.html(
      "<b><i class='material-icons md-18 prefix'>location_searching</i>From: </b>" +
        post.requiredPickupLocnId + "<br>" +
        "<b><i class='material-icons md-18 prefix'>location_on</i>To: </b>" +
        post.requiredDropoffLocnId + "<hr>"
    );
    newPostBody.html(
      "<p>Car Seats Required: " +
        post.carSeatsRequired +
        "</p>" +
        "<p>Date Required: " +
        post.requiredDate +
        "</p>" +
        "<p>Pick up Time: " +
        post.requiredDropOffTimeStart +
        "</p>" +
        "<p>Credits offered: " +
        post.creditsOffered +
        "</p>"
    );
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("request", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    console.log("this: ", $(this));
    var currentPost = $(this).parent().parent().data("request");
    console.log("current post: ", currentPost);
    deletePost(currentPost.reqId);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    // FUTURE DEV FEATURE
    //   var currentPost = $(this)
    //     .parent()
    //     .parent()
    //     .data("post");
    //   window.location.href = "/search-ride?post_id=" + currentPost.id;
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
      "No ride bookings made yet" +
        partial +
        ", navigate <a href='/search-ride" +
        query +
        "'>here</a> in order to get started."
    );
    requestContainer.append(messageH2);
  }
});
