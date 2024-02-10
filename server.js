const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");


const mongodb = require('./data/database');
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
// this is the basic express session initialization
app.use(passport.initialize())
// init passport on every root call
app.use(passport.session())
// allow passport to use "express-session".
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTION, DELETE"
    );
    next();
})
app.use(cors({methods: ["POST", "GET", "PUT", "PATCH", "OPTION", "DELETE"]}))
app.use(cors({origin: "*"}))
app.use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
    // user.findOrCreate({githubId: profile.id}, function (err, user){
        return done(null, profile);
    //});
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => {
    res.send(req.session.user !== undefined ?  `logged in as ${req.session.user.displayName}`: "logged out")});
app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/api-docs", session: false }),
    (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
});


mongodb.initDb((err, mongDB) => {
    if (err) {
        console.log(err);
        process.exit(1); // exit the process if there is an error
    } else {
        app.listen(port, () => {
            console.log(`database is listening and node running on port ${port}`);
        }).on('error', (err) => {
            console.log(`Error starting server: ${err}`);
            process.exit(1); // exit the process if there is an error
        });
    }
});