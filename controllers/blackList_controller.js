const { ReturnDocument } = require('mongodb');
const Link = require('../models/links');
const validator = require('validator');
const alert = require('alert');


module.exports.blackList = function(req,res){




    const url = req.body.url;
    let present = false;

    Link.findOne({ url: url }).then(checkLink => {


        //Insert link into database if it is encountered first time

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

            // If link is already present in database(i.e, already reported) , Only Insert adhaar no. of user reporting the link
            

            //first check if the link is already reported by curr adhaar number 
            // skip saving adhaar no. if already reported by curr adhaar

          
           let currAdhaar = req.body.adhaar;

           let adhaarNos = checkLink.adhaarNos;

           for(let i=0; i<adhaarNos.length; i++){
              
               if(adhaarNos.at(i)==currAdhaar){
                  console.log('jjj');
                  present=true;

                  return;
               }
           }


           //else Push currAdhaar into link.adhaarNos 



           
            console.log("hello");

            Link.updateOne({ url: url }, // filter criteria
                { $set: { count: checkLink.count+1 + '' } }, // update field
                console.log("hi")

            ).then(result => {
                console.log();
            });

            console.log(req.body.adhaar);

            checkLink.adhaarNos.push(req.body.adhaar);
            checkLink.save();



        }

        // console.log("end");

    }).then(func=>{

        console.log(Link);

        // console.log(present);
    
        if(present==true){
            console.log(present+"hi");
               
            return res.render('home', {
                Title: "Home",
                Message:"Already Reported by this Adhaar number !"
                
            });
          
            
        }else{
            

    // // return res.render('home', {
    // //     Title: "Home",
        
    // });

        

                
            return res.render('home', {
                Title: "Home",
                Message:"Successfully Reported !"
                
            });
        }
    
       

    });
    
   
    
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