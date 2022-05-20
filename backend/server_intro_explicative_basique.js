// creer un serveur node basique qui va recevoir des requetes http

// vous importez le package HTTP natif de Node
// const http = require('http');

// importer notre application
// const app = require('./app_intro_explicative_basique');


//------------------------------------------------la fct est passé dans l app.js--------
// // et l'utilisez pour créer un serveur, en passant une fonction qui sera exécutée à chaque appel effectué vers ce serveur
// // objets request et response en tant qu'arguments
// const server = http.createServer((req, res) => {

//   // méthode end de la réponse pour renvoyer une réponse de type string à l'appelant
//   res.end('Hello serveur fonctionnel ! nice work bro.');
// });

// dire a l application express sur quel port ecouter
// app.set('port', process.env.PORT || 3000);
// // enleve la function et le server.listen()-------la fct est passé dans l app.js---------
// const server = http.createServer(app);


// console.log("salut, serveur lancé !!");

// // configure le serveur pour qu il ecoute sur le port 3000
// server.listen(process.env.PORT || 3000);

// puis ouvrir la page dans le navigateur avec http://localhost:3000

// installation de nodemon et lancer le serveur avec :  nodemon server ( dans la console) 
// ecoute de chgment fichier et relance le serveur automatiquement ( comme sass pour css )
