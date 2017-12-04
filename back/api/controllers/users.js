/* eslint-disable no-var, one-var s */
const express = require('express')
const { Joi } = require('celebrate')
const router = express.Router()
const { celebrate } = require('celebrate')
const User = require('../models/user')
const { steam } = require('../../helpers/steam.js')
const { steam } = require('../../helpers/leagueoflegends.js')

/**
 * Cria a conta de um usuário. Adicionar parâmetros extras caso necessário
 */
router.post('/signup', celebrate({
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
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
    username: Joi.string(),
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

router.get('/profile', celebrate({
  query: Joi.object().keys({
    user_id: Joi.string().required()
  })
}), (req, res) => {
  const { user_id } = req.query

  User.findById(user_id, (err, user) => {
    if (err || !user) {
      return res.json({
        ok: false,
        error: 'Usuário não encontrado'
      })
    }

    const steamId = user.steam_id
    const lolId = user.lol_id

    if (!steamId) {
      return res.json(user)
    } else {
      user.steam_profile = steam.getSteamInfo(steamId)
      return res.json(user)
    }

    if (!lolId) {
      return res.json(user)
    } else {
      user.lol_profile = lol.getLolInfo(lolId)
      return res.json(user)
    }

})

module.exports = router
