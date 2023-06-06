const express = require('express');
const path = require('path');

const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const app = express();


const db = require('./config/mongoose');

const Link = require('./models/links');

const url = 'https://www.example.com';

const validator = require('validator');

var presentCount = 0;

// (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result.count);
//         presentCount = result.count;
//     }
// }






Link.findOne({ url: url }).then(checkLink => {


    if (!checkLink) {

        if (validator.isURL(url)) {

            const link = new Link;
            link.url = url;
            link.count = 9;
            link.adhaarNos.push('3883392994');
            link.save();

        } else {
            console.log("not a valid url");
        }

    } else {


        Link.findOne({ url: url }, // filter criteria
            'count').then(result => {
            presentCount = result.count + 1;
            console.log(presentCount);
        });


        console.log("hello");




        Link.updateOne({ url: url }, // filter criteria
            { $set: { count: presentCount + '' } }, // update field
            console.log("hi")

        ).then(result => {
            console.log(result);
        });




        checkLink.count = checkLink.count + 1;
        checkLink.adhaarNos.push("xyz");
    }

});

// (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {


//         console.log(result);
//     }
// }











app.use(express.urlencoded());



app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes'));



app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});