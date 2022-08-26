const User = require('../../../models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findUserById = (userId = '') => {
  return new Promise((resolve, reject) => {
    User.findById(userId, async (err, item) => {
      try {
        await itemNotFound(err, item, 'ユーザーは存在しません')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { findUserById }
