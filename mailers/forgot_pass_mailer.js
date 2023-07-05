const nodeMailer = require('../config/nodemailer');


exports.forgotPassword = (data)=>{
    console.log('inside forgot password mailer');
 

    let htmlString  = nodeMailer.renderTemplate({data:data},'/forgotPassword/forgot_password_mailer.ejs');

    nodeMailer.transporter.sendMail({
        from: 'bhavehrathour4@gmail.com',
        to: data[0].email,
        subject : "Password Reset Link",
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail (forgot Password)",err);
            return;
        }

        return;
    });
}