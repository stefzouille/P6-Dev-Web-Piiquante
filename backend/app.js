require('dotenv').config()

// importer express
const express = require('express');

// creerla const pour appelé la methode express pour creer une application express
const app = express();

// connection à la base de donnée
const mongoose = require('mongoose');
const path = require('path');

// importation des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//dotenv pour cacher clé api du git
const mdpApi = process.env.PROJECT_API_KEY;
const nameApi = process.env.NAME_API;
const dataBase = `mongodb+srv://${nameApi}:${mdpApi}@cluster0.e9dod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`



mongoose.connect(dataBase,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.json()); // ou bodyParser.json()

// enregistre le router dans notre application

// servir le dossier image quand on fait une requete avec /images
app.use('/images', express.static(path.join(__dirname, 'images')));
// pour cette route la on utilise la route
app.use('/api/sauces', sauceRoutes);
// pour la routes auth 
app.use('/api/auth', userRoutes);


//export app
module.exports = app;