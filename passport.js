var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var db = require("./db");

module.exports = function (passport) {
  // Use the GoogleStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a token, tokenSecret, and Google profile), and
  //   invoke a callback with a user object.

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GoogleClientID,
        clientSecret: process.env.GoogleClientSecret,
        callbackURL: process.env.absoluteURI + "/api/auth/google/callback",
      },
      /////////////////////////////////////Google login function/////////////////////////////////////     
      function (token, tokenSecret, profile, done) {
        const queryUsers = db
          .from("userIdentities")
          .select("*")
          .where("providerID", "=", profile.id)
          .where("provider", "=", "Google");

        // Get the user and userIdentity tables data joined on userID (provider + email combination exists)
        // if email and provider match, update the providerID with profile.id and login
        const queryOriginalUsers = db
          .from("userIdentities") //table 1
          .join("users", "userIdentities.userID", "users.userID") // join table 2 on userID
          .select("*")
          .where("users.email", "=", profile._json.email)
          .where("userIdentities.provider", "=", "Google");

        //make if statement to find out if the user is existing, new, exiting with no providerID or existing with a differnt provider
        //check if the user exists in the database in user identities table:
        // //check login is starting:
        // console.log("Login check");

        queryUsers.then((users) => {
          /////////////////////////// Login for existing user ///////////////////////////
          //check if user exists in the database in user identities
          // table and if so update last sign in and login user

          if (users[0] != undefined) {
            // //test start login check:
            // console.log("Start Login check");

            const updateSignIn = db // update the lastSignIn time
              .from("users")
              .where({ userID: users[0].userID })
              .update({ lastSignIn: new Date().toISOString() }); // Production version lastsignin to lastSignIn
            updateSignIn.then(() => {
              done(null, users[0]); // and login
            });
            // //test full user login check:
            // console.log("Full login check");

          } else {
            /////////////////////////// Login for legacy user ///////////////////////////
            //if user exists in the user and identities table but does 
            // not have a providerID then update the providerID and login user

            queryOriginalUsers.then((originUser) => {
              if (originUser[0] != undefined) {
                // //test start legacy user login check:
                // console.log("Start legacy login check");
                // console.log("OriginalUser table:", originUser);

                //update the providerID with the profile.id
                const updateSignIn = db
                  .from("userIdentities")
                  .where({ userID: originUser[0].userID })
                  .update({ providerID: profile.id });
                updateSignIn.then(() => {
                  done(null, originUser[0]); // and login
                });
                //test legacy user login checking
                // console.log("Full login legacy check");
              } else {
                /////////////////////////// Login for user with existing account with different SSO provider e.g. linkedin ///////////////////////////
                //check if user have created an account under another login method:
                //get user based on email from user table

                const queryexistingUser = db
                  .from("users")
                  .select("*")
                  .where("users.email", "=", profile._json.email);
                //check if user have created an account under another login method:
                queryexistingUser.then((existingUser) => {
                  if (existingUser[0] != undefined) {
                    queryexistingUser.userID = existingUser[0];
                    //Make new existinguserIdentity for the new google provider
                    const existinguserIdentity = {
                      userID: existingUser[0].userID,
                      provider: "Google",
                      providerToken: token,
                      providerID: profile.id,
                      picture: profile._json.picture
                    };
                    //insert the exiting users id and provider
                    const insertExistingUserIdentity = db
                      .from("userIdentities")
                      .insert(existinguserIdentity)
                    //insert the user id and provier into the table
                    insertExistingUserIdentity.then(() => {
                      done(null, existingUser[0]); // and login
                    });
                  } else {
                    /////////////////////////// Login for new user ///////////////////////////

                    // C: prepare a newUser
                    const newUser = {
                      name: profile._json.name,
                      given_name: profile._json.given_name,
                      family_name: profile._json.family_name,
                      email: profile._json.email,
                      lastSignIn: new Date().toISOString(),
                      accountCreated: new Date().toISOString(),
                    };
                    //insert that new user into the database
                    return db
                      .from("users")
                      .insert(newUser)
                      .returning("userID")
                      .then((id) => {
                        //get user id:
                        newUser.userID = id[0].userID;

                        //Make new userIdentity
                        const newUserIdentity = {
                          userID: newUser.userID,
                          provider: "Google",
                          providerToken: token,
                          providerID: profile.id,
                          picture: profile._json.picture
                        };

                        //insert to newUserIdentity table
                        db.from("userIdentities")
                          .insert(newUserIdentity)
                          // and login
                          .then(() => {
                            done(null, newUser);
                          });

                        // //test new user login check:
                        // console.log("Full login new user check", newUserIdentity);
                      });
                  }
                });
              }

            });
          }
        })
          // catch any errors:
          .catch((error) => {
            console.log(error);
          });
      }
    )
  );

  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.linkedinKey,
        clientSecret: process.env.linkedinSecret,
        callbackURL: process.env.absoluteURI + "/api/auth/linkedin/callback",
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      function (accessToken, refreshToken, profile, done) {
        /////////////////////////////////////LinkedIn login function/////////////////////////////////////

        const queryUsers = db
          .from("userIdentities")
          .select("*")
          .where("providerID", "=", profile.id)
          .where("provider", "=", "LinkedIn");

        // Get the user and userIdentity tables data joined on userID (provider + email combination exists)
        // if email and provider match, update the providerID with profile.id
        const queryOriginalUsers = db
          .from("userIdentities") //table 1
          .join("users", "userIdentities.userID", "users.userID") // join table 2 on userID
          .select("*")
          .where("users.email", "=", profile.emails[0].value)
          .where("userIdentities.provider", "=", "LinkedIn");

        // //check login is starting:
        // console.log("Login check");

        queryUsers.then((users) => {
          /////////////////////////// Login for existing user ///////////////////////////
          //check if user exists in the database in user identities
          // table and if so update last sign in and login user

          if (users[0] != undefined) {
            // //test start login check:
            // console.log("Start Login check");

            const updateSignIn = db // update the lastSignIn time
              .from("users")
              .where({ userID: users[0].userID })
              .update({ lastSignIn: new Date().toISOString() }); // Production version lastsignin to lastSignIn
            updateSignIn.then(() => {
              done(null, users[0]); // and login
            });
            // //test full user login check:
            // console.log("Full login check");

          } else {
            /////////////////////////// Login for legacy user ///////////////////////////
            //if user exists in the user and identities table but does 
            // not have a providerID then update the providerID and login user

            queryOriginalUsers.then((originUser) => {
              if (originUser[0] != undefined) {
                // //test start legacy user login check:
                // console.log("Start legacy login check");
                // console.log("OriginalUser table:", originUser);

                //update the providerID with the profile.id
                const updateSignIn = db
                  .from("userIdentities")
                  .where({ userID: originUser[0].userID })
                  .update({ providerID: profile.id });
                updateSignIn.then(() => {
                  done(null, originUser[0]); // and login
                });
                // //test legacy user login checking
                // console.log("Full login legacy check");
              } else {
                /////////////////////////// Login for user with existing account with different SSO provider e.g. Google ///////////////////////////
                //check if user have created an account under another login method:
                //get user based on email from user table

                const queryexistingUser = db
                  .from("users")
                  .select("*")
                  .where("users.email", "=", profile.emails[0].value);
                //check if user have created an account under another login method:
                queryexistingUser.then((existingUser) => {
                  if (existingUser[0] != undefined) {
                    queryexistingUser.userID = existingUser[0];
                    //Make new existinguserIdentity for the new google provider
                    const existinguserIdentity = {
                      userID: existingUser[0].userID,
                      provider: "LinkedIn",
                      providerToken: accessToken,
                      providerID: profile.id,
                      picture: profile.photos[1].value
                    };
                    //insert the exiting users id and provider
                    const insertExistingUserIdentity = db
                      .from("userIdentities")
                      .insert(existinguserIdentity)
                    //insert the user id and provier into the table
                    insertExistingUserIdentity.then(() => {
                      done(null, existingUser[0]); // and login
                    });
                  } else {
                    /////////////////////////// Login for new user ///////////////////////////

                    // C: prepare a newUser
                    const newUser = {
                      name: profile.displayName,
                      given_name: profile.name.givenName,
                      family_name: profile.name.familyName,
                      email: profile.emails[0].value,
                      lastSignIn: new Date().toISOString(),
                      accountCreated: new Date().toISOString(),
                    };
                    //insert that new user into the database
                    return db
                      .from("users")
                      .insert(newUser)
                      .returning("userID")
                      .then((id) => {
                        //get user id:
                        newUser.userID = id[0].userID;
                        //Make new userIdentity
                        const newUserIdentity = {
                          userID: newUser.userID,
                          provider: "LinkedIn",
                          providerToken: accessToken,
                          providerID: profile.id,
                          picture: profile.photos[1].value
                        };

                        //insert to newUserIdentity table
                        db.from("userIdentities")
                          .insert(newUserIdentity)
                          // and login
                          .then(() => {
                            done(null, newUser);
                          });

                        // //test new user login check:
                        // console.log("Full login new user check", newUserIdentity);
                      });
                  }
                });
              }

            });
          }
        })
          // catch any errors:
          .catch((error) => {
            console.log(error);
          });


      }
    )
  );
  
  passport.use(new FacebookStrategy({
    clientID: process.env.facebookClientID,
    clientSecret: process.env.facebookSecret,
    callbackURL: process.env.absoluteURI + "/api/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  function (accessToken, refreshToken, profile, done) {
    /////////////////////////////////////facebook login function/////////////////////////////////////

    const queryUsers = db
      .from("userIdentities")
      .select("*")
      .where("providerID", "=", profile.id)
      .where("provider", "=", "facebook");

    // Get the user and userIdentity tables data joined on userID (provider + email combination exists)
    // if email and provider match, update the providerID with profile.id
    const queryOriginalUsers = db
      .from("userIdentities") //table 1
      .join("users", "userIdentities.userID", "users.userID") // join table 2 on userID
      .select("*")
      .where("users.email", "=", profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "")
      .where("userIdentities.provider", "=", "facebook");

    // //check login is starting:
     console.log("Login check");

    queryUsers.then((users) => {
      /////////////////////////// Login for existing user ///////////////////////////
      //check if user exists in the database in user identities
      // table and if so update last sign in and login user

      if (users[0] != undefined) {
        // //test start login check:
        // console.log("Start Login check");

        const updateSignIn = db // update the lastSignIn time
          .from("users")
          .where({ userID: users[0].userID })
          .update({ lastSignIn: new Date().toISOString() }); // Production version lastsignin to lastSignIn
        updateSignIn.then(() => {
          done(null, users[0]); // and login
        });
        // //test full user login check:
         console.log("Full login check");

      } else {
        /////////////////////////// Login for legacy user ///////////////////////////
        //if user exists in the user and identities table but does 
        // not have a providerID then update the providerID and login user

        queryOriginalUsers.then((originUser) => {
          if (originUser[0] != undefined) {
            // //test start legacy user login check:
             console.log("Start legacy login check");
             console.log("OriginalUser table:", originUser);

            //update the providerID with the profile.id
            const updateSignIn = db
              .from("userIdentities")
              .where({ userID: originUser[0].userID })
              .update({ providerID: profile.id });
            updateSignIn.then(() => {
              done(null, originUser[0]); // and login
            });
            // //test legacy user login checking
             console.log("Full login legacy check");
          } else {
            /////////////////////////// Login for user with existing account with different SSO provider e.g. Google ///////////////////////////
            //check if user have created an account under another login method:
            //get user based on email from user table

            const queryexistingUser = db
              .from("users")
              .select("*")
              .where("users.email", "=", profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "")

            //check if user have created an account under another login method:
            queryexistingUser.then((existingUser) => {
              if (existingUser[0] != undefined) {
                queryexistingUser.userID = existingUser[0];
                //Make new existinguserIdentity for the new google provider
                const existinguserIdentity = {
                  userID: existingUser[0].userID,
                  provider: "facebook",
                  providerToken: accessToken,
                  providerID: profile.id,
                  picture: profile.photos && profile.photos.length > 1 ? profile.photos[1].value : ""

                };
                //insert the exiting users id and provider
                const insertExistingUserIdentity = db
                  .from("userIdentities")
                  .insert(existinguserIdentity)
                //insert the user id and provier into the table
                insertExistingUserIdentity.then(() => {
                  done(null, existingUser[0]); // and login
                });
              } else {
                /////////////////////////// Login for new user ///////////////////////////

                // C: prepare a newUser
                const newUser = {
                  name: profile.displayName,
                  given_name: profile.name.givenName,
                  family_name: profile.name.familyName,
                  email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "",
                  lastSignIn: new Date().toISOString(),
                  accountCreated: new Date().toISOString(),
                };
                //insert that new user into the database
                return db
                  .from("users")
                  .insert(newUser)
                  .returning("userID")
                  .then((id) => {
                    //get user id:
                    newUser.userID = id[0].userID;
                    //Make new userIdentity
                    const newUserIdentity = {
                      userID: newUser.userID,
                      provider: "facebook",
                      providerToken: accessToken,
                      providerID: profile.id,
                      picture: profile.photos && profile.photos.length > 1 ? profile.photos[1].value : ""

                    };

                    //insert to newUserIdentity table
                    db.from("userIdentities")
                      .insert(newUserIdentity)
                      // and login
                      .then(() => {
                        done(null, newUser);
                      });

                    // //test new user login check:
                     console.log("Full login new user check", newUserIdentity);
                  });
              }
            });
          }

        });
      }
    })
      // catch any errors:
      .catch((error) => {
        console.log(error);
      });


  }
)
);




  passport.serializeUser(function (user, done) {
    done(null, user.userID);
  });

  //New deserializeUser function to get the user from the userIdentities table and the users table
  passport.deserializeUser(function (id, done) {
    //test deserializeUser function start check:
    // console.log("Start deserializeUser function check");

    //test id type check:
    // console.log("id type check", id, " Typeof ", typeof id);

    const queryUsers = db
      .from("users")
      .join("userIdentities", "users.userID", "userIdentities.userID")
      .select("*")
      .where("users.userID", "=", id);
    queryUsers.then((user) => {
      // console.log("user database test", user);
      done(null, user);
    });
  });
};
