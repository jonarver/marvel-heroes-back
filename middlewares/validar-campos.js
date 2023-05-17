

const { response } = require('express');
const { heroeTeamColorSchema } = require('../schema/heroeTeamColorSchema');
const Validator = require('jsonschema').Validator;

var validator = new Validator();

const validarCampos = (req, res = response, next ) => {
            try {
                req.body.id_heroe=Object.entries(req.params).length>0 ? Number(req.params.id): req.body.id_heroe;       
                if ( validator.validate(req.body, heroeTeamColorSchema).errors.length>0 ) {
                  return res.status(400).json({ ok: false,errors: isValid.errors[0].stack});
              }
                next();
          } catch (error) { res.status(500).json({ok: false,msg: 'Error inesperado'}); }
  }

module.exports = {
    validarCampos
}
