import mongoose, { Schema, model} from 'mongoose'

const carritoSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    producto: {
        type: Schema.ObjectId,
        ref: 'producto',
        required: true
    },
    usuario: {
        type: Schema.ObjectId,
        ref: 'usuario',
        required: true
    }
})

export default model('cart', carritoSchema)