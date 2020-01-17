const expressJwt = require('express-jwt');
module.exports = () => expressJwt({ secret: process.env.JWT_SECRET }).unless({
	path: [
		'/api/v1/users/authenticate', '/api/v2/users/authenticate', '/api/v1/users', '/api/v2/users'
	]
});