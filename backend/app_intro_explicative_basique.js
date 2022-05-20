// importer express
const express = require('express');

// creerla const pour appelé la methode express pour creer une application express
const app = express();

//creer une route pour la page d accueil
// la requette et la reponse sont des objets use est un argument
// cette fonction est utilisé pour tout type de requetes http

// cette fct est un middleware qui va etre executé pour chaque requete http
// on recoit req l objet requette et res l objet reponse
// mais on recoit egalement une fct next qui permet de renvoyer à la prochaine fct/middleware suivante
app.use((req, res, next) => {
  console.log('requete reçue !');
  // ne pas oublier d appeler la fct next pour passer à la prochaine fct/middleware sinon pas de reponse
  next();
});

app.use((req, res, next) => {
  res.status(201);
  console.log('200 to 201 ok !');
  next();
});

// sans le 'next' la console affiche une erreur [nodemon] app crashed - waiting for file changes before starting...
app.use((req, res, next) => {
  // renvoie une reponse en json
  res.json({ message: 'votre requette a bien été reçue !' });
  next();
});

// dernier middleware pour l instant
app.use((req, res) => {
  console.log('reponse envoyé avec succés !');
});

//export app
// module.exports = app;