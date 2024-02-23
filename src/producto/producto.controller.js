'use strict'

import Categoria from '../categorias/categorias.model.js'
import Producto from './producto.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    return res.send({ message: 'Access accepted' })
}

export const save = async (req, res) => {
    try {
        let data = req.body
        let categoria = await Categoria.findOne({ _id: data.keeper })
        if (!categoria) return res.status(404).send({ message: 'Keeper not found' })
        let producto = new Producto(data)
        await producto.save()
        return res.send({ message: 'Producto saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving producto'})
    }
}

export const get = async(req, res)=>{
    try{
        let productos = await Producto.find()
        return res.send({ productos })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting productos'})
    }
}

export const updateP = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submittied some data'})
        let updatedProducto = await Producto.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedProducto) return res.status(404).send({message: 'Producto not found, not updated'})
        return res.send({message: 'Producto updated successfully', updatedProducto})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating producto'})
    }
}

export const deleteP = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteProducto = await Producto.deleteOne({_id: id})
        if(deleteProducto.deletedCount == 0) return res.status(404).send({message: 'Producto not found, not deleted'})
        return res.send({message: 'Deleted producto successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting producto'})
    }
}

export const search = async(req, res)=>{
    try{
        let { search } = req.body
        let productos = await Producto.find(
            {name: search}
        ).populate('keeper', ['name'])
        if(productos.length == 0) return res.status(404).send({message: 'Producto not found'})
             return res.send({message:'producto found', productos})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching producto'})
    }
}