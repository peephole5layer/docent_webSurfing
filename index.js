const express = require('express');
const path = require('path');
const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');



const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');









// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static('./assets'));
app.use(express.static(path.join(process.cwd(), "/img")));

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