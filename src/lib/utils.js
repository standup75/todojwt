const crypto = require("crypto")

module.exports = {
	hash: (function() {
		const len = 128
		const iterations = 12000
		return async function(pwd, salt) {
			salt = salt || await new Promise((resolve, reject) => {
				return crypto.randomBytes(len, (err, salt) => {
					if (err) {
						return reject(err)
					}
					return resolve(salt.toString("base64"))
				})
			})
			return await new Promise((resolve, reject) =>
				crypto.pbkdf2(pwd, salt, iterations, len, 'sha1', (err, hash) =>
					err ? reject(err) : resolve({
						salt: salt,
						hash: hash
					})
				)
			)
		}
	})(),
}
