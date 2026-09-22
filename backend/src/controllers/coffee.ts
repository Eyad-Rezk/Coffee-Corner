import { Request, Response } from "express";
import Coffee from "../models/coffee";

const getAllCoffee  = async (req: Request, res:Response) =>{

   try{
          const data = await Coffee.find()
          res.status(200).json(data)
   }
   catch (error){
        res.status(404).json({ message: "Error can't find elements" })
   }
}

const getOneCoffee  = async (req: Request, res:Response) =>{

   try{   
         const data = await Coffee.findById(req.params.id)
         if (!data){
            res.status(500).json({ message: "Element not found! "})
         }
         res.status(200).json(data)
   }
   catch (error){
          res.status(404).json({ message: "Error can't find" })
          console.log(error)
   }
}

const addCoffee  = async (req: Request, res:Response) =>{

   try{
         const data = req.body
         const newCoffee = await Coffee.create(data)
         res.status(201).json(newCoffee)
   }
   catch(error:any){
         if(error.code == 11000){
          res.status(409).json({message: "Coffee name already exists"})
         }
         res.status(404).json({ message: "error" })
         console.log(error)
   }
}

const updateCoffee  = async (req: Request, res:Response) =>{

   try{
         const id = req.params.id
         const data = req.body
         if(!data){
            res.status(404).json({ message: "Element not found!" })
         }
         const updatedCoffee = await Coffee.findByIdAndUpdate(id,data)
         res.status(200).json({message: "Updated Successfully!"})
   }
   catch(error){
      res.status(404).json({ message: "Error can't update!" })
   }
}

const deleteCoffee  = async (req: Request, res:Response) =>{

   try{
       const id = req.params.id
       await Coffee.findByIdAndDelete(id)
       res.status(200).json({ message: "Deleted Successfully" })
   }
   catch(error){
      res.status(404).json({ message: "Can't delete" })
   }
}

export {
   getAllCoffee,
   getOneCoffee,
   addCoffee,
   updateCoffee,
   deleteCoffee
}