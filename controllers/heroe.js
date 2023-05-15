const { response } = require('express');
const axios = require('axios');
const HeroeTeamColor = require('../models/heroeTeamColor');


//const Heroe = require('../models/heroe');
const apiUrl = 'https://gateway.marvel.com/v1/public/'
const ts='1683727615008'
const hash='a9ec109ef8430635dc5ece303496481a'
const apikey ='cc1952a474bd6ba08844d7255330d469'

const getHeroes = async(req, res = response) => {
    let heroes= []
    let data = {}
    const limit = req.params.limit
    const offset = req.params.limit*req.params.page
    const url =apiUrl+'characters?ts='+ts+'&hash='+hash
               +'&limit='+limit+'&offset='+offset
               +( req.params.nameStartsWith!=undefined ? ('&nameStartsWith=' +  req.params.nameStartsWith) : '')
               +'&apikey='+apikey
    console.log(req.params);
    await axios.get(url)
    .then( async res => {          
      const {offset,limit,total,count}=res.data.data
      data.status= true
      data.limit=limit
      data.nextPage=Number(req.params.page)+1
      data.page=Number(req.params.page)>0? Number(req.params.page)+1:1
      data.beforePage=Number(req.params.page)>0? Number(req.params.page)-1:0
      data.total=total
      data.totalPages=Math.trunc(total/limit)+1
      data.count=count
      data.offset=offset
      data.heroes=[]
      const results = res.data.data.results     
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
        data.heroes.push( heroe );
    }
    }).then(()=>{
      res.json({
          data
      }) 
    })
    .catch(err => {
      console.log('Error: ', err);
      res.json({
        ok: false,
        data
    })
    });
}
const getHeroeById = async(req, res = response) => {
  const id = req.params.id;
  let heroe= []
  let data = {}
  const url =apiUrl+'characters/'+id+'?ts='+ts+'&hash='+hash
             +'&apikey='+apikey
             console.log("getHeroeById======================");
  await axios.get(url)
    .then(async res => { 
      data.status= true
      data.heroe=[]
      const results = res.data.data.results
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
          data.heroe.push( heroe );
      }
    })
  res.json({
    data
})  
}

module.exports = {
    getHeroes,
    getHeroeById
}