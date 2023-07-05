
const queue = require('../config/kue');

const reportsMailer = require('../mailers/reported_mailer');



queue.process('emails',function(job,done){
    console.log('emails worker is processing a job',job.data);
    reportsMailer.newReport(job.data);
    done();
});

