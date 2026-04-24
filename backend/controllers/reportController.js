import Book from '../models/BookModel.js';
import Supplier from '../models/SupplierModel.js'
import Borrower from '../models/BorrowerModel.js'

export const report = async(req, res)=>{
    try {
     const result = await Book.find().populate("SupplierId","SupplierId Email Phone Address")
                                     .populate("BorrowerId", "BorrowerId BorrowerName Role");
    const finalReport = result.map(item =>({
        SupplierId: item.SupplierId?.SupplierId,
        Email: item.SupplierId?.Email,
        Phone: item.SupplierId?.Phone,
        Address: item.SupplierId?.Address,

        BorrowerId: item.BorrowerId?.BorrowerId,
        BorrowerName: item.BorrowerId?.BorrowerName,
        Role: item.BorrowerId?.Role,

        BookId: item.BookId,
        BookType: item.BookType,
        Publisher: item.Publisher

    }));
    
    res.status(200).json(finalReport); 

    } catch (error) {
    res.status(500).json({errMsg: error.message});    
    }
}