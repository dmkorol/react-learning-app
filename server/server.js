// server.js
const jsonServer = require('json-server');
const pause = require('connect-pause');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(pause(400));

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)
        && req.url.match(/clients/)) {
        const errors = {};
        if (!req.body.email) {
            errors.email = `Email can't be empty`;
        }

        if (!req.body.firstName) {
            errors.firstName = `First Name can't be empty`;
        }

        if (!req.body.lastName) {
            errors.lastName = `Last Name can't be empty`;
        }

        if (!req.body.phone) {
            errors.phone = `Phone can't be empty`;
        }

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }
    }
    // Continue to JSON Server router
    next();
});

server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on localhost:3001');
});
