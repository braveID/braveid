* eslint-disable no-var, one-var s */
const express = require('express')
const { Joi } = require('celebrate')
const router = express.Router()
const { celebrate } = require('celebrate')
const fetch = require('node-fetch')
const User = require('../models/user')
const steam = require('../../helpers/steam.js')
const lol = require('../../helpers/leagueoflegends.js')

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
      response})
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
          response})
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
          response})
      }
      return res.json({
        ok: false,
        error: 'Senha inválida'
      })
    })
  }
})

router.get('/:userId', (req, res) => {
  const { userId } = req.params

  User.findById(userId, (err, user) => {
    if (err || !user) {
      return res.json({
        ok: false,
        error: 'Usuário não encontrado'
      })
    }

    var completedUser = user // Perfil completo do usuário a ser retornado
    let userInfo = JSON.stringify(completedUser)
    userInfo = JSON.parse(userInfo) // Stringify e Parse porque javascript é zuado

    const steamId = userInfo.steam_id
    const summonerName = userInfo.summonerName
    const lolId = userInfo.summonerId
    const accountId = userInfo.accountId

    function requestServiceProfiles (callback) {
      if (steamId) {
        var steamData = steam.getSteamInfo(steamId, (serviceProfile) => {
          userInfo.steamProfile = serviceProfile
          callback(userInfo)
        })
      } else {
        userInfo.steamProfile = {}
        callback(userInfo)
      }

      if (lolId) {
        var lolData = lol.getLolInfo(summonerName, lolId, accountId, (serviceProfile) => {
          userInfo.lolProfile = serviceProfile
          callback(userInfo)
        })
      } else {
        userInfo.lolProfile = {}
        callback(userInfo)
      }
    }

    var sendData = requestServiceProfiles((userInfo) => {
      if (userInfo.steamProfile && userInfo.lolProfile) {
        return res.json(userInfo)
      }
    })
  })
})

// Rota que busca usuario pelo facebook ID
router.post('/searchID', celebrate({
  body: Joi.object().keys({
    facebook_id: Joi.string().required()
  })
}), (req, res) => {
  const body = req.body
  User.findByFacebookID(body.facebook_id, (err, response) => {
    if (err) {
      return res.json({
        ok: false,
        error: 'Usuário não encontrado'
      })
    }
    if (response === null) {
      return res.json({
        ok: false,
        error: 'Usuário não encontrado'
      })
    }
    return res.json({
      ok: true,
      response})
  })
})

  // Rota que busca usuario por parte do username
router.post('/searchUsername', celebrate({
  body: Joi.object().keys({
    username: Joi.string().required()
  })
}), (req, res) => {
  const body = req.body
  User.findByUsername(body.username, (err, response) => {
    if (err) {
      return res.json({
        ok: false,
        error: 'Usuário não encontrado'
      })
    }
    if (response === null || response.length === 0) {
      return res.json({
        ok: false,
        error: 'Usuário não encontrado'
      })
    }
    return res.json({
      ok: true,
      response})
  })
})

// Rota que adiciona um steamID a um usuário
router.post('/updateSteamID', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
    steam_id: Joi.string().required()
  })
}), (req, res) => {
  const body = req.body
  User.insertSteamID(body._id, body.steam_id, (err, response) => {
    if (err) {
      return res.json({
        ok: false,
        error: 'Usuário não encontrado'
      })
    }
    return res.json({
      ok: true,
      response})
  })
})

// Rota que adiciona um steamID a um usuário
router.post('/updateRiotID', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
    riot_id: Joi.string().required()
  })
}), (req, res) => {
  const body = req.body
  User.insertRiotID(body._id, body.riot_id, (err, response) => {
    if (err) {
      return res.json({
        ok: false,
        error: 'Usuário não encontrado'
      })
    }
    return res.json({
      ok: true,
      response})
  })
})

module.exports = router;