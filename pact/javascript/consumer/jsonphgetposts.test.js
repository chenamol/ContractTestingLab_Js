const {PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')
const {eachLike} = Matchers
const postSchema = require('../schemas/posts')
const { fromProviderState } = require('@pact-foundation/pact/src/v3/matchers')

//This is the consumer 
//define el contrato. 
const pact = new PactV3( {
    dir: path.resolve(process.cwd(), './pacts'),
    consumer: 'jsonPlaceConsumer',
    provider: 'FastAPIProvider'
})


describe("JSONPlaceHolder GET test", () => { 
    it("should return all info", () => {
        pact
            .uponReceiving("A request to get all posts")
            .withRequest({
                method: "GET",
                path: "/users/1/posts",
            })
            .willRespondWith({
                status: 200, 
                headers: {
                    "Content-Type": "application/json",
                },
                //pára probar listas utilizando eachLike.
                body: eachLike(postSchema, { min: 1 }),
                 }) 
        
                return pact.executeTest(async (mockServer) => { 
                const response = await axios.get(`${mockServer.url}/users/1/posts`)
               /*  match(response.status, 201)
                match(response.data, [{
                    userId: 1,
                    id: 1,
                    title: "delectus aut autem",
                    body: "delectus aut autem",
                }]) */
        })
            

    })

    it("should return a post by ID", () => {
        pact
        //se utiliza given para setear el token de autenticación
        .given('A logged user with a valid token')
            .uponReceiving("A request to get a post by ID")
            .withRequest({
                method: "GET",
                path: "/users/1/posts/1",
                headers: {
                    //"Authorization": 'Bearer... here goes the real bearer token',
                    'Authorization':fromProviderState('Bearer ${token}', 'Bearer token')
                },
            })
            .willRespondWith({
                status: 200, 
                headers: {
                    "Content-Type": "application/json",
                },
                body: postSchema,
                 }) 
        
                return pact.executeTest(async (mockServer) => { 
                const response = await axios.get(`${mockServer.url}/users/1/posts/1`, {
                    headers: {
                        'Authorization': 'Bearer... here goes the real bearer token',
                        }
                })
               
    })
    
})
