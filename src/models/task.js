const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  name: { type: String, required: true },
	description: { type: String },
	dueDate: Date,
	stage: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
});

taskSchema.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = this.updatedAt = new Date;
  } else {
    this.updatedAt = new Date;
  }
  return next();
})

const Task = mongoose.model('Tasks', taskSchema);
module.exports = Task;
