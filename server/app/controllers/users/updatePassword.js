const User = require('../../models/user')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { updatePwd } = require('../../middleware/db')
const { checkPassword } = require('../../middleware/auth')
const { getItem } = require('../../middleware/db')
const { passwordsDoNotMatch } = require('../auth/helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updatePassword = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await getItem(req.id, User)
    const isPasswordMatch = await checkPassword(req.oldPassword, user)
    if (!isPasswordMatch) {
      handleError(res, await passwordsDoNotMatch(user))
    } else {
      console.log('pppppppppppppppp')
      res.status(200).json({'result':true, 'data':await updatePwd(req.newPassword, user)})
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updatePassword }
