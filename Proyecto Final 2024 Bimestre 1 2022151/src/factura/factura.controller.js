'use strict'

import Carrito from '../carrito/carrito.model.js'
import { checkUpdate } from '../utils/validator.js'
import Factura from './factura.model.js'
import PDFDocument from 'pdfkit'
import fs from 'fs'


export const saveFact = async(req, res)=>{
    try{
        let data = req.body
        data.usuario = req.usuario._id
        let carrito = await Carrito.findOne({ _id: data.carrito })
        if (!carrito) return res.status(400).send({message: 'Carrito not found'})
        let factura = new Factura(data)
        await factura.save()
        return res.send({message: 'Factura Saved Successfull'})
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error saving factura'})
    }
}

export const updateFact = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let update = checkUpdate( data,id )
        if(!update) return res.status(400).send({message: 'Have sumbittiend data'})
        let updatedFactura = await Factura.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedFactura) return res.status(404).send({message: 'Factura not found, not updated'})
        return res.send({message: 'Factura updated successfull', updatedFactura})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating factura'})
    }
}

export const getFactUser  = async(req, res)=> {
    try{
        let listaFactUser = await Factura.find().populate('usuario'['usuario']).sort({usuario: -1})
        return res.send(listaFactUser)
    }catch(err){
        console.error(err)
        return
    }
}

export const getFactura = async(req, res)=> {
    try {
        let data = req.body
        data.usuario = req.usuario._id
        let factura = await Factura.findById(data.factura).populate('producto',['producto']).sort({producto:-1})
        if (!factura) {
            return res.status(404).send({ message: 'Factura not found' });
        }
        const doc = new PDFDocument();
        const filename = `factura_${id}.pdf`;
        const filePath = `./${filename}`;
        doc.pipe(fs.createWriteStream(filePath));

        // Contenido de la factura
        doc.fontSize(16).text(`Factura #${id}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Date: ${factura.date}`, { align: 'left' });
        doc.moveDown();
        doc.fontSize(12).text(`Usuario: ${factura.usuario}`, { align: 'left' });
        doc.moveDown();
        doc.fontSize(12).text('Productos:', { align: 'left' });
        doc.moveDown();

        doc.end();

        // Enviar el archivo PDF como respuesta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        fs.createReadStream(filePath).pipe(res);

        // Eliminar el archivo PDF después de enviarlo
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate PDF invoice' });
    }
}