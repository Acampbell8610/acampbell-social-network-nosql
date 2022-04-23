const {Schema, model} = require('mongoose');



const UserSchema = new Schema({
    username: {
        type: 'string',
        unique: true,
        required: true,
        trim: true,
},
    email: {
        type: 'string',
        required:true,
        unique: true,
        match: [/.+\@.+\..+/],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends:[{ type: Schema.Types.ObjectId,
        ref: 'User'
    }
        
    ]
},{
    toJSON:{
        virtuals: true

    },
    id:false
});
UserSchema.virtual('thoughCount').get(function(){
    return this.thoughts.reduce((total,thought) => total + thought.reactions.length + 1, 0);
});
UserSchema.virtual('friendsCount').get(function(){
    return this.friends.length;
});
const User = model('User', UserSchema);

module.exports = User
