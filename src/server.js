require('rootpath')();
require(`express-async-errors`)
const express = require('express');
const app = express();
const port = 3000;
const errorHandler = require('src/middlewares/errorHandler');
const jwt = require('src/middlewares/jwt');
const mongoose = require('mongoose');
const bodyParser = require(`body-parser`)

;(async () => {
	await mongoose.connect('mongodb://localhost/todo_jwt', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	app.use(jwt());
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
	require('src/routes')(app);
	app.use(errorHandler);
	app.listen(port, () => console.log(`Todo app listening on port ${port}!`));
})()