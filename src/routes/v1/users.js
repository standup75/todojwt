const express = require(`express`)
const controller = require(`src/controllers/v1/users.js`)
const router = express.Router()

router.post(`/`, controller.create)
router.get(`/authenticate`, controller.authenticate)

module.exports = router
