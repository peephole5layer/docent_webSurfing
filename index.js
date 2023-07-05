const express = require('express');
const path = require('path');
const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');



const db = require('./config/mongoose');

//used for session cookie

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFido2 = require('./config/passport-fido2-webAuthn');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.json());

app.use(express.static('./assets'));
app.use(express.static(path.join(process.cwd(), "/img")));



app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// let ejsOptions = {
//     // delimiter: '?', Adding this to tell you do NOT use this like I've seen in other docs, does not work for Express 4
//     async: true
// };


// app.engine('ejs', async (path, data, cb) => {
// try{
//     let html = await ejs.renderFile(path, data, ejsOptions);
//     cb(null, html);
// }catch (e){
//     cb(e, '');
// }
// });


app.use(session({
    name : 'webSurf',
    secret : 'webSurf',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

    store : MongoStore.create({

            mongoUrl: 'mongodb://127.0.0.1:27017/kavach_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-Mongodb store ok');
            return;
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});