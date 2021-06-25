import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';

import axios from 'axios';

const BASE_URL = 'http://laravel8.test/api';

const getPersonByUrl = relativeUrl =>  {
    const url = `${BASE_URL}${relativeUrl}`;
    return axios.get(url).then(res => {
        return res.data.person;
    });
}

const PersonType = new GraphQLObjectType({
    name : 'Person',
    description : '...',
    fields : () => ({
        id : { type : GraphQLString },
        firstName : {
            type : GraphQLString,
            resolve : (person) => person.first_name
        },
        lastName : {
            type : GraphQLString,
            resolve : (person) => person.last_name
        },
        email : {type : GraphQLString},
        username : {type : GraphQLString},
        friends : {
            type: new GraphQLList(PersonType),
            resolve: (person) => person.friends.map((val, index) => getPersonByUrl(val))
        },
    })
});

const QueryType = new GraphQLObjectType({
    name : 'Query',
    description : '...',
    fields : () => ({
        person : {
            type : PersonType,
            args : {
                id : {type : GraphQLString},
            },
            resolve : (root, args) => getPersonByUrl(`/people/${args.id}`)
        }
    })
});

export default new GraphQLSchema({
    query : QueryType,
});
