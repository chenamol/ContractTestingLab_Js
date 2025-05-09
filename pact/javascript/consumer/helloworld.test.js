const {PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')
const {string} = Matchers


//This is the consumer 
//define el contrato. 
const pact = new PactV3( {
    dir: path.resolve(process.cwd(), '../pacts'),
    consumer: 'HelloWorldConsumer',
    provider: 'FastAPIProvider'
})

//crea los escenarios de prueba
describe('Hello World', () => {
    it('Should say hello', () => {
        //interaccion
        pact
        //prepara el scenario de prueba, es una pequeña descripción. 
            .given('Hello world')
            .uponReceiving('A request to receive hello world')
            .withRequest({
                //aqui tambien se puede poner los headers, el body, etc.  esta es la interacción. la request que se va hacer al servidor
                method: 'GET',
                path: '/'
            })
            .willRespondWith({
                status:200,
                headers:{
                    'Content-Type': 'aplication/json'
                },
                body:{
                    "Hello":string()
                }
            })

            return pact.executeTest(async (mockServer) => {
                await axios.get(`${mockServer.url}/`)


            })
    })
})