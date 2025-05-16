const {PactV3, Matchers } = require('@pact-foundation/pact')
const { eachLike, boolean, hexadecimal } = require('@pact-foundation/pact/src/dsl/matchers')
const { match } = require('assert')
const axios = require('axios')
const path = require('path')
const {string, integer, term} = Matchers


//This is the consumer 
//define el contrato. 
const pact = new PactV3( {
    dir: path.resolve(process.cwd(), './pacts'),
    consumer: 'jsonPHGetPosts',
    provider: 'FastAPIProvider'
})


describe("JSONPlaceHolder GET test", () => {
    it("should return all info", () => {
        pact
            .uponReceiving("A request to get all posts")
            .withRequest({
                method: "GET",
                path: "/users/1/todos",
        })
        .willRespondWith({
            status: 200, 
            headers: {
                "Content-Type": "application/json",
            },
            //pára probar listas utilizando eachLike.
            body: eachLike({
                userId: integer(1),
                id: integer(1),
                title: string("delectus aut autem"),
                completed: boolean(true),
            })
             })
        return pact.executeTest(async (mockServer) => {
            await axios.get(`${mockServer.url}/users/1/todos`)
        })
    })
})