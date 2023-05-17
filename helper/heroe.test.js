const { urlformat }  = require('./heroe')
describe('helper',() =>(
    describe('heroes',()=>(
        describe('urlformat',()=>(
            it('success full params', ()=>{
                const url = 'https://gateway.marvel.com/v1/public/characters?ts=1683727615008&hash=a9ec109ef8430635dc5ece303496481a&limit=10&offset=0&nameStartsWith=a&apikey=cc1952a474bd6ba08844d7255330d469';
                  const limit =10
                  const offset = 0
                  const nameStartsWith = 'a'
                  const myMock = jest.fn();
                  myMock.mockReturnValueOnce(url)
                                console.log(myMock());
                const result =  urlformat(limit,offset,nameStartsWith);
                console.log(result);
                expect(result).toEqual(url);
                //expect(result).toEqual(heroes);
                 
            }),
            it('success not params nameStartsWith', ()=>{
                const url = 'https://gateway.marvel.com/v1/public/characters?ts=1683727615008&hash=a9ec109ef8430635dc5ece303496481a&limit=10&offset=0&apikey=cc1952a474bd6ba08844d7255330d469';
                  const limit =10
                  const offset = 0
                  const myMock = jest.fn();
                  myMock.mockReturnValueOnce(url)
                                console.log(myMock());
                const result =  urlformat(limit,offset);
                console.log(result);
                expect(result).toEqual(url);
                //expect(result).toEqual(heroes);
                 
            })
        ))
    ))
))