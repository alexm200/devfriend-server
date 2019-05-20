import User from "../../models/User";

export default {
  Query: {
    users: async (parent, { filters }, context, info) => {
      return await User.find(filters).exec();
    }
  },
  Mutation: {
    createUser: async (parent, { input }, context, info) => {
      const newItem = await new User(input);

      return new Promise((resolve, reject) => {
        newItem.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (parent, { _id, input }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_id, { $set: { ...input } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    updateUsers: async (parent, { _ids, inputs }, context, info) => {
      const transaction = new Transaction()
      try {          
        for (let i = 0; i < _ids.length; i++) {
          transaction.update("User", _ids[i], { ...inputs[i] },  { useFindAndModify: false})            
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
    deleteUser: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteUsers: async(parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        User.deleteMany().exec((err, res) => {          
          err ? reject(err) : resolve(res.ok);
        });
      });
    }
  }
};