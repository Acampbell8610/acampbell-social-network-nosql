const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require ('./thought-routes');
const friendsRoutes = require('./friends-routes');


router.use('/users', userRoutes);

router.use('/thoughts', thoughtRoutes);

router.use('/friends', friendsRoutes);

module.exports = router;