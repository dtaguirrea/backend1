import express from 'express';
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import morgan from 'morgan'
import handlebars from "express-handlebars"
import {__dirname} from './path.js'
import {errorHandler} from  './middlewares/errorHandler.js'
import { Server } from 'socket.io';
import ProductManager from './managers/product.manager.js';
const app = express()
const productManager = new ProductManager(`${__dirname}/db/products.json`)
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

    socket.emit('products', await productManager.getProducts())
    socket.on('newProduct', async(product)=>{
        await productManager.createProduct(product)
        socketServer.emit('products', await productManager.getProducts())
    })

    socket.on('deleteProduct',async (id)=>{
        await productManager.deleteProduct(id)
        socketServer.emit('products',await productManager.getProducts())
    })
})