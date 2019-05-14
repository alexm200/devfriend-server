import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const CardSchema = new Schema({
    user_id: {
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
    date_created: {
        type: Date,
        required: true
    }    
});

export default mongoose.model("Card", CardSchema);
