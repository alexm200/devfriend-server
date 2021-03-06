import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

export default mongoose.model(
    "Card", 
    new Schema({
        userId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },  
        title: {
            type: String,
            required: false
        },
        text: {
            type: String,    
            required: false
        },
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now()
        }    
    })
);
