// The User schema.
import User from "../../models/User";

export default {
  Query: {
    user: async (parent, { username, password }, context, info) => {      
      return await User.findOne({ "username": username, "password": password }).exec();
    },
    userByUsername: async (parent, { username }, context, info) => {
      return await User.findOne({ "username": username }).exec();
    },    
    userById: async (parent, { _id }, context, info) => {
      return await User.findOne({ _id }).exec();
    },
    users: async (parent, args, context, info) => {
      const users = await User.find({})
        .populate()
        .exec();

      return users.map(u => ({
        _id: u._id.toString(),
        username: u.username,
        password: u.password
      }));
    }
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      const newUser = await new User({
        username: user.username,
        password: user.password
      });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (parent, { _id, user }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
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