import mongoose from 'mongoose'

const usuarioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true
    },
     password: {
        type: String,
        minlength: [8, 'Password must be 8 characters'],
        required: true
    },
     phone: {
        type: String,
        minlength: 8,
        maxlength: 8,
        required: true
    },
     address: {
        type: String,
        required: true
    },
     role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN','CLIENT'],
        required: true
    }
})


// Pre mongoose
                             //Pluralizar
export default mongoose.model('usuario', usuarioSchema)
