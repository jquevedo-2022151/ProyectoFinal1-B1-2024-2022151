'user strict'

import jwt from 'jsonwebtoken'
import Usuario from '../usuarios/usuario.model.js'

export const validateJwt = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        let { uid } = jwt.verify(token, secretKey)
        let usuario = await Usuario.findOne({_id: uid})
        if(!usuario) return res.status(404).send({message: 'Usuario not found - Unauthorized'})
        req.usuario = usuario
        console.log(req,res)
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        let { role, username } = req.usuario
        if(!role || role !== 'ADMIN') return res.status(403).send({message: `You dont have access | username ${username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Unauthorized role'})
    }
}