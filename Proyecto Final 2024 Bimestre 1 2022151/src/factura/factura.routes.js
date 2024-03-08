'use strict'

import { Router } from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { getFactUser, getFactura, saveFact, updateFact } from './factura.controller.js'

const api = Router()

api.post('/save', [validateJwt, isAdmin], saveFact)
api.put('/update/:id', [validateJwt, isAdmin], updateFact)
api.get('/get',[validateJwt, isAdmin], getFactUser)
api.get('/factura', [validateJwt], getFactura)

export default api