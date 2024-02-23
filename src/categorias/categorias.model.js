import mongoose from 'mongoose'

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

export default mongoose.model('categoria', categoriaSchema)