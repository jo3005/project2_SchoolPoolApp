$(document).ready(function () {
  /* global moment */

  // requestContainer holds all of our ride requests
  var requestContainer = $(".request-container");
  var statusSelect = $("#booked");
  // Click events for the edit and delete buttons
  $(document).on("click", ".delete_btn", handlePostDelete);
  $(document).on("click", ".edit_btn", handlePostEdit);
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
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");

    var newPostCard = $("<div>");
    newPostCard.addClass("card");

    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-title-text");

    var deleteBtn = $("<button>");
    deleteBtn.text("DELETE");
    deleteBtn.addClass("delete_btn btn waves-effect red");

    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit_btn btn waves-effect lime");

    
    
    var newPostCardBody = $("<div>");
    newPostCardBody.attr("class","card-content");

    var newPostCardBodyTable = $("<table>");
    newPostCardBodyTable.attr("class","requestContent");
    newPostCardBodyTable.attr("id","requestContentTable")
    newPostCardBody.append(newPostCardBodyTable);

    var newRow=$("<tr>");
    newRow.attr("class","imptRow noborder");
    newPostCardBodyTable.append(newRow);
    
    var newDataLabel=$("<td>");
    newDataLabel.attr("class","datalabel");
    newDataLabel.text("Pickup from: ");
    newRow.append(newDataLabel);
    
    var newPostTitleFrom=$("<td>");
    newPostTitleFrom.addClass("requestDetailsHdr");
    newPostTitleFrom.attr("class","data");
    newPostTitleFrom.text(post.requiredPickupLocnId);
    newRow.append(newPostTitleFrom);

    var newRow=$("<tr>");
    newRow.attr("class","imptRow noborder");
    newPostCardBodyTable.append(newRow);

    var newDataLabel=$("<td>");
    newDataLabel.attr("class","datalabel");
    newDataLabel.text("Dropoff to: ");
    newRow.append(newDataLabel);

    var newPostTitleTo = $("<td>");
    newPostTitleTo.addClass("requestDetailsHdr")
    newPostTitleTo.attr("class","data");
    newPostTitleTo.text(post.requiredDropoffLocnId);
    newRow.append(newPostTitleTo);

    var newRow=$("<tr>");
    newRow.attr("class","imptRow noborder");
    newPostCardBodyTable.append(newRow);
    
    var newDataLabel=$("<td>");
    newDataLabel.attr("class","datalabel");
    newDataLabel.text("Requested by: ");
    newRow.append(newDataLabel);
    
    var newPostAuthor = $("<td>");
    newPostAuthor.addClass("requestDetailsHdr")
    newPostAuthor.attr("class","data");
    newPostAuthor.text(post.bookedBy);
    newRow.append(newPostAuthor);              

    var newRow=$("<tr>");
    newRow.attr("class","imptRow noborder");
    newPostCardBodyTable.append(newRow);
    
    var newDataLabel=$("<td>");
    newDataLabel.attr("class","datalabel");
    newDataLabel.text("Requested at: ");
    newRow.append(newDataLabel);

    var newPostDate = $("<td>");
    newPostDate.attr("class","requestDetailsHdr")
    newPostDate.attr("class","data");
    newPostDate.text(formattedDate);
    newRow.append(newPostDate);
    
    var newRow=$("<tr>");
    newRow.attr("class","imptRow noborder");
    newPostCardBodyTable.append(newRow);
    
    var newDataLabel=$("<td>");
    newDataLabel.attr("class","datalabel");
    newDataLabel.text("Date required: ");
    newRow.append(newDataLabel);

    var newReqdDate = $("<td>");
    newReqdDate.attr("class","requestDetailsHdr")
    newReqdDate.attr("class","data");
    newReqdDate.text(moment(post.requiredDate).format("MMMM Do YYYY"));
    newRow.append(newReqdDate);
    
    var newRow=$("<tr>");
    newRow.attr("class","imptRow noborder");
    newPostCardBodyTable.append(newRow);
    
    var newDataLabel=$("<td>");
    newDataLabel.attr("class","datalabel");
    newDataLabel.text("Dropoff by: ");
    newRow.append(newDataLabel);

    var newReqdTime = $("<td>");
    newReqdTime.attr("class","requestDetailsHdr")
    newReqdTime.attr("class","data");
    newReqdTime.text(post.requiredDropOffTimeStart);
    newRow.append(newReqdTime);

    var newRow=$("<tr>");
    newRow.attr("class","imptRow noborder");
    newPostCardBodyTable.append(newRow);
    
    var newDataLabel=$("<td>");
    newDataLabel.attr("class","datalabel");
    newDataLabel.text("Seats required: ");
    newRow.append(newDataLabel);

    var newReqdTime = $("<td>");
    newReqdTime.attr("class","requestDetailsHdr")
    newReqdTime.attr("class","data");
    newReqdTime.text(post.carSeatsRequired);
    newRow.append(newReqdTime);

   
    var newRow=$("<tr>");
    newRow.attr("class","imptRow noborder");
    newPostCardBodyTable.append(newRow);
    
    var newPostBody = $("<div>");
    newPostCard.append(newPostCardBody);
    
    newPostCardBody.append(deleteBtn);
    newPostCardBody.append(editBtn);  
    
    newPostCard.data("request", post);
    
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

    //TODO: Go to search-ride and fill in with data for get post using current id 

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
      "No ride bookings made yet. <br> " +
        partial +
        " Navigate <a href='/search-ride" +
        query +
        "'>here</a> in order to get started."
    );
    requestContainer.append(messageH2);
  }
});
