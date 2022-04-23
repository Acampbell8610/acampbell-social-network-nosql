const router = require('express').Router();
const { addThought, removeThought , addReaction, removeReaction,getAllThought,getThoughtById, updateThought} = require('../../controllers/thought-controller');
//api/thoughts
router
  .route('/')
  .get(getAllThought);
// /api/thoughts/<thoughts-id>
   router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId')
.put(addReaction)
.delete(removeThought)
//.get(getThoughtById);



router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);









module.exports = router;