'use strict'

import Categoria from './categorias.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send('Hello World')
}

export const save = async(req, res)=>{
    try{
        let data = req.body
        let categoria = new Categoria(data)
        await categoria.save()
        return res.send({message: 'Categoria save Successfull'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saved Categoria', err})
    }
}

export const updateCat = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbitted some data that cannot be updated or missing data'})
        let updatedCategoria = await Categoria.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCategoria) return res.status(401).send({message: 'Categoria not found and not Updated'})
        return res.send({message: 'Updated Categoria', updatedCategoria})
    }catch(err){
        console.error(err)
        if(err.keyValue.name) return res.status(400).send({message: `Name ${err.keyValue.name} is already taken`})
        return res.status(500).send({message: 'Error updating Categoria'})
    }
}

export const deleteCat = async(req, res)=>{
    try{
        let { id } = req.params
        let deleteCat = await Categoria.findOneAndDelete({_id: id})
        if (!deleteCat) return res.status(404).send({message: 'Categoria not found and not deleted'})
        return res.send({message: `Categoria ${deleteCat} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting Categoria'})
    }
}

export const get = async(req, res)=>{
    try{
        let categorias = await Categoria.find()
        return res.send({ categorias })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: ' Error getting Categorias'})
    }
}