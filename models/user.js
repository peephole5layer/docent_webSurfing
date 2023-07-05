const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {

        type: String,
        required: true
    },

    //used for biometric auth
    userHandle: {
        type:String,
        unique:true
    },
    attestationResponse:{
        type:Object
    },
    biometricData:{
        type:Object
    }
 
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;