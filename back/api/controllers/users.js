/* eslint-disable no-var, one-var s */
const express = require('express')
const { Joi } = require('celebrate')
const router = express.Router()
const { celebrate } = require('celebrate')
const User = require('../models/user')

/**
 * Cria a conta de um usuário. Adicionar parâmetros extras caso necessário
 */
router.post('/signup', celebrate({
  body: Joi.object().keys({
    facebook_id: Joi.string().required(),
    username: Joi.string().required(),
    real_name: Joi.string().required(),
    profile_pic_url: Joi.string().required()
  })
}), (req, res) => {
  const userParams = req.body

  User.insert(userParams, (err, response) => {
    console.log(err, response)

    if (err) {
      return res.json({
        ok: false,
        error: err
      })
    }

    return res.json({
      ok: true,
      response
    })
  })
})

/**
 * Tenta logar um usuário pelo seu email ou username
 */
router.post('/login', celebrate({
  body: Joi.object().keys({
    facebook_id: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().required()
  })
}), (req, res) => {
  const body = req.body

  if (body.email) {
    User.findByEmail(body.email, (err, response) => {
      if (err) {
        return res.json({
          ok: false,
          error: 'Usuário não encontrado'
        })
      }

      if (response.password === body.password) {
        return res.json({
          ok: true,
          response
        })
      }
      return res.json({
        ok: false,
        error: 'Senha inválida'
      })
    })
  } else {
    User.findByUsername(body.username, (err, response) => {
      if (err) {
        return res.json({
          ok: false,
          error: 'Usuário não encontrado'
        })
      }

      if (response.password === body.password) {
        return res.json({
          ok: true,
          response
        })
      }
      return res.json({
        ok: false,
        error: 'Senha inválida'
      })
    })
  }
})

module.exports = router
