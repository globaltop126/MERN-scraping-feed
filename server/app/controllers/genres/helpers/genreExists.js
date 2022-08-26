const Genre = require('../../../models/genre')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a genre already exists in database
 * @param {string} name - name of item
 */
const genreExists = (name = '') => {
  return new Promise((resolve, reject) => {
    Genre.findOne(
      {
        name
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'ジャンルはすでに存在します'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { genreExists }
