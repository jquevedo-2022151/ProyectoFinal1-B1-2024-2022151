'use strict'

import { Router } from 'express'
import { save, test, get, search, updateP, deleteP, getcategory, getquantity } from './producto.controller.js'
import { validateJwt, isAdmin} from '../middlewares/validate-jwt.js'

const api = Router()

// ROLE ADMIN 
api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id',[validateJwt, isAdmin], updateP)
api.delete('/delete/:id',[validateJwt, isAdmin], deleteP)

//ROLE CLIENT
api.get('/get', get)
api.post('/search', search)
api.get('/getcategory', getcategory)
api.get('/getquantity', getquantity)

// ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test)

export default api