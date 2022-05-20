require('dotenv').config()

// importer express
const express = require('express');

// creerla const pour appelé la methode express pour creer une application express
const app = express();

const path = require('path');

// connection à la base de donnée
const mongoose = require('mongoose');


//import du model sauce modelsSauce
const modelsSauce = require('./models/modelsSauce');

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

app.use(express.json()); // ou bodyParser.json()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.post('/api/sauces', (req, res, next) => {
  delete req.body._id;
  const sauce = new modelsSauce({
    ...req.body
  });
  //enregister la sauce dans la base de donnée
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});

// mettre a jour la sauce
app.put('/api/sauces/:id', (req, res, next) => {
  modelsSauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
});

//supprimer la sauce
app.delete('/api/sauces/:id', (req, res, next) => {
  modelsSauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
});

// recuperer une seule sauce
app.get('/api/sauces/:id', (req, res, next) => {
  modelsSauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});

// recup toute les sauces
app.get('/api/sauces', (req, res, next) => {
  modelsSauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  // const sauce = [
  //   {
  //     _id: 'Toto',
  //     title: 'Mon premier objet',
  //     description: 'Les infos de mon premier objet',
  //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  //     price: 4900,
  //     userId: 'qsomihvqios',
  //   },
  //   {
  //     _id: 'oeihfzeomoihi',
  //     title: 'Mon deuxième objet',
  //     description: 'Les infos de mon deuxième objet',
  //     imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  //     price: 2900,
  //     userId: 'qsomihvqios',
  //   },
  // ];
  // res.status(200).json(sauce);
});

//export app
module.exports = app;