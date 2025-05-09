const path = require('path')
const {Verifier} = require('@pact-foundation/pact')

describe('Pact Verification', () => {
    it ('should validate the pact',  () => {
        const verifier = new Verifier({
            providerBaseUrl: 'http://localhost:8000',
            pactUrls: [
                path.resolve(process.cwd(), '../pacts/HelloWorldConsumer-FastAPIProvider.json'),
                path.resolve(process.cwd(), '../pacts/GamesConsumer-FastAPIProvider.json'),
            ]
        })

        return verifier.verifyProvider().then((output) => {
            console.log('Pact verification complete!')
            console.log(output)
        })
    })

})