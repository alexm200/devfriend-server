import Card from "../../models/Card";

export default {
  Query: {
    cards: async (parent, { filters }, context, info) => {            
      return await Card.find(filters).sort({ dateCreated: -1 })
        .populate()
        .exec();
    }   
  },
  Mutation: {
    createCard: async (parent, { input }, context, info) => {
      const newItem = await new Card(input);

      return new Promise((resolve, reject) => {
        newItem.save((err, res) => {            
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateCard: async (parent, { _id, input }, context, info) => {
      return new Promise((resolve, reject) => {
        Card.findByIdAndUpdate(_id, { $set: { ...input } }, { new: true, useFindAndModify: false }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    updateCards: async (parent, { _ids, inputs }, context, info) => {
      const transaction = new Transaction()
      try {          
        for (let i = 0; i < _ids.length; i++) {
          transaction.update("Card", _ids[i], { ...inputs[i] },  { useFindAndModify: false})            
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
    deleteCard: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Card.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteCards: async(parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        Card.deleteMany().exec((err, res) => {          
          err ? reject(err) : resolve(res.ok);
        });
      });
    }
  }
};