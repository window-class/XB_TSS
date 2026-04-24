import Borrower from "../models/BorrowerModel.js";

export const addBorrower = async(req, res) => {
        try {
          const newBorrower = new Borrower(req.body);
          const {BorrowerId} = newBorrower;
          const borrowerExist = await Borrower.findOne({BorrowerId});
          if(borrowerExist){
            return res.status(400).json({msg: "Borrower already exist"});
          }
         const savedBorrower = await newBorrower.save();
         res.status(201).json(savedBorrower);     
        } catch (error) {
         res.status(500).json({errMsg: error.message});   
        }
}

export const getBorrower = async (req, res) => {
       try {
        const foundBorr=await Borrower.find();
        res.status(200).json(foundBorr);
       } catch (error) {
         res.status(500).json({errMsg: error.message});   
        }
}

export const getBorrById = async (req, res) => {
    try {
      const {id}=req.params;
      const foundBorr = await Borrower.findById(id);
      res.status(200).json(foundBorr);  
    } catch (error) {
    res.status(500).json({errMsg: error.message}); 
    }
}

export const deleteBorr = async (req, res) => {
    try {
      const {id} = req.params;
      const deleteBorr = await Borrower.findByIdAndDelete(id);
      res.status(200).json({msg:"Borrower deleted", deleteBorr});  
    } catch (error) {
    res.status(500).json({errMsg: error.message});     
    }
}

export const updateBorr = async (req, res) => {
    try {
       const {id} = req.params;
       const updateBorr = await Borrower.findByIdAndUpdate(id, req.body,{new:true});
       res.status(201).json(updateBorr);
    } catch (error) {
    res.status(500).json({errMsg: error.message});    
    }
}