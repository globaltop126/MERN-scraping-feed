const ForgotPassword = require('../../../models/forgotPassword')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Checks if a forgot password verification exists
 * @param {string} id - verification id
 */
const findForgotPassword = (id = '') => {
  return new Promise((resolve, reject) => {
    ForgotPassword.findOne(
      {
        verification: id,
        used: false
      },
      async (err, item) => {
        try {
          await itemNotFound(err, item, '見つからないか、すでに使用されています')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findForgotPassword }
