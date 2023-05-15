/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getHeroes,getHeroeById } = require('../controllers/heroe');

const router = Router();

router.get( '/characters/:id',
    getHeroeById
);


router.get('/:page/:limit/:nameStartsWith?',  getHeroes);


//router.post('/', addTeamHeroeById);


module.exports = router;