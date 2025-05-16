const { Matchers } = require('@pact-foundation/pact')
const {string, integer, boolean, term, hexadecimal} = Matchers

const postSchema = {
    userId: integer(1),
    id: integer(1),
    title: string("delectus aut autem"),
    body: string("delectus aut autem"),

}

module.exports = postSchema