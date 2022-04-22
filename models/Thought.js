const {Schema, model, Types} = require('mongoose');

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
          //format date

      }
})

const ThoughtSchema = new Schema({
    thoughtText: {
        type: 'string',
        require: true,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //format date
    },
    username: {
        Type: 'string',
        require: true,
    },
    reactions: [ReactionSchema]
})

//create a virtual 
