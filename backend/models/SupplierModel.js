//Supplier(Sup_ID[PK], Email, Phone, Address);
import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
      SupplierId:{type: String, required: true, unique: true},
      Email:{type: String, required: true},
      Phone:{type: String, required: true},
      Address:{type: String, required: true}
   })
 const Supplier = mongoose.model("Supplier", supplierSchema);
 export default Supplier;