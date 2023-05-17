
const axios = require('axios');
const { urlformat,procesarArreglo } = require('../helper/heroe');

   const getHeroes = async(req, response) => {
    let data = {};
    try {
        const limitp = req.params.limit;
        const offsetp = req.params.limit*req.params.page;
        const url =  urlformat(limitp,offsetp, req.params.nameStartsWith);
        const res = await axios.get(url);
        const {offset,limit,total,count}=res.data.data;
        data.status= true;
        data.limit=limit;
        data.nextPage=Number(req.params.page)+1;
        data.page=Number(req.params.page)>0? Number(req.params.page)+1:1;
        data.beforePage=Number(req.params.page)>0? Number(req.params.page)-1:0;
        data.total=total;
        data.totalPages=Math.trunc(total/limit)+1;
        data.count=count;
        data.offset=offset;
        data.heroes= await procesarArreglo(res.data.data.results) ;
        response.status(200).send(data) ;   
     } catch (error) {
      response.status(404).send(data);
     }
  }

module.exports = {
  getHeroes
    
}