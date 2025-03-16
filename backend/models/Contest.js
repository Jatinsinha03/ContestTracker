const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContestSchema = new Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'contest_tracker',
    },
    title:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
        
    },
    link:{
        type:String,
        required:true,
    },
    
});

module.exports = mongoose.model('contest',ContestSchema);