const { buildErrObject } = require('../utils')
const mongoose = require('mongoose');

/**
 * Creates a new item in database
 * @param {Object} data - blog data object
 */
const createBlog = (data = {}, Blog = {}) => {
  return new Promise((resolve, reject) => {

    model.create(req, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

module.exports = { createBlog }
