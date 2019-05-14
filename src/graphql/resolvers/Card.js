// The Card schema.
import Card from "../../models/Card";

export default {
  Query: {    
    cards: async (parent, args, context, info) => {      
      const cards = await Card.find({}).sort({ date_created: -1 })
        .populate()
        .exec();

      return cards;
    },
    cardsByCategory: async (parent, { category }, context, info) => {
        const cards = await Card.find({ "category": category }).sort({ date_created: -1 })
          .populate()
          .exec();
      
        return cards;
      }    
  },
  Mutation: {
    createCard: async (parent, { card }, context, info) => {
      const newCard = await new Card({
        user_id: card.user_id,
        category: card.category,
        title: card.title,
        text: card.text,
        date_created: card.date_created
      });

      return new Promise((resolve, reject) => {
        newCard.save((err, res) => {            
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateCard: async (parent, { _id, card }, context, info) => {
      return new Promise((resolve, reject) => {
        Card.findByIdAndUpdate(_id, { $set: { ...card } }, { new: true, useFindAndModify: false }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
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