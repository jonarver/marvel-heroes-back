/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');


const  {getHeroes}  = require('../controllers/heroe');



const router = Router();





router.get('/:page/:limit/:nameStartsWith?',  getHeroes);







module.exports = router;