const { calculateObjectSize } = require('bson');
let jwt = require('jsonwebtoken');

const { ROLE, users, refreshTokens, rtCallback } = require('../data/data');

function adminAccess(name, res, next) {
    const user  = findUser(name);
    if (user.role === ROLE.ADMIN) {
        next();
    } else {
        res.status(403);
        res.json({
            yourName: name,
            yourRole: user.role
        })
    }
}

function findUser(name) {
    const user = users.find(u => u.name === name);
    return user;
}


// Verify Token
exports.verifyToken = function(req, res, next) {
    verifyTokenRole(req, res, next, false);
}

exports.verifyAdminToken = function(req, res, next) {
    verifyTokenRole(req, res, next, true);
}

const verifyTokenRole = function(req, res, next, isAdmin) {
    // Get auth header value
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === undefined) {
        // No token inserted, have not authenticated
        res.sendStatus(401);
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                // Not authorized, wrong token
                res.sendStatus(403);
            } else {
                // Authorized, continue GET
                req.user = user;
                console.log(user);
                if (isAdmin) {
                    adminAccess(user.name, res, next);
                } else {
                    next();
                }
            }
        });
    }
}

exports.refresh = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken === null || refreshToken === undefined) {
      res.sendStatus(401);
    } else if (!refreshTokens.filter(token => token.refreshToken === refreshToken)) {
      res.sendStatus(403)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      const key = findUser(user.name);
      const accessToken = generateAccessToken(key);
      res.json({ accessToken: accessToken })
    })
}

exports.logout = (req, res) => {
    const refreshToken = req.body.refreshToken;
    const filtered = refreshTokens.filter(token => token === refreshToken);
    if (Object.keys(filtered).length === 0) {
        res.sendStatus(403);
    } else {
        rtCallback(req.body.refreshToken);
        res.json({
            status: "success",
            message: "Logged out"
        });
    }
};


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
}

exports.login = (req, res) => {
    const username = req.body.name;
    
    const filtered = users.filter(u => u.name === username);
    
    if (Object.keys(filtered).length === 0) {
        res.json({
            access: "Restricted",
            message: "Your access is denied, please check with administrator."
        })
    } else {
        const user = findUser(username);
        const role = user.role;
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({  access: role, accessToken: accessToken, refreshToken: refreshToken});
    }
};

exports.adminAccess = function (req, res) {
    res.json({
        status: "success",
        message: "Congrats, you have admin access get :)"
    });
};