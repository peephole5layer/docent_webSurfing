const { ReturnDocument } = require('mongodb');
const Link = require('../models/links');
const validator = require('validator');
const alert = require('alert');
const reportMailer = require('../mailers/reported_mailer');
const User = require('../models/user');
const queue = require('../config/kue');
const reportEmailWorker = require('../workers/report_email_worker');
const passport = require('passport');
const { trusted } = require('mongoose');
var base64url = require('base64url');



// module.exports.blackList = async function(req,res,next){

//     console.log("hi");

//     try{

//         await passport.authenticate('webauthn',{failureMessage:true,failWithError:true},async function(err,currUser){

//             console.log("hi");

//             try{

//                 console.log("helo");

//                 if (err) {
//                     // Handle authentication error
//                     console.log("blackLIst link auth error");
//                     return next(err);
//                   }


//                 console.log(currUser);


//                 const {attestationResponse,username,userHandle} = currUser;

//                 const user = await User.findById(req.params.id); 

//                 console.log(user.biometricData);
//                 console.log(attestationResponse);


//                 if(user.biometricData==undefined){
//                     user.biometricData = attestationResponse.biometricData;
//                 }else if(user.biometricData!=attestationResponse.biometricData){
//                     res.send("<h1> submitted fingerPrint is not asscociated with your account!!!")
//                 }

//                 const url = req.body.url;
//                 console.log(validator.isURL(url));  
//                 console.log(url);


//                 if (! await validator.isURL(url)) {

//                     req.flash('error','Not a valid URL!');
//                     if(req.xhr){
//                         return res.status(200).json({

//                             message:"Not a valid URL!"
//                         });
//                        }
//                     return res.redirect('back');
//                 }



//                 let getLink = await Link.findOne({url:url});

//                 if (getLink==null) {
//                     const link = new Link;
//                     link.url = url;
//                     link.count = 1;
//                     link.adhaarNos.push(req.body.adhaar); 
//                     link.users.push(user._id);  
//                     link.biometricData.push(attestationResponse.biometricData);  
//                     link.save();

//                 } else {

//                     // If link is already present in database(i.e, already reported) , Only Insert adhaar no. of user reporting the link


//                     //first check if the link is already reported by curr adhaar number and curr user
//                     // skip saving adhaar no. if already reported by curr adhaar or curr user

//                     let currAdhaar = req.body.adhaar;
//                     let adhaarNos = getLink.adhaarNos;

//                     for(let i=0; i<adhaarNos.length; i++){

//                         if(adhaarNos.at(i)==currAdhaar){

//                             req.flash('error','Already reported by this adhaar!')
//                             if(req.xhr){
//                                 return res.status(200).json({

//                                     message:"Already reported by this adhaar!"
//                                 });
//                                }

//                            return res.redirect('back');
//                         }
//                     }

//                     if(getLink.users.find((userId)=>{return userId+""==user._id+""})){


//                         req.flash('error','Already reported by this email!')
//                         if(req.xhr){
//                             return res.status(200).json({

//                                 message:"Already reported by this email!"
//                             });
//                            }

//                        return res.redirect('back');
//                     }


//                     if(getLink.users.find((biometricData)=>{return biometricData+""==user.biometricData+""})){
//                         req.flash('error','Already reported with submitted fingerPrint!!!');

//                         if(req.xhr){
//                             return res.status(200).json({

//                                 message:"Already reported with submitted fingerPrint!!!"
//                             });
//                            }

//                        return res.redirect('back');

//                     }

//                         //else update the count and Push currAdhaar and curr user._id into link.adhaarNos and link.users   
//                     let updateLink = await Link.updateOne({ url: url }, // filter criteria
//                         { $set: { count: getLink.count+1 + '' } }, // update field

//                     )

//                     getLink.adhaarNos.push(req.body.adhaar);
//                     getLink.users.push(user._id);
//                     getLink.biometricData.push(user.biometricData);
//                     getLink.save();

//                  }

//                 let infoUser = [];
//                 infoUser.push(user);
//                 infoUser.push(url);
//                 infoUser.push(req.body.about);
//                 console.log(infoUser);

//                 let job = queue.create('emails',infoUser).save(function(err){

//                     if(err){
//                         console.log('error in sending to the queue');
//                         return;
//                     }
//                     console.log('job enqueued',job.id);

//                 });

//                if(req.xhr){
//                 return res.status(200).json({
//                     data:{
//                         user:user
//                     },
//                     message:"URL Reported!"
//                 });
//                }

//                req.flash('success','URL Reported!');     
//                return res.redirect('back');

//             }catch(err){

//                 console.log("error::", err);
//                 return next(err);
//             }

//         })(req,res,next);

//         console.log("22");

//     }catch(err){
//         console.log(err);

//     }

//     console.log("iewur");
//     return res.end("f");






// };


module.exports.blackListedUrls = async function (req, res) {

    console.log("BlackListed Urls controller loaded");
    console.log(req.query.search);



    const search = req.query.search != undefined ? req.query.search : "";

    try {
        

        const links = await Link.find({ url: { $regex: search, $options: "i" }}).populate({path:'users',selected:'-password'}).sort({ count: -1 });   
        
        console.log(links);

        // let reporters = [];

        if(links.length==0) {


          
            const status = {
                url: "Not found",
                count: "_",
                adhaarNos: ["Not found"],
                users: ["Not found"]
            }
            links.push(status)
        }



        return res.render('blacklistedUrls', {
            Title: 'BlackListed URLs',
            Links : links,
          
            Search_key: search,
            color: "",
            bgColor: "",
        });

        // return res.send('ji');

    } catch (err) {
        console.log("Error in blacklisted URLS controller , ::: ", err);
    }

}


function isValid_Aadhaar_Number(aadhaar_number) {

    try {

        let regex = new RegExp(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/);
        console.log(regex);

        if (aadhaar_number == null) {
            return "false";
        }


        console.log(regex.test(aadhaar_number));

        if (regex.test(aadhaar_number) == true) {
            return true;
        }
        else {
            return false;
        }

    } catch (err) {
        console.log("Error in adhaar validation :::", err);
    }


}







module.exports.blackList = async function (req, res, next) {

    try {

        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }

        const url = req.body.url;
        console.log(validator.isURL(url));
        console.log(url);


        if (!isValid_Aadhaar_Number(req.body.adhaar)) {



            req.flash('error', 'Invalid Adhaar number!');
            if (req.xhr) {
                return res.status(200).json({

                    message: "Invalid Adhaar number!"
                });
            }
            return res.redirect('back');
        }


        if (! await validator.isURL(url)) {

            req.flash('error', 'Not a valid URL!');
            if (req.xhr) {
                return res.status(200).json({

                    message: "Not a valid URL!"
                });
            }
            return res.redirect('back');
        }

        const user = await User.findById(req.params.id);
        let getLink = await Link.findOne({ url: url });

        if (getLink == null) {

            let adhaars = []
            adhaars.push(req.body.adhaar);
            let users = []
            users.push(user._id);


            const link = await Link.create({
                url : url,
                count:1,
                adhaarNos:adhaars,

            });

            link.users.push(user._id);
            link.save();
            // const link = new Link;
            // link.url = url;
            // link.count = 1;
            // link.adhaarNos.push(req.body.adhaar);
            // link.users.push(user._id);
            // link.save();

        } else {

            // If link is already present in database(i.e, already reported) , Only Insert adhaar no. of user reporting the link


            //first check if the link is already reported by curr adhaar number and curr user
            // skip saving adhaar no. if already reported by curr adhaar or curr user

            let currAdhaar = req.body.adhaar;
            let adhaarNos = getLink.adhaarNos;

            for (let i = 0; i < adhaarNos.length; i++) {

                if (adhaarNos.at(i) == currAdhaar) {

                    req.flash('error', 'Already reported by this adhaar!')
                    if (req.xhr) {
                        return res.status(200).json({

                            message: "Already reported by this adhaar!"
                        });
                    }

                    return res.redirect('back');
                }
            }

            if (getLink.users.find((userId) => { return userId + "" == user._id + "" })) {


                req.flash('error', 'Already reported by this email!')
                if (req.xhr) {
                    return res.status(200).json({

                        message: "Already reported by this email!"
                    });
                }

                return res.redirect('back');
            }

            //else update the count and Push currAdhaar and curr user._id into link.adhaarNos and link.users   
            let updateLink = await Link.updateOne({ url: url }, // filter criteria
                { $set: { count: getLink.count + 1 + '' } }, // update field

            )

            getLink.adhaarNos.push(req.body.adhaar);
            getLink.users.push(user._id);
            getLink.save();

        }

        let infoUser = [];
        infoUser.push(user);
        infoUser.push(url);
        infoUser.push(req.body.about);
        console.log(infoUser);

        let job = queue.create('emails', infoUser).save(function (err) {

            if (err) {
                console.log('error in sending to the queue');
                return;
            }
            console.log('job enqueued', job.id);

        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    user: user
                },
                message: "URL Reported!"
            });
        }

        req.flash('success', 'URL Reported!');
        return res.redirect('back');

    } catch (err) {

        console.log("error::", err);
        return res.redirect('back');
    }
}



module.exports.delete = async function (req, res) {

    try {

        if (req.user && req.user.access == 'admin') {

            await Link.findByIdAndDelete(req.params.id);
            return res.redirect('back');
        } else {

            return res.send('<h1 style="text-align:center;"> UnAuthorized Access... Request Blocked!!! </h1>');
        }



    } catch (err) {
        console.log("Error in blacklist delete controller :::::: ", err);
        return;
    }


}















            // if (req.user && req.user.access == 'admin') {

            //     for (i of link) {

            //         let x = [];
            //         for (userId of i.users) {

            //             const user = await User.findById(userId.toHexString());
            //             if (user != undefined)
            //                 x.push(user);
            //         }

            //         if (x.length != 0) {
            //             reporters.push(x);
            //         }
            //     }
            // }