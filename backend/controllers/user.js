// routes d hautentication pour le controleur du  formulaire de connexion

// pour le cryprtage de mot de passe
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// creation de new user dans la base de donnée
// a partir du formulaire de l inscription
exports.signup = (req, res, next) => {
  // creation du hash du mdp defini sur 10tours
  bcrypt.hash(req.body.password, 10)
    // on recupere le mdp crypté/ hash du mdp
    .then(hash => {
      // enregistrement du nouveau user 
      const user = new User({
        email: req.body.email,
        password: hash
      });
      // enregistrement dans la base de donnée
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // que l user correspond a celui envoyé dans la requete 
  User.findOne({ email: req.body.email })
    .then(user => {
      // si on a recuperer un user ou non 
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // on compare le mdp envoyé avec le user recuperer
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              // clé secrete simple pour dev uniquement
              // pour la production on utilise une clé secrete beaucoup plus longue et plus aleatoire
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};