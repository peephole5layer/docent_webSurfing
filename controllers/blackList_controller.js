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



module.exports.blackList = async function(req,res,next){

    console.log("hi");

    try{

        await passport.authenticate('webauthn',{failureMessage:true,failWithError:true},async function(err,currUser){

            console.log("hi");
    
            try{
    
                console.log("helo");
    
                if (err) {
                    // Handle authentication error
                    console.log("blackLIst link auth error");
                    return next(err);
                  }


                console.log(currUser);
            
    
                const {attestationResponse,username,userHandle} = currUser;
    
                const user = await User.findById(req.params.id); 

                console.log(user.biometricData);
                console.log(attestationResponse);
    
    
                if(user.biometricData==undefined){
                    user.biometricData = attestationResponse.biometricData;
                }else if(user.biometricData!=attestationResponse.biometricData){
                    res.send("<h1> submitted fingerPrint is not asscociated with your account!!!")
                }
    
                const url = req.body.url;
                console.log(validator.isURL(url));  
                console.log(url);
        
        
                if (! await validator.isURL(url)) {
        
                    req.flash('error','Not a valid URL!');
                    if(req.xhr){
                        return res.status(200).json({
                          
                            message:"Not a valid URL!"
                        });
                       }
                    return res.redirect('back');
                }
        
        
            
                let getLink = await Link.findOne({url:url});
            
                if (getLink==null) {
                    const link = new Link;
                    link.url = url;
                    link.count = 1;
                    link.adhaarNos.push(req.body.adhaar); 
                    link.users.push(user._id);  
                    link.biometricData.push(attestationResponse.biometricData);  
                    link.save();
        
                } else {
        
                    // If link is already present in database(i.e, already reported) , Only Insert adhaar no. of user reporting the link
                    
        
                    //first check if the link is already reported by curr adhaar number and curr user
                    // skip saving adhaar no. if already reported by curr adhaar or curr user
        
                    let currAdhaar = req.body.adhaar;
                    let adhaarNos = getLink.adhaarNos;
        
                    for(let i=0; i<adhaarNos.length; i++){
                        
                        if(adhaarNos.at(i)==currAdhaar){
        
                            req.flash('error','Already reported by this adhaar!')
                            if(req.xhr){
                                return res.status(200).json({
                                  
                                    message:"Already reported by this adhaar!"
                                });
                               }
        
                           return res.redirect('back');
                        }
                    }
                
                    if(getLink.users.find((userId)=>{return userId+""==user._id+""})){
                    
                        
                        req.flash('error','Already reported by this email!')
                        if(req.xhr){
                            return res.status(200).json({
                              
                                message:"Already reported by this email!"
                            });
                           }
        
                       return res.redirect('back');
                    }
    
    
                    if(getLink.users.find((biometricData)=>{return biometricData+""==user.biometricData+""})){
                        req.flash('error','Already reported with submitted fingerPrint!!!');
    
                        if(req.xhr){
                            return res.status(200).json({
                              
                                message:"Already reported with submitted fingerPrint!!!"
                            });
                           }
        
                       return res.redirect('back');
    
                    }
        
                        //else update the count and Push currAdhaar and curr user._id into link.adhaarNos and link.users   
                    let updateLink = await Link.updateOne({ url: url }, // filter criteria
                        { $set: { count: getLink.count+1 + '' } }, // update field
                        
                    )
        
                    getLink.adhaarNos.push(req.body.adhaar);
                    getLink.users.push(user._id);
                    getLink.biometricData.push(user.biometricData);
                    getLink.save();
        
                 }
        
                let infoUser = [];
                infoUser.push(user);
                infoUser.push(url);
                infoUser.push(req.body.about);
                console.log(infoUser);
        
                let job = queue.create('emails',infoUser).save(function(err){
        
                    if(err){
                        console.log('error in sending to the queue');
                        return;
                    }
                    console.log('job enqueued',job.id);
        
                });
        
               if(req.xhr){
                return res.status(200).json({
                    data:{
                        user:user
                    },
                    message:"URL Reported!"
                });
               }
        
               req.flash('success','URL Reported!');     
               return res.redirect('back');
        
            }catch(err){
        
                console.log("error::", err);
                return next(err);
            }

        })(req,res,next);

        console.log("22");

    }catch(err){
        console.log(err);
        
    }

    console.log("iewur");
    return res.end("f");


  

   

};
    
    
module.exports.blackListedUrls = async function(req,res){
    
        console.log("BlackListed Urls controller loaded");
        console.log(req.query.search);
    
        const search = req.query.search!=undefined ? req.query.search: "";
    
        try{
    
            const link = await Link.find({url:{$regex:search,$options:"i"}}).sort({count:-1});
            let reporters = [];
    
            if(link.length!=0){
    
                for( i of link){
    
                    let x = [];
    
                    for(userId of i.users){
            
                        const user = await User.findById(userId.toHexString());
                        x.push(user);  
                    }
                    
                    reporters.push(x);
                }     
    
            }else{
                const status = {
                    url:"Not found",
                    count: "_",
                    adhaarNos : ["Not found"],
                    users : ["Not found"]
                }
    
                reporters.push([]);
    
                link.push(status);
                console.log(link);
            }
        
            return await res.render('blacklistedUrls',{
                Title: 'BlackListed URLs',
                Reported_links : link,
                Reporters : reporters,
                Search_key : search,
                color : "",
                bgColor: ""
            });
    
        }catch(err){
            console.log("Error in blacklisted URLS controller , ::: ",err );
        }

 }
    
















// module.exports.blackList = async function(req,res,next){

//     try{
 
//         const url = req.body.url;
//         console.log(validator.isURL(url));  
//         console.log(url);


//         if (! await validator.isURL(url)) {

//             req.flash('error','Not a valid URL!');
//             if(req.xhr){
//                 return res.status(200).json({
                  
//                     message:"Not a valid URL!"
//                 });
//                }
//             return res.redirect('back');
//         }

//         const user = await User.findById(req.params.id); 

    
//         let getLink = await Link.findOne({url:url});
    
//         if (getLink==null) {
//             const link = new Link;
//             link.url = url;
//             link.count = 1;
//             link.adhaarNos.push(req.body.adhaar); 
//             link.users.push(user._id);    
//             link.save();

//         } else {

//             // If link is already present in database(i.e, already reported) , Only Insert adhaar no. of user reporting the link
            

//             //first check if the link is already reported by curr adhaar number and curr user
//             // skip saving adhaar no. if already reported by curr adhaar or curr user

//             let currAdhaar = req.body.adhaar;
//             let adhaarNos = getLink.adhaarNos;

//             for(let i=0; i<adhaarNos.length; i++){
                
//                 if(adhaarNos.at(i)==currAdhaar){

//                     req.flash('error','Already reported by this adhaar!')
//                     if(req.xhr){
//                         return res.status(200).json({
                          
//                             message:"Already reported by this adhaar!"
//                         });
//                        }

//                    return res.redirect('back');
//                 }
//             }
        
//             if(getLink.users.find((userId)=>{return userId+""==user._id+""})){
            
                
//                 req.flash('error','Already reported by this email!')
//                 if(req.xhr){
//                     return res.status(200).json({
                      
//                         message:"Already reported by this email!"
//                     });
//                    }

//                return res.redirect('back');
//             }

//                 //else update the count and Push currAdhaar and curr user._id into link.adhaarNos and link.users   
//             let updateLink = await Link.updateOne({ url: url }, // filter criteria
//                 { $set: { count: getLink.count+1 + '' } }, // update field
                
//             )

//             getLink.adhaarNos.push(req.body.adhaar);
//             getLink.users.push(user._id);
//             getLink.save();

//          }

//         let infoUser = [];
//         infoUser.push(user);
//         infoUser.push(url);
//         infoUser.push(req.body.about);
//         console.log(infoUser);

//         let job = queue.create('emails',infoUser).save(function(err){

//             if(err){
//                 console.log('error in sending to the queue');
//                 return;
//             }
//             console.log('job enqueued',job.id);

//         });

//        if(req.xhr){
//         return res.status(200).json({
//             data:{
//                 user:user
//             },
//             message:"URL Reported!"
//         });
//        }

//        req.flash('success','URL Reported!');     
//        return res.redirect('back');

//     }catch(err){

//         console.log("error::", err);
//         return res.redirect('back');
//     }
// }