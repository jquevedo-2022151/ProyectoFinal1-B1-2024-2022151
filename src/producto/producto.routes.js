'use strict'

import { Router } from 'express'
import { save, test, get, search, updateP, deleteP } from './producto.controller.js'
import { validateJwt, isAdmin} from '../middlewares/validate-jwt.js'

const api = Router()

// ROLE ADMIN 
api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id',[validateJwt, isAdmin], updateP)
api.delete('/delete/:id',[validateJwt, isAdmin], deleteP)

//ROLE CLIENT
api.get('/get', get)
api.post('/search', search)


// ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test)

export default api