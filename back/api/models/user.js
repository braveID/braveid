const mongoose = require('mongoose')
const { Joi } = require('celebrate')
const Joigoose = require('joigoose')(mongoose)

const UserSchemaJoi = Joi.object().keys({
  _id: Joi.string().required(),
  facebook_id: Joi.string().required(),
  username: Joi.string().required(),
  real_name: Joi.string().required(),
  profile_pic_url: Joi.string().required()
})

const UserSchema = Joigoose.convert(UserSchemaJoi)
const User = mongoose.model('User', UserSchema, 'user')

exports.findById = (_id, next) => {
  User.findOne({ _id }).exec()
        .then((user) => {
          return next(null, user)
        })
        .catch(err => next(err))
}

exports.findByEmail = (email, next) => {
  User.findOne({ email }).exec()
    .then((user) => {
      return next(null, user)
    })
    .catch(err => next(err))
}

exports.findByUsername = (username, next) => {
  User.findOne({ username }).exec()
    .then((user) => {
      return next(null, user)
    })
    .catch(err => next(err))
}

exports.findByFacebookID = (facebook_id, next) => {
  User.findOne({ facebook_id }).exec()
    .then((user) => {
      return next(null, user)
    })
    .catch(err => next(err))
}

/**
 * Insere um novo usuário no banco de dados
 * @param {[Object]} fields campos do novo usuário
 * @param {Function} next
 */
exports.insert = (fields, next) => {
  const userFields = fields
  userFields._id = mongoose.Types.ObjectId()

  console.log(next)
  const user = new User(userFields)

  user.save()
  .then(res => next(null, res))
  .catch(err => next(err))
}
