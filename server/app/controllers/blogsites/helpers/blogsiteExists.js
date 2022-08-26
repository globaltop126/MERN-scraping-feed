const Blogsite = require('../../../models/blogsite')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a blogsite already exists in database
 * @param {string} name - name of item
 */
const blogsiteExists = (blogsite = '') => {
  return new Promise((resolve, reject) => {
    Blogsite.findOne(
      {
        URL: blogsite
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

module.exports = { blogsiteExists }
