var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    id: id
  }, function foundUser(err, user) {
    return done(err, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: "1671288253134593",
  clientSecret: "426722271b84fb48bac7e837797b0f0b",
  callbackURL: "http://localhost:1337/user/facebook/callback",
  enableProof: false
}, function(accessToken, refreshToken, profile, done) {
  var profile_json = profile._json
  User.findOne({
    facebookId: profile_json.id
  }, function foundUser(err, user) {
    console.log(err);
    console.log(user);
    if (!user) {
      User.create({
        facebookId: profile_json.id,
        name: profile_json.name,
        sport: {
          title: ''
        },
        role: 'player',
        membership: {},
        details: {},
        exclusive: {}
      }, function userCreated(err, newUser) {
        if (newUser) {
          console.log(newUser);
          return done(null, newUser, {
            message: 'Logged In Successfully'
          });
        } else {
          console.log(err);
          return done(err, null, {
            message: 'There was an error logging you in with Facebook'
          });
        }
      });
    } else {
      return done(null, user);
    }
  });
}));
