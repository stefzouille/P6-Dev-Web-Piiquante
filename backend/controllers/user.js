// routes d hautentication pour le controleur du  formulaire de connexion
require('dotenv').config()
// pour le cryprtage de mot de passe
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


var passwordValidator = require('password-validator');
// securiser le mot de passe
// on verifie que le mot de passe respecte les conditions
// on verifie que le mot de passe est assez long
// on verifie que le mot de passe contient des majuscules
// on verifie que le mot de passe contient des minuscules
// on verifie que le mot de passe contient des chiffres
// on verifie que le mot de passe contient des caracteres speciaux
const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits()                                 // Must have digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values



// creation de new user dans la base de donnée
// a partir du formulaire de l inscription
exports.signup = (req, res, next) => {
  // verifier que le mot de passe respecte les conditions
  const validation = passwordSchema.validate(req.body.password);
  if (!validation) {
    // si le mot de passe n est pas valide
    // on renvoie un message d erreur
    console.log('mot de passe non sécurisé')

    return res.status(400).json({ message: 'Le mot de passe doit respecter les conditions' });
  }
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
              `${process.env.SECRETKEY}`,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};