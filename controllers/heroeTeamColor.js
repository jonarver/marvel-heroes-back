const { response } = require('express');

const HeroeTeamColor = require('../models/heroeTeamColor');

const crearHeroeTeamColor = async (req, res = response) => {
    
    const heroeTeamColor = new HeroeTeamColor(req.body);
  
    try {
      const heroeTeamColorDB = await heroeTeamColor.save();
      res.json({
        ok: true,
        heroeTeamColor: heroeTeamColorDB,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
      });
    }
  };

  const actualizarHeroeTeamColor = async (req, res = response) => {

    const id = req.params.id;

    try {
        const heroeTeamColorDB = await HeroeTeamColor.findOneAndUpdate( {id_heroe: id},req.body, {
          new: true
        } );
        res.json({
            ok: true,
            usuario: heroeTeamColorDB
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = {
    crearHeroeTeamColor,
    actualizarHeroeTeamColor
  };