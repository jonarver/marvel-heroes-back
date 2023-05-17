const axios = require("axios");
const {getHeroes, fetchUsers, BASE_URL}  = require('./heroe');
const HeroeTeamColor = require('../models/heroeTeamColor');
jest.mock("axios");
describe('controllers',() =>(
    describe('Heroes',() =>(
        describe('get',() =>(
            beforeAll(() => {
                HeroeTeamColor.find = jest.fn().mockResolvedValue([{
                        _id: '1',
                        color: 'azul'
                    },
                    {
                        _id: '2',
                        color: 'amarillo'
                        
                    },
                ])
            }),
            it('list heroes',async ()=>{
                const heroes = {
                    data:{
                        data:{
                            offset: 0,
                            limit: 20,
                            total: 1,
                            count: 1,
                            results: [  { 
                            id:1,
                            name:"spiderman",
                            description:"araña",
                            modified:"modified",
                            thumbnail:"thumbnail",
                            resourceURI:"resourceURI",
                            teamColor: "azul"},
                            {   id:2,
                                name:"ironman",
                                description:"hierro",
                                modified:"modified",
                                thumbnail:"thumbnail",
                                resourceURI:"resourceURI",
                                teamColor: "azul" },]
                        }
                    }
                }
                jest.doMock('../mock/db', () => {
                    // ../db mock
                    return {
                        find: () => ['mocked azul', 'mocked amarillo', 'mocked verde']
                    };
                });

                jest.mock('../helper/heroe')
                const {procesarArreglo } = require('../helper/heroe')
                const pArreglos = new procesarArreglo(HeroeTeamColor)
                axios.get.mockResolvedValueOnce(heroes);
                  // when
                  const response ={
                    //retornara el mismo objeto que se esta llamando
                    status:jest.fn().mockReturnThis(),
                    send:jest.fn()
                  }
                  const req={
                   params:{limit:10,page:0}
                  }
                const result = await getHeroes(req,response);
                console.log(result);
                expect(response.status.mock.calls).toEqual([[200]]);
                //expect(result).toEqual(heroes);
                 
            }),
            it('list heroes    params:{limit:10,page:2}',async ()=>{
                const heroes = {
                    data:{
                        data:{
                            offset: 0,
                            limit: 20,
                            total: 1,
                            count: 1,
                            results: [  { 
                            id:1,
                            name:"spiderman",
                            description:"araña",
                            modified:"modified",
                            thumbnail:"thumbnail",
                            resourceURI:"resourceURI",
                            teamColor: "azul"},
                            {   id:2,
                                name:"ironman",
                                description:"hierro",
                                modified:"modified",
                                thumbnail:"thumbnail",
                                resourceURI:"resourceURI",
                                teamColor: "azul" },]
                        }
                    }
                }
                jest.doMock('../mock/db', () => {
                    // ../db mock
                    return {
                        find: () => ['mocked azul', 'mocked amarillo', 'mocked verde']
                    };
                });
                jest.mock('../helper/heroe')
                const {procesarArreglo } = require('../helper/heroe')
                const pArreglos = new procesarArreglo(HeroeTeamColor)
                axios.get.mockResolvedValueOnce(heroes);
                  // when
                  const response ={
                    //retornara el mismo objeto que se esta llamando
                    status:jest.fn().mockReturnThis(),
                    send:jest.fn()
                  }
                  const req={
                   params:{limit:10,page:2}
                  }
                const result = await getHeroes(req,response);
                console.log(result);
                expect(response.status.mock.calls).toEqual([[200]]);                 
            }),
            it('fails',async ()=>{
                const heroes = [
                    
                    { id: 1, name: "iron man" },
                    { id: 2, name: "espideman" },
                  ];
                  axios.get.mockResolvedValueOnce(heroes);
                  // when
                  const response ={
                    //retornara el mismo objeto que se esta llamando
                    status:jest.fn().mockReturnThis(),
                    send:jest.fn()
                  }               
                const result = await getHeroes({},response);
                expect(response.status.mock.calls).toEqual([[404]]);
                //expect(result).toEqual(heroes);
                 
            })
        ))
    )) 
)) ;

