module.exports = (app) => {
	// v1 routes
	app.use(`/api/v1/tasks`, require(`src/routes/v1/tasks`))
	app.use(`/api/v1/users`, require(`src/routes/v1/users`))
	// v2 routes
	app.use(`/api/v2/tasks`, require(`src/routes/v2/tasks`))
	app.use(`/api/v2/users`, require(`src/routes/v1/users`))
}