// logique metier des routes 

const Sauce = require('../models/modelsSauce');

// fs gestionnaire de fichier 
const fs = require('fs');

// export d une fonction pour la creation d une sauce
exports.creatSauce = (req, res, next) => {
  // extraire l objet json de la requete 
  const sauceObject = JSON.parse(req.body.sauce);
  // delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    // generer l url de l image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

  });
  sauce
    .save()
    .then((sauce) => { res.status(201).json({ sauce }); })
    .catch((error) => {
      res.status(400).json({ error, });
    });
};

// modifier une sauce
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (req.body.userId && req.body.userId !== sauce.userId) {
        throw 'Utilisateur non autorisé !';
      }
      // supprimer l image du serveur si elle existe et dans le dossier images
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { })
    });
  // si il y a une image dans la requete
  const sauceObject = req.file ?
    {
      // extraire l objet json de la requete
      ...JSON.parse(req.body.sauce),
      // generer l url de l image
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (req.body.userId && req.body.userId !== sauce.userId) {
        throw 'Utilisateur non autorisé !';
      }
      // supprimer l image du serveur si elle existe et dans le dossier images
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// recuperer une seule sauce
exports.getOneSauce = (req, res, next) => {
  // recuperer l objet sauce
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

// recup toute les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
}

//Le like sur les sauces
exports.likeSauce = (req, res, next) => {
  console.log(req.body);
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      // ajouter le userId a la liste des userLiked
      sauce.usersLiked.push(req.body.userId);
      // ajouter le like a la liste des likes
      sauce.likes += 1;
      // sauvegarder la sauce
      sauce
        .save()
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => {
          console.log(error);
          res.status(400).json({ error })
        });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ error })
    });
};


