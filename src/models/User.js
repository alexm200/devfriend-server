import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

export default mongoose.model(
  "User", 
  new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,    
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now()
    }      
  })
);
