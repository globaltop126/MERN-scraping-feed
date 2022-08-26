const { itemNotFound } = require('../utils')

/**
 * Gets item from database by RSS
 * @param {string} RSS - item RSS
 */
const getItembyRSS = (RSS = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.findOne({ RSS }, async (err, item) => {
      try {
        await itemNotFound(err, item, '見つかりません')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { getItembyRSS }
