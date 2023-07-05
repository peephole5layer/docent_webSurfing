const queue = require('../config/kue');

const forgotPasswordMailer = require('../mailers/forgot_pass_mailer');


queue.process('findEmail',function(job,done){
    console.log('forgot password emails worker is processing a job',job.data);
    forgotPasswordMailer.forgotPassword(job.data);
    done();
});