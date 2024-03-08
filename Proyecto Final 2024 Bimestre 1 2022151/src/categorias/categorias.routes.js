'use strict'


import { Router } from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { deleteCat, get, save, test, updateCat } from './categorias.controller.js'

const api = Router()

// TOL ADMIN
api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin],updateCat)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteCat)
api.get('/test', [validateJwt], test)

// ROL CLIENT
api.get('/get', get)

export default api
