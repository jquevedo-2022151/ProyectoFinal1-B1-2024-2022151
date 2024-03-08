import mongoose, {model} from 'mongoose'

const categoriaSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
})

export default model('categoria', categoriaSchema)