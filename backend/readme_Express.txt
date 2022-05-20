dans le dossier backend taper : npm install express --save

creer un new fichier : app.js



Une application Express est fondamentalement une série de fonctions appelées middleware. 
Chaque élément de middleware reçoit les objets request et response , 
peut les lire, les analyser et les manipuler, le cas échéant. 
Le middleware Express reçoit également la méthode next , 
qui permet à chaque middleware de passer l'exécution au middleware suivant.
