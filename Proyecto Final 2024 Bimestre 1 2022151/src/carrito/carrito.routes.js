'use strict '

import { Router } from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { deleteCart, getCart, saveCart, updateCart } from './carrito.controller.js'

const api = Router()

api.post('/save', [validateJwt, isAdmin], saveCart)
api.put('/update/:id', [validateJwt, isAdmin], updateCart)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteCart)
api.get('/get', getCart)

export default api