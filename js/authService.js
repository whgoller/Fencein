var app = angular.module('fencin');

app.service('authService', function(session, $firebaseAuth, $q, $route){
  //Creates an object using the Firebase Constructor with our endpoint passed in
  var authObj = new Firebase('https://fencein.firebaseio.com/');
  
  /* 
  *  Check whether the user is logged in
  *  @returns a boolean
  */
  this.isLoggedIn = function(){
    this.loggedIn = session.getAuthData();
    console.log(this.loggedIn);
//    return session.getAuthData() !== null;
    return this.loggedIn !== null;
  }

  /**
  *  Log in 
  *  @param user
  *  @param callback function
  *  returns the authenticated user which is then passed into the callback.
  */
  this.login = function(user, cb){
    authObj.authWithPassword({
      email : user.email,
      password : user.password
    }, function(err, authData) {
      if (err) {
        switch (err.code) {
          case "INVALID_EMAIL":
          // handle an invalid email
          case "INVALID_PASSWORD":
          // handle an invalid password
          default:
            console.log("You are not a Registered user!");
            alert("You are not a registered user! Please register to proceed.");
        }
      } else if (authData) {
          session.setAuthData(authData);
          // user authenticated with Firebase
          console.log("Logged In! User ID: " + authData.uid);
          cb(authData); //gives the authenticated user to our callback
      } 
//    }, {
//      remember: "sessionOnly"
    });
  };
  

  
  /**
  *  Register user
  *  @param user
  *  @param callback function
  *    On a successful creation of the user the user is then logged into the sy
  *  returns the authenticated user which is then passed into the callback.
  */
  //Step 3 of Registration
  this.register = function(user, cb){
    authObj.createUser({
      email: user.email,
      password: user.password
    }, function(error) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              alert("This email is already in use.");
              
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              alert("The email you entered is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
          }
        } else {
            console.log("User created successfully");
            authObj.authWithPassword({
              email : user.email,
              password : user.password
            }, function(err, authData) {
                if (err) {
                  switch (err.code) {
                    case "INVALID_EMAIL":
                      // handle an invalid email
                      case "INVALID_PASSWORD":
                      // handle an invalid password
                      default:
                    }
                } else if (authData){
                    authData.name = user.name;
                    //authData.clubName = user.clubName;
                    //authData.clubInitials = user.clubInitials;
                    authData.timestamp = new Date().toISOString();
//                    authObj.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
                    authObj.child('users').child(authData.uid).set(authData);
                    //session.setUserIf(authData.uid);
                    //session.setAccessToken(authData.token);
                    cb(authData);
                  //$route.reload();
                }
              });
        }
    });
  };
  
  
  /**
  *  Log Out
  *
  */
  this.logOut = function(){
    authObj.unauth();
    session.destroy();
  };
  
  
});