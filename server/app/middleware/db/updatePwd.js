const { itemNotFound } = require('../utils')

/**
 * Updates a user password in database
 * @param {string} password - new password
 * @param {Object} user - user object
 */
const updatePwd = (password = '', user = {}) => {
  console.log(password)
  return new Promise((resolve, reject) => {
    user.password = password
    user.save(async (err, item) => {
      try {
        await itemNotFound(err, item, '見つかりません')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { updatePwd }
