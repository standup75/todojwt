const Task = require('src/models/task');
const STAGES = ['New', 'In-Progress', 'Completed'];
module.exports = Object.assign(require('src/controllers/v1/tasks'), { async update(req, res) {
		const updateParams = (({name, description, dueDate, stage}) => {
			const res = {}
			if (name) res.name = name
			if (description) res.description = description
			if (dueDate) res.dueDate = dueDate
			if (stage && STAGES.indexOf(req.body.stage) > -1) res.stage = stage
			return res
		})(req.body)
		if (Object.keys(updateParams).length) {
			const task = await Task.updateOne({ user: req.user.sub, _id: req.params.taskId }, updateParams).exec()
			if (task.nModified === 0) {
				res.sendStatus(401)
			} else {
				res.sendStatus(201)
			}
		} else {
			res.sendStatus(200)
		}
	}
})
