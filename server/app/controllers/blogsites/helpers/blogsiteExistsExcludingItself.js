const Blogsite = require('../../../models/blogsite')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a blogsite already exists excluding itself
 * @param {string} id - id of item
 * @param {string} URL - name of item
 */
const blogsiteExistsExcludingItself = (id = '', URL = '') => {
  return new Promise((resolve, reject) => {
    Blogsite.findOne(
      {
        URL,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'URLはすでに存在して'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { blogsiteExistsExcludingItself }
