const {Schema, model, Types} = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: 'string',
        unique: true,
        require:true,
        trim: true,
},
    email: {
        type: 'string',
        require:true,
        unique: true,
        match: [/.+\@.+\..+/],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})