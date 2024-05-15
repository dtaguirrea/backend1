import express from 'express';
import cartRouter from './routes/cart.router'
import productsRouter from './routes/products.router'
import morgan from 'morgan'
import {__dirname} from './path.js'
import {errorHandler} from  './middlewares/errorHandler.js'

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/carts',cartRouter)
app.use('/products',productsRouter)

const PORT = 8080

app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})