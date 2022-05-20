const express = require('express');

const router = express.Router();

//import du controlleur sauce


// pour uploader des fichiers avec le middleware multer
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauces');

const auth = require('../middleware/auth');

// la logique a l interieur de chaque route sera deporté dans le dossier controllers
// import des fonctions du controlleur
router.post('/', auth, multer, sauceCtrl.creatSauce);

// ------------------ modification des objets ------------------------------
// mettre a jour
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// supprimer
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// recup 1 seul objet
router.get('/:id', auth, sauceCtrl.getOneSauce);
// tout les objets
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;