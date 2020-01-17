const express = require(`express`)
const controller = require(`src/controllers/v1/tasks.js`)
const router = express.Router()

router.post(`/`, controller.create)
router.delete(`/:taskId`, controller.destroy)
router.get(`/`, controller.index)
router.get(`/:taskId`, controller.show)
router.put(`/:taskId`, controller.update)

module.exports = router
