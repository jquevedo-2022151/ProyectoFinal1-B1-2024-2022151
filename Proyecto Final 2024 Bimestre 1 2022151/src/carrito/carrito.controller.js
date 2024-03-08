'use strict'

import Producto from '../producto/producto.model.js'
import { checkUpdate } from '../utils/validator.js'
import Carrito from './carrito.model.js'

export const saveCart = async (req, res) =>{
    try{
        let data = req.body
        data.usuario = req.usuario._id
        let producto = await Producto.findOne({ _id: data.producto})
        if (!producto) return res.status(404).send({message: 'producto not found'})
        let carrito = new Carrito(data)
        await carrito.save()
        return res.send({message: 'Carrito saved successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error saving Carrito'})
    }
}

export const getCart = async(req, res)=>{
    try{
        let carrito = await Carrito.find()
        return res.send({ carrito })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting Carritos'})
    }
}

export const updateCart = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({message: 'Have submittied some data'})
        let updatedCarrito = await Carrito.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating producto'})
    }
}

export const deleteCart = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteCarrito = await Carrito.deleteOne({_id: id})
        if(deleteCarrito.deletedCount == 0) return res.status(404).send({message: 'Carrito not found, not deleted'})
        return res.send({message: 'Deleted carrito successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting carrito'})
    }
}