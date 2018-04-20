const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema 
const UserSchema = new Schema({
    google:{
        googleID:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    image:{
     type:String
    }
    }
//     facebook:{
//         facebookID:{
//             type:String,
//             required:true
//         },
//         email:{
//             type:String,
//             required:true
//         },
//         firstName:{
//             type:String,
//         },
//         lastName:{
//             type:String,
//         },
//         image:{
//          type:String
//         }
//     }
    });

//create collection and add scehma
mongoose.model('users',UserSchema)