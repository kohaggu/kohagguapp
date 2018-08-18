const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tution = new Schema ({
    teachername:{
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    pincode: {
        type:Number,
        required:true
    },
    subject: {
        type:String,
        required:true
    },
    contactnumber: {
        type:Number,
        required:true
    },
    fees: {
        type:String,
        required:true
    }
});

mongoose.model('tution',Tution);