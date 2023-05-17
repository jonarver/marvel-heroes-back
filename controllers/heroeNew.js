const apiUrl = 'https://gateway.marvel.com/v1/public/'
const ts='1683727615008'
const hash='a9ec109ef8430635dc5ece303496481a'
const apikey ='cc1952a474bd6ba08844d7255330d469'
const Handler = ({axios}) => {
    get: async(req, res ) => {
        try {
            let data = {};
            const limitP = req.params.limit;
            const offsetP = req.params.limit*req.params.page;
            const {nameStartsWith} = req.params;
            const url = await url(limitP,offsetP,nameStartsWith);
            const resp = await get(url);
            const {offset, limit, total,count}=resp.data.data;
            data.status= true;
            data.limit=limit;
            data.nextPage=Number(req.params.page)+1;
            data.page=Number(req.params.page);
            data.beforePage=Number(req.params.page)-1;
            data.total=total;
            data.totalPages=Math.trunc(total/limit)+1;
            data.count=count;
            data.offset=offset;
            data.heroes=await procesarArreglo(res.data.data.results);
            response.json({
                data
            }) 
          } catch(error) {
            response.json({
                ok: false,
                data
            })
          }
    }
    
 
}

const get = async (url)=>{
return await axios.get(url)
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

const url = async (limit,offset, nameStartsWith)=>{
    if (nameStartsWith!=undefined) {
        const url =apiUrl+'characters?ts='+ts+'&hash='+hash
            +'&limit='+limitP+'&offset='+offsetP
            + req.params.nameStartsWith
            +'&apikey='+apikey;
    } else {
        const url =apiUrl+'characters?ts='+ts+'&hash='+hash
            +'&limit='+limitP+'&offset='+offsetP
            +'&apikey='+apikey;
    }
}

module.exports = Handler

