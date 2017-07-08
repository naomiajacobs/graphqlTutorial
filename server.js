const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    rollManyDice(numDice: Int!, numSides: Int): [Int]
  }
`)

const root = {
  rollManyDice: ({ numDice, numSides}) => {
    const output = [];
    for(let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * numSides || 6))
    }
    return output
  },
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(4000)
console.log('Running')
