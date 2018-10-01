const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notes = new Schema ({
    link:{
        type:String,
        required:true
    },
    class: {
        type:String,
        required:true
    },
    subject:
    {
        type:String,
        required:true
    }
});

mongoose.model('notes',notes);