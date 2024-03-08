'use strict'

//rutas del usuario

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { test, register , login, update, deleteU } from './usuario.controller.js'

const api = express.Router()

//MidLeware
//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test)

//ROLE CLIENT/ADMIN

api.put('/update/:id', [validateJwt, isAdmin],update)
api.delete('/delete/:id', [validateJwt, isAdmin],deleteU)

//PUBLIC
api.post('/register', register)
api.post('/login', login) //JWT

export default api