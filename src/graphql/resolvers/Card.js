// The Card schema.
import Card from "../../models/Card";

export default {
  Query: {    
    cards: async (parent, args, context, info) => {
      const cards = await Card.find({})
        .populate()
        .exec();

      return cards.map(i => ({
        _id: i._id.toString(),
        user_id: i.user_id.toString(),
        category: i.category,
        title: i.title,
        text: i.text
      }));
    },
    cardsByCategory: async (parent, { category }, context, info) => {
        const cards = await Card.find({ "category": category })
          .populate()
          .exec();
  
        return cards.map(i => ({
          _id: i._id.toString(),
          user_id: i.user_id.toString(),
          category: i.category,
          title: i.title,
          text: i.text
        }));
      }    
  },
  Mutation: {
    createCard: async (parent, { card }, context, info) => {
      const newCard = await new Card({
        user_id: card.user_id,
        category: card.category,
        title: card.title,
        text: card.text
      });

      return new Promise((resolve, reject) => {
        newCard.save((err, res) => {            
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateCard: async (parent, { _id, card }, context, info) => {
      return new Promise((resolve, reject) => {
        Card.findByIdAndUpdate(_id, { $set: { ...card } }, { new: true }).exec(
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