// const { Long } = require('mongodb');
const mongoose = require('mongoose');


const validator = require('validator');


const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    count: {
        type: Number,
        required: true,
        integer:true
    },
    adhaarNos: {
        type: [String],
        required: true,
        integer:true
    },

    users:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'User',
        required:true
    },

    biometricData :{
        type:[Object],
        required: true
        
    }

    // reportInfo: {
    //     type: [[String]],
    //     required: true,
    // }
    
}, {
    timestamps: true
});



const Link = mongoose.model('Link', linkSchema);

module.exports = Link;