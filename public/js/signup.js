$(document).ready(function() {
  
  // Getting references to our form and input
  const signUpForm = $("form.signUp");
  const emailInput = $("#email");
  const passwordInput = $("#password");
  const repeatPasswordInput=$("#passwordval");
  


  // When the signup button is clicked, we validate the email and password are not blank
  $("#signupFrm").submit(function(event) {
    console.log("pressed button");
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      passwordrpt: repeatPasswordInput.val().trim()
    };
    console.log(userData);

    if (!userData.email || !userData.password || !userData.passwordrpt) {
      console.log();
      const toastHTML = "<span>Oops!Please enter some data!</span><button class='btn-flat toast-action'>OK</button>";
        M.toast({html: toastHTML,completeCallback: function(){
          M.toastHTML.dismiss();
          }
        }); 
      return;
    } else if (userData.password !== userData.passwordrpt){
        //not working
        const toastHTML = "<span>Oops!Your passwords don't match!</span><button class='btn-flat toast-action'>OK</button>";
        M.toast({html: toastHTML,completeCallback: function(){
          M.toastHTML.dismiss();
          }
        });        
      return
    }
    // If we have an email and password, run the signUpUser function
    signUpUser();
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  
  function signUpUser() {

    const newMember={
      username:$("#username").val(),
      firstName:$("#firstname").val(),
      lastName:$("#lastname").val(),
      email:$("#email").val(),
      password:$("#password").val(),
      mobile: $("#mobile").val()
    };

    console.log(newMember);

    $.post("/api/signup", {
        username:$("#username").val(),
        firstName:$("#firstname").val(),
        lastName:$("#lastname").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        mobile: $("#mobile").val()
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      }) 
      .fail(err => {
        handleLoginErr(err)
      }) ;
  }

  function handleLoginErr(err) {
    //$("#alert.msg").text(err.responseJSON);
    //$("#alert").fadeIn(500);

    console.log("login error")
  }
});
