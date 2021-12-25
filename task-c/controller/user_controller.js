const User = require('../model/user_model');

function failureJson(res, err) {
    res.json({
        status: "fail",
        message: err,
    });
}

exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            failureJson(res, err);
        } else {
            res.json({
                status: "success",
                message: "Users retrieved successfully!",
                data: users
            });
        }
    });
};

exports.new = async function (req, res) {
    let user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.picture = req.body.picture;
    user.hobbies = req.body.hobbies;
    user.department = req.body.department;
    if (user.name.match(/\d+/g)) {
        failureJson(res, "Invalid input name!");
    } else if (typeof user.age != "number") {
        failureJson(res, "Invalid input age!");
    } else {
        await user.save(function (err) {
            // Check for validation error
            if (err) {
                failureJson(res, err);
            } else {
                res.json({
                    status: "success",
                    message: 'New user created!',
                    data: user
                });
            }
        });
    }
};

exports.view = function (req, res) {
    User.findOne({name: req.params.name}, function (err, user) {
        if (err) {
            failureJson(res, err);
        } else {
            res.json({
                status: "success",
                message: 'User detail loaded!',
                data: user
            });
        }
    });
};

exports.update = function (req, res) {
    User.findOne({name: req.params.name}, function (err, user) {
        if (err) {
            failureJson(res, err);
        } else {
            user.age = req.body.age ?? user.age;
            user.picture = req.body.picture ?? user.picture;
            user.hobbies = req.body.hobbies ?? user.hobbies;
            user.department = req.body.department ?? user.department;

            user.save(function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({
                        status: "success",
                        message: 'User info updated!',
                        data: user
                    });
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    User.findOneAndRemove({name: req.params.name}, function (err, user) {
        if (err) {
            failureJson(res, err);
        } else {
            if (user) {
                res.json({
                    status: "success",
                    message: 'User deleted!',
                    data: user
                });
            } else {
                failureJson(res, "User not found in Database.")
            }
        }
    });
};