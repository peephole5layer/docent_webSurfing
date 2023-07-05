const mongoose = require('mongoose');


const forgotPassSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token:{
        type : String,
        required:true
    },
    isValid :{
        type : Boolean,
        required: true
    }
},{
    timestamps:true

});

const ForgotPassToken = mongoose.model('ForgotPassToken',forgotPassSchema);
module.exports = ForgotPassToken;