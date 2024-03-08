import mongoose, { Schema, model} from "mongoose"

const productoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'categoria',
        required: true
    }
})

export default model('producto', productoSchema)