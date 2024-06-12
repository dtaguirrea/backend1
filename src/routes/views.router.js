import { Router } from "express";
const router = Router()

import ProductManager from "../managers/product.manager.js";
import {__dirname} from "../path.js"
const productManager= new ProductManager(`${__dirname}/db/products.json`)


router.get("/",async (req,res)=>{
    try {
        const products= await productManager.getProducts()
        res.render('home',{products})
    } catch(error){
        console.log(error)
    }
})
router.get('/realtimeproducts',async (req,res)=>{
    try{
        res.render('realtimeproducts')
    } catch(error){
        console.log(error)
    }
})

export default router