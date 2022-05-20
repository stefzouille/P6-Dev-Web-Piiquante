require('dotenv').config()

// importer express
const express = require('express');

// creerla const pour appelé la methode express pour creer une application express
const app = express();

// connection à la base de donnée
const mongoose = require('mongoose');

const mdpApi = process.env.PROJECT_API_KEY;

const nameApi = process.env.NAME_API;
lo

const dataBase = `mongodb+srv://${nameApi}:${mdpApi}@cluster0.e9dod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// mongoose.connect('mongodb+srv://lolovisiteur:kdh8zrOHPttIWlcg@cluster0.e9dod.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
mongoose.connect(dataBase,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json()); // ou bodyParser.json()
console.log('coucou');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: 'Toto',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});

//export app
module.exports = app;