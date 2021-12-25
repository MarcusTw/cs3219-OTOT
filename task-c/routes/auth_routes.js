let router = require('express').Router();

// Import controllers
let authController = require('../controller/auth_controller');

router.get('/', function (req, res) {
    res.json({
        status: 'success',
        message: 'Welcome to Authentication and Authorization. Use /login, /token and /logout.',
    });
});

router.route('/refresh')
    .post(authController.refresh);

router.route('/logout')
    .delete(authController.logout);

// Authenticate User
router.route('/login')
    .post(authController.login);

module.exports = router;