/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
const buildErrObject = (code = '', message = '') => {
  return {
    return: false,
    code,
    message,
    errors: {
      msg: message
    }
  }
}

module.exports = { buildErrObject }
