const http = require('http')
const app = require('./app')

const server = http.createServer(app)
const PORT = parseInt(process.env.PORT, 10) || 9000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

module.exports = server