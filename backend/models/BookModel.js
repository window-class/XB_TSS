//Books(Book_ID[PK], Br_ID[FK],Sup_ID[FK], Book_Type, Publisher);
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    BookId:{type: String, unique: true, required: true},
    BorrowerId:{type: mongoose.Schema.Types.ObjectId, 
                ref:'Borrower', required: true},
    SupplierId:{type: mongoose.Schema.Types.ObjectId, 
                ref:'Supplier', required: true},
    BookType: {type: String, required: true},
    Publisher:{type: String, required: true}                        
});
const Book = mongoose.model("Book", bookSchema);
export default Book;