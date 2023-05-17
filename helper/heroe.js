const HeroeTeamColor = require('../models/heroeTeamColor');

const apiUrl = 'https://gateway.marvel.com/v1/public/'
const ts='1683727615008'
const hash='a9ec109ef8430635dc5ece303496481a'
const apikey ='cc1952a474bd6ba08844d7255330d469'

const urlformat = (limit,offset, nameStartsWith)=>{
    if (nameStartsWith!=undefined) {
        return  apiUrl+'characters?ts='+ts+'&hash='+hash
            +'&limit='+limit+'&offset='+offset
            +'&nameStartsWith='+nameStartsWith
            +'&apikey='+apikey;
    } else {
        return apiUrl+'characters?ts='+ts+'&hash='+hash
            +'&limit='+limit+'&offset='+offset
            +'&apikey='+apikey;
    }
  }
  const procesarArreglo = async(results)=>{
    let data=[];
    for (let i = 0; i < results.length; i++) {
        const heroe = {
          "id":results[i].id,
          "name":results[i].name,
          "description":results[i].description,
          "modified":results[i].modified,
          "thumbnail":results[i].thumbnail,
          "resourceURI":results[i].resourceURI,
          "teamColor": ""
          }     
          const  heroeTeamColor  = await HeroeTeamColor.find({ id_heroe: results[i].id });
          if (heroeTeamColor.length > 0) {
            heroe.teamColor= heroeTeamColor[0].color
          }
          data.push( heroe );
      }
     
      return data
  }
module.exports = {
    urlformat,procesarArreglo
}