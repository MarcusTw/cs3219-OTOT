const http = require('http');
const app = require('./servers/api_server');
const authApp = require('./servers/auth_server');

const server = http.createServer(app)
const authServer = http.createServer(authApp);

const PORT = parseInt(process.env.PORT, 10) || 9000;
const AUTH_PORT = parseInt(process.env.AUTH_PORT, 10) || 4000;

server.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`)
});
authServer.listen(AUTH_PORT, () => {
    console.log(`Auth Server running on port ${AUTH_PORT}`);
});

module.exports = server;