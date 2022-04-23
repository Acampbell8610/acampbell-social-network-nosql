const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    removeFriends,
    addFriends
  } = require('../../controllers/user-controller');
  router
  .route('/:userId/friends/:friendId')
  .post(addFriends)
  .delete(removeFriends);

  // Set up GET one, PUT, and DELETE at /api/user/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);
// Set up GET all and POST at /api/User
router
  .route('/')
  .get(getAllUser)
  .post(createUser);





module.exports = router;