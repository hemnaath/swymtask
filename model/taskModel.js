const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title:{type:String, default:null},
    desc:{type:String, default:null},
    status:{type:String, default:null},
    assigned_to:{type:mongoose.Schema.Types.ObjectId, default:null}
},
{
    timestamps:true
});
const task = mongoose.model('task', taskSchema);


module.exports = task;