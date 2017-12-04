/* eslint-disable no-var, one-var s */
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

      var completedUser = {user}; //Perfil completo do usuário a ser retornado
      const steamId = '76561197996048272'
      const summonerName = 'coltshot'
      const lolId = '647588'
      const accountId = '663093'
      
      if (!steamId) {
        return res.json(completedUser)
      } else {
        var steamData = steam.getSteamInfo(steamId, (serviceProfile)=>{
          completedUser.steamProfile = serviceProfile
          // return res.json(completedUser)
        })
      }

      if (!lolId) {
        console.log("deumerda")
        return res.json(completedUser)
      } else {
        console.log("deubom")
        var lolData = lol.getLolInfo(summonerName, lolId, accountId, (serviceProfile)=>{
          completedUser.lolProfile = serviceProfile
          return res.json(completedUser)
        })
      }

      // fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=8DD3D47C1DFB6EA97EA7F6665C4FBA20&steamids=76561197960435530')
      // .then((response) => response.json())
      // .then((jsonResponse) => res.json(jsonResponse))
  })
});

module.exports = router;