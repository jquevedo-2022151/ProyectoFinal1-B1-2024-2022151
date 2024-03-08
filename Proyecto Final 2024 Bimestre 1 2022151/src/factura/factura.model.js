import {Schema, model } from 'mongoose'

const facturaSchema = Schema({
    numberfactura: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    nit: {
        type: String,
        default: 'C/F',
        required: true
    },
    carrito: {
        type: Schema.ObjectId,
        ref: 'carrito',
        required: true
    },
    usuario: {
        type: Schema.ObjectId,
        ref: 'usuario',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
})

export default model('factura',facturaSchema)