/*
    Ruta: /api/HeroeTeam color
    asignarle el color del equipo acada heroe
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {  crearHeroeTeamColor, actualizarHeroeTeamColor } = require('../controllers/heroeTeamColor');

const router = Router();



router.post( '/',
    [
        
        validarCampos,
    ], 
    crearHeroeTeamColor 
);

router.put( '/:id',
    [
        
        
        validarCampos,
    ],
    actualizarHeroeTeamColor
);



module.exports = router;