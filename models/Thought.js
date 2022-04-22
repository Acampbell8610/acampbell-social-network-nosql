const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: 'string',
          require: true,
          maxLength:280,
      },
      username:{
          type: 'string',
          require: true,
      },
      createdAt:{
          type:Date,
          default: Date.now,
          get:createdAtVal => dateFormat(createdAtVal),

      }
},{
    toJSON:{
        getters:true
    }
}
)

const ThoughtSchema = new Schema({
    thoughtText: {
        type: 'string',
        require: true,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get:createdAtVal => dateFormat(createdAtVal),
    },
    username: {
        Type: 'string',
        require: true,
    },
    reactions: [ReactionSchema]
},{
    toJSON :{
        getters:true,
        virtuals: true,
    }, 
    id:false
});

//create a virtual 
ThoughtSchema.virtuals('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;