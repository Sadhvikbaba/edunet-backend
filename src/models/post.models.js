import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user : {
        type :mongoose.Schema.Types.ObjectId, 
        ref : 'User'
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    content : {
        type : String,
        required : true,
        trim : true
    },
    wantedLocation : {
        type : String,
        required : true,
        trim : true
    },
    wantedDate : {
        type : String,
        required : true,
    },
},{timeStamps : true});

export const Post = mongoose.model('Post', postSchema);