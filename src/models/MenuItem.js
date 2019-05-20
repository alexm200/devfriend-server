import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

export default mongoose.model(
    "MenuItem", 
    new Schema({
        userId: {
            type: String,
            required: true
        },    
        text: {
            type: String,
            required: false
        },
        isHeader: {
            type: Boolean,
            required: false
        },        
        hasDivider: {
            type: Boolean,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        order: {
            type: Number,
            required: true
        },
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now()
        }    
    })
);
