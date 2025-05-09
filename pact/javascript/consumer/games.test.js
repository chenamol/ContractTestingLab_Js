const {PactV3, Matchers } = require('@pact-foundation/pact')
const { eachLike, boolean } = require('@pact-foundation/pact/src/dsl/matchers')
const axios = require('axios')
const path = require('path')
const {string} = Matchers


//This is the consumer 
//define el contrato. 
const pact = new PactV3( {
    dir: path.resolve(process.cwd(), '../pacts'),
    consumer: 'GamesConsumer',
    provider: 'FastAPIProvider'
})


describe("GameConsumer", () => {
    it("should return all games", () => {
        pact
            .uponReceiving("A request to get all games")
            .withRequest({
                method: "GET",
                path: "/games/",
            })
            .willRespondWith({
                status: 200, 
                headers: {
                    "Content-Type": "application/json",
                },
                //pára probar listas utilizando eachLike.
                body: {
                    data:
                        eachLike({
                            id: integer("1"),
                            name: string("Game 1"),
                            year: integer(2021),
                            thumbnail: string('https://example.com/image.jpg'),
                            primary_color: string('#FFFFFF'),
                            is_released: boolean(true)
                        })
                }
            })
            return pact.executeTest(async (mockServer) => { 
                await axios.get(`${mockServer.url}/games/`)
            })
})

})