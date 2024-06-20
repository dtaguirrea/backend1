import express from 'express'
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import morgan from 'morgan'
import handlebars from "express-handlebars"
import {__dirname} from './path.js'
import {errorHandler} from  './middlewares/errorHandler.js'
import { Server } from 'socket.io'
import { initMongoDB } from './db/database.js'
import { ProductModel } from './daos/mongodb/models/product.model.js'

const app = express()

initMongoDB()
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/carts',cartRouter)
app.use('/products',productsRouter)
app.use('/', viewsRouter)
app.use(errorHandler);

app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname + '/views')

const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket)=>{
    console.log('New connection', socket.id)

    socket.emit('products', await ProductModel.find())
    socket.on('newProduct', async(product)=>{
        await ProductModel.create(product)
        const updatedProducts = await ProductModel.find()
        socketServer.emit('products', updatedProducts)
    })

    socket.on('deleteProduct',async (id)=>{
        await ProductModel.findByIdAndDelete(id)
        const updatedProducts = await ProductModel.find()
        socketServer.emit('products', updatedProducts)
    })
})