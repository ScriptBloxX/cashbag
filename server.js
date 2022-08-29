// lib
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const {body , validationResult} = require('express-validator');
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// module require
require('dotenv').config();
const db = require('./database');
const user_ = require('./module/user');
const api_ = require('./module/api');

const app = express();

// setting
app.use(
    express.urlencoded({ extended: false }),
    express.static("public"),
    express.json(),
    passport.initialize()
);
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 3 * 24 * 60 * 60 * 1000 // 3day
}))

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// custom middleware
const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.isLoggedIn&&!req.session.passport) {
        return res.render('sign_in');
    }
    next();
}

// google auth
authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL,
    passReqToCallback: true
}, authUser));

passport.serializeUser( (user, done) => { 
    user_.createAccount(user).then(result=>{
        if(result==='success'){
            done(null, user);
        }
    })
} )

passport.deserializeUser((user, done) => {
    done (null, user);
}) 

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/google-auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

// sign up -check
app.get('/',ifNotLoggedIn,(req,res,next)=>{
    const auth_token = {
        id: req.session.passport.user.id,
        email: req.session.passport.user.email,
        displayName: req.session.passport.user.displayName
    }
    user_.getAccountData(auth_token.id).then(result=>{
        if(result!=='error - account not found!'){
            res.status(400).render('home',{account: auth_token,data: result});
        }else{
            req.session = null;
            res.redirect('/');
        }
    });
});

// logout
app.get("/logout", (req,res) => {
    req.session = null;
    res.redirect('/');
})

// custom api
app.post('/modify',(req,res)=>{
    const auth_token = {
        id: req.session.passport.user.id,
    }
    const data = {
        desc: req.body.desc,
        amount: req.body.amount
    }
    api_.cash_modify(auth_token.id,data).then(result=>{
        if(result==='success'){
            res.redirect('/');
        }
    })
});
app.post('/api/new-shortcut',(req,res)=>{
    const auth_token = {
        id: req.session.passport.user.id,
    }
    const data = {
        desc: req.body.form.desc,
        amount: req.body.form.amount
    }
    api_.create_shortcut(auth_token.id,data).then(result=>{
        console.log("debug 2",result);
        if(result==='success'){
            res.send(result);
        }else{
            req.session = null;
            res.send('error-test');
        }
    });
});

// 404 not found
app.use('/', (req, res) => {
    res.status(404).render('404', { data: '404 Not Found!' });
});

app.listen(3000, () => console.log('server is running...✅'));
  
