const { Thought, User } = require('../models');

const thoughtController = {

  getAllThought(req, res) {
    Thought.find({})


      .then(dbthoughtData => res.json(dbthoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
    // get one thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
 
      .select('-_v')
        .then(dbthoughtData => {
          // If no user is found, send 404
          if (!dbthoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbthoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
      // update thought by id
updateThought({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},
    // add thought to users
    addThought({ params, body }, res) {
     console.log(body);
     Thought.create(body)
       .then(({ _id }) => {
         return User.findOneAndUpdate(
           { _id: params.userId },
           { $push: { thoughts: _id } },
           { new: true }
         );
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    
   },
   addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true , runValidators:true}
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove Reaction
removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true}
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;