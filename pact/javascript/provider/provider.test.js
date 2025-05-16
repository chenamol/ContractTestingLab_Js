const path = require('path')
const {Verifier} = require('@pact-foundation/pact')

describe('Pact Verification', () => {
    it ('should validate the pact',  () => {
        const verifier = new Verifier({
            providerBaseUrl: 'https://jsonplaceholder.typicode.com',
            pactUrls: [
               // path.resolve(process.cwd(), '../pacts/HelloWorldConsumer-FastAPIProvider.json'),
               // path.resolve(process.cwd(), '../pacts/GamesConsumer-FastAPIProvider.json'),
                path.resolve(process.cwd(), './pacts/jsonPlaceConsumer-FastAPIProvider.json'),
                path.resolve(process.cwd(), './pacts/jsonPHGetPosts-FastAPIProvider.json'),
            ],
            stateHandlers {
                'A logged user with a valid': () => {
                    console.log('A logged user with a valid token')
                    return Promise.resolve({
                        token:'Real token here'
                    })
            }
        })

        return verifier.verifyProvider().then((output) => {
            console.log('Pact verification complete!')
            console.log(output)
        })
    })

})