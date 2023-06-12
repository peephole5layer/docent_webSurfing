const Link = require('../models/links');
const validator = require('validator');
module.exports.blackList = function(req,res){

    const url = req.body.url;

    Link.findOne({ url: url }).then(checkLink => {

        // console.log(checkLink+"lil");
        if (!checkLink) {

            console.log("true");

            if (validator.isURL(url)) {

                const link = new Link;
                link.url = url;
                link.count = 1;
                link.adhaarNos.push(req.body.adhaar);
                link.save();

            } else {
                console.log("not a valid url");
            }

        } else {
           
            console.log("hello");

            Link.updateOne({ url: url }, // filter criteria
                { $set: { count: checkLink.count+1 + '' } }, // update field
                console.log("hi")

            ).then(result => {
                console.log();
            });

            checkLink.adhaarNos.push(req.body.adhaar);
            checkLink.save();
        }

        console.log("end");

    });
    
    console.log(Link);

    return res.end("<h1> Succesfully reported <h1>")
    
}


    // (err, result) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(result.count);
    //         presentCount = result.count;
    //     }
    // }



    // var tmp= ["123","4345","3838848"];

    // console.log(tmp);


    
            // Link.findOne({ url: url }, // filter criteria
            //     'count').then(result => {
            //     presentCount = result.count + 1;
            //     console.log(presentCount+2);
            // });