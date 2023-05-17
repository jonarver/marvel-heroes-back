const { response } = require('express');

const HeroeTeamColor = require('../models/heroeTeamColor');

const crearHeroeTeamColor = async (req, res = response) => {
    const heroeTeamColor = new HeroeTeamColor(req.body);
    try {
      const heroeTeamColorDB = await heroeTeamColor.save();
      res.json({
        ok: true,
        status:200,
        heroeTeamColor: heroeTeamColorDB,
      });
    } catch (error) {

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
            status:200,
            ok: true,
            usuario: heroeTeamColorDB!=null?heroeTeamColorDB:'Heroe no encontrado'
        });        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const deleteHeroeTeamColor = async (req, res = response) => {
  const id = req.params.id;
  try {
      const heroeTeamColorDB = await HeroeTeamColor.deleteOne( {id_heroe: id}, {
        new: true
      } );
      res.json({
          status:200,
          ok: true,
          msg: heroeTeamColorDB.deletedCount>0?'Registro eliminado':'Heroe no encontrado'
      });        
  } catch (error) {

      res.status(500).json({
          ok: false,
          msg: 'Error inesperado'
      })
  }
}

module.exports = {
    crearHeroeTeamColor,
    actualizarHeroeTeamColor,
    deleteHeroeTeamColor
  };

