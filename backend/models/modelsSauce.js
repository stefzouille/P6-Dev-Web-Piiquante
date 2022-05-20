// creer le model de sauce piiquante pour la base de donnée

const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  usersDisliked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

});

module.exports = mongoose.model('modelsSauce', sauceSchema);