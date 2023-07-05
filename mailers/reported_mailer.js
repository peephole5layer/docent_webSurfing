const nodeMailer = require('../config/nodemailer');

exports.newReport = (report)=>{
    console.log('inside new report mailer');

    let htmlString = nodeMailer.renderTemplate({report:report},'/reports/reported_mailer.ejs');

    nodeMailer.transporter.sendMail({
        from: 'bhaveshrathour4@gmail.com',
        to: report[0].email,
        subject: "Report sent successfully",
        html: htmlString // use tables for formatting emails
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

       
        return;
    });
}