//Borrower(Br_ID[PK], Br_Name, Role[teacher/students]);
import mongoose from 'mongoose';
const borrowerSchema=new mongoose.Schema({
    BorrowerId:{type: String, unique: true, required: true},
    BorrowerName:{type: String, required: true},
    Role:{type: String, required: true}
});
const Borrower = mongoose.model("Borrower", borrowerSchema);
export default Borrower;