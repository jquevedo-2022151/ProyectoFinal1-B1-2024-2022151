import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import categoriasRoutes from '../src/categorias/categorias.routes.js'
import usuariosRoutes from '../src/usuarios/usuario.routes.js'
import productosRoutes from '../src/producto/producto.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/usuario',usuariosRoutes)
app.use('/categoria',categoriasRoutes)
app.use('/producto', productosRoutes)

export const initServer  = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}