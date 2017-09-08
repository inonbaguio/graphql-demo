import express from 'express';

// before adding graphql API
import graphqlHTTP from 'express-graphql';

import schema from './schema';

const app = express();

// GraphQL API
app.use(graphqlHTTP(() => ({
    schema,
    graphiql: true,
    pretty: true
})));

app.listen(5000, err => {
    if (err) throw err;
    console.log('Runnin\' in http://localhost:5000');
});
