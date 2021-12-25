// Imports
let express = require('express')
let authRoutes = require("../routes/auth_routes")
let cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

let app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to CS3219 Task C done by Marcus Tan. Use /auth to login)."
    })
})
app.use('/auth', authRoutes);

module.exports = app;