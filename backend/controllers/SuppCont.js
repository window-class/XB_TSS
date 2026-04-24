import Supplier from '../models/SupplierModel.js';

export const addSupplier = async (req, res) => {
       try {
        const newSupplier = new Supplier(req.body);
        const {SupplierId} = newSupplier;
        const SuppExist = await Supplier.findOne({SupplierId});
        if(SuppExist){
            return res.status(400).json({msg: "Supplier already exist"});
        }
        const savedSupplier = await newSupplier.save();
        res.status(201).json(savedSupplier);
       } catch (error) {
       res.status(500).json({errMessage: error.message}); 
       }
}

export const getSupplier = async (req, res) => {
        try {
          const suppliers = await Supplier.find();
        if(!suppliers || suppliers.length==0){
            return res.status(404).json({msg: "Not found"});
        }
        res.status(200).json(suppliers);    
        } catch (error) {
       res.status(500).json({errMessage: error.message}); 
       }
}

export const getSupplierById = async (req, res) => {
       try {
         const {id} = req.params;
         const foundSupp = await Supplier.findById(id);
        if(!foundSupp){
            return res.status(404).json({msg: "Supplier with Id not found"});
        } 
        res.status(200).json(foundSupp);
       } catch (error) {
       res.status(500).json({errMessage: error.message}); 
       }
}

export const deleteSupplier = async (req, res) => {
        try {
        const {id} = req.params;
        const deleteSupp = await Supplier.findByIdAndDelete(id);
            if(!deleteSupp){
                return res.status(404).json({msg: "Not Found"});
            }
            res.status(200).json({msg: "Deleted"}); 
        } catch (error) {
       res.status(500).json({errMessage: error.message}); 
       }
}

export const updateSupplier = async (req, res) => {
    try {
      const {id} = req.params;
      const updateSupp = await Supplier.findByIdAndUpdate(id, req.body, {new: true});
            if(!updateSupp){
                return res.status(404).json({msg: "Not Found"});
            }
        res.status(201).json(updateSupp);      
    } catch (error) {
    res.status(500).json({errMessage: error.message});        
    }
}