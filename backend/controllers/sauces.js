// logique metier des routes 

const Sauce = require('../models/modelsSauce');

const fs = require('fs');

// export d une fonction pour la creation d une sauce
exports.creatSauce = (req, res, next) => {
  // extraire l objet json de la requete 
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    // generer l url de l image
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
    .then(() => res.status(201).json({
      message: 'Objet enregistré !'
    }))
    .catch(error => res.status(400).json({ error }));
}

// modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  modelsSauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  modelsSauce.findOne({ _id: req.params.id })
    .then(sauce => {
      // supprimer l image du serveur si elle existe et dans le dossier images
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        modelsSauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// recuperer une seule sauce
exports.getOneSauce = (req, res, next) => {
  modelsSauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

// recup toute les sauces
exports.getAllSauces = (req, res, next) => {
  modelsSauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
}