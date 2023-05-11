

const { response } = require('express');
const { heroeTeamColorSchema } = require('../schema/heroeTeamColorSchema');
const Validator = require('jsonschema').Validator;

var validator = new Validator();

const validarCampos = (req, res = response, next ) => {

          console.log("validator===",validator.validate(req.body, heroeTeamColorSchema).errors.length);        
          const isValid = validator.validate(req.body, heroeTeamColorSchema)
          console.log("isValid",isValid);
          console.log("validate.errors",isValid.errors);
            if ( isValid.errors.length>0 ) {
              return res.status(400).json({
                  ok: false,
                  errors: isValid.errors[0].stack
              });
          }
            next();
  }

module.exports = {
    validarCampos
}
