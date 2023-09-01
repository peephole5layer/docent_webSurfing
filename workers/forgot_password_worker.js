const queue = require('../config/kue');

const forgotPasswordMailer = require('../mailers/forgot_pass_mailer');


try {

    queue.process('findEmail', function (job, done) {
        console.log('forgot password emails worker is processing a job', job.data);
        forgotPasswordMailer.forgotPassword(job.data);
        done();
    });

} catch (err) {
    console.log("Error in forgot Password worker:::", err);

}

// const {Job} = require('bull');

// queue.process('findEmail',async(job)=>{
//     console.log(job.data);
//     forgotPasswordMailer.forgotPassword(job.data);
//     return Promise.resolve();;
// })

// queue.on('completed', (job, result) => {
//     console.log(`Job completed with result ${result}`);
// })

// module.exports.forgotPassProcess = async(job)=>{
//     console.log("388383838");
//     forgotPasswordMailer.forgotPassword(job.data);
// }



