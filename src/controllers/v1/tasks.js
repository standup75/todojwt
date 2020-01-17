const Task = require('src/models/task');
const STAGES = ['New', 'Completed'];
module.exports = {
	async index(req, res) {
		res.status(200).json({ tasks: await Task.find({ user: req.user.sub }).exec() });
	},
	async create(req, res) {
		const task = await Task.create({ user: req.user.sub, ...req.body });
		res.status(201).json({ task });
	},
	async show(req, res) {
		const task = await Task.findOne({ user: req.user.sub, _id: req.params.taskId }).exec();
		if (task) {
			res.status(200).json({ task });
		} else {
			res.sendStatus(401)
		}
	},
	async update(req, res) {
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
	},
	async destroy(req, res) {
		const task = await Task.findOne({ user: req.user.sub, _id: req.params.taskId }).exec()
		if (task) {
			await task.remove()
			res.sendStatus(201)
		 } else {
			res.sendStatus(401)
		 }
	},
};
