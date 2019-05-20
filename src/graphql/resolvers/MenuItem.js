import MenuItem from "../../models/MenuItem";
const Transaction = require('mongoose-transactions')

export default {
  Query: {    
    menuItems: async (parent, { filters }, context, info) => {      
      return await MenuItem.find(filters).sort({ dateCreated: -1 })
        .populate()
        .exec();      
    }   
  },
  Mutation: {
    createMenuItem: async (parent, { input }, context, info) => {
      const newItem = await new MenuItem(input);

      return new Promise((resolve, reject) => {
        newItem.save((err, res) => {            
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateMenuItem: async (parent, { _id, input }, context, info) => {
      return new Promise((resolve, reject) => {
        MenuItem.findByIdAndUpdate(_id, { $set: { ...input } }, { new: true, useFindAndModify: false }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    updateMenuItems: async (parent, { _ids, inputs }, context, info) => {
        const transaction = new Transaction()
        try {          
          for (let i = 0; i < _ids.length; i++) {
            transaction.update("MenuItem", _ids[i], { ...inputs[i] },  { useFindAndModify: false})            
          }          
          await transaction.run();          
          return true;
        }
        catch (err) {
          await transaction.rollback().catch(console.error)
          transaction.clean();          
          return false;
        }        
    },    
    deleteMenuItem: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        MenuItem.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteMenuItems: async(parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        MenuItem.deleteMany().exec((err, res) => {          
          err ? reject(err) : resolve(res.ok);
        });
      });
    }
  }
};