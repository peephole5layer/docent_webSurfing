const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory  = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory||fs.mkdirSync(logDirectory));

const accessLogStream = rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory,

});

const development ={
    name : 'development',
    asset_path : './assets',
    session_cookie_key: 'webSurfdocent',
    db : 'kavach_development',
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'bhaveshrathour4@gmail.com',
            pass:'tdlgyjquznloopil'
        }
    },
    
    google_client_id : "1012046356057-0qtcguk00fddtcrf9auk7ilh420ek0hp.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://docentwebscan.live:8000/users/auth/google/callback" ,

    jwt_secret : 'webSurf',
    morgan :{
        mode : 'dev',
        options : {stream :accessLogStream}
    },

    // mongo_url : `mongodb://127.0.0.1:27017/docent_safe_websurf`
    mongo_url : `mongodb+srv://bhaveshrathour380:CbzYYOKWc3gXAOyK@cluster0.jubptas.mongodb.net/?retryWrites=true&w=majority`


}

// console.log("id "+` ${process.env.DOCENT_WEBSURF_GOOGLE_CLIENT_ID}`)

// console.log(process.env.DOCENT_WEBSURF_ASSET_PATH);
// console.log(process.env.DOCENT_WEBSURF_SESSION_COOKIE_KEY);

// console.log(process.env.DOCENT_WEBSURF_DB);


// console.log( process.env.DOCENT_WEBSURF_GMAIL_USERNAME);

// console.log(process.env.DOCENT_WEBSURF_GMAIL_PASSWORD);
// console.log(process.env.DOCENT_WEBSURF_GOOGLE_CLIENT_SECRET);
// console.log();

// console.log(process.env.DOCENT_WEBSURF_GOOGLE_CALL_BACK_URL);
// console.log();

// console.log(typeof(process.env.DOCENT_WEBSURF_GOOGLE_CALL_BACK_URL));

const production = {
    name : 'production',
    asset_path : process.env.DOCENT_WEBSURF_ASSET_PATH,
    session_cookie_key: process.env.DOCENT_WEBSURF_SESSION_COOKIE_KEY ,
    db : process.env.DOCENT_WEBSURF_DB,
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user: process.env.DOCENT_WEBSURF_GMAIL_USERNAME,
            pass: process.env.DOCENT_WEBSURF_GMAIL_PASSWORD
        }
    },
  
    google_client_id : process.env.DOCENT_WEBSURF_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.DOCENT_WEBSURF_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.DOCENT_WEBSURF_GOOGLE_CALL_BACK_URL,
    jwt_secret : process.env.DOCENT_WEBSURF_JWT_SECRET,
    morgan :{
        mode : 'combined',
        options : {stream:accessLogStream}
    },

    mongo_url : process.env.MONGO_URL


}


console.log(process.env.NODE_ENV);

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);