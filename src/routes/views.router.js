import { Router } from "express";
const router = Router()

import { ProductModel } from "../daos/mongodb/models/product.model.js";

router.get("/",async (req,res)=>{
    try {
        const products= await ProductModel.find()
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