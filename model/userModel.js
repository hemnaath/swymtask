const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{type:String, default:null},
    email:{type:String, default:null, unique: true},
    role:{type:String, default:null},
},
{
    timestamps:true
});
const user = mongoose.model('user', userSchema);


module.exports = user;