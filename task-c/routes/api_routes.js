let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'success',
        message: 'Welcome to Random Asian User API. Use /users to see all the random users!',
    });
});

// Import controllers
let userController = require('../controller/user_controller');
let authController = require('../controller/auth_controller');

// User routes
router.route('/users')
    .get(userController.index)
    .post(authController.verifyToken, userController.new);

router.route('/users/:name')
    .get(userController.view)
    .put(authController.verifyToken, userController.update)
    .delete(authController.verifyToken, userController.delete);

router.route('/private')
    .get(authController.verifyToken, userController.index);

router.route('/private_admin')
    .get(authController.verifyAdminToken, authController.adminAccess);

module.exports = router;
