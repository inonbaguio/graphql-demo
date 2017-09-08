import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';

import axios from 'axios';

const BASE_URL = 'http://people-friends.app';

function getPersonByUrl(relativeUrl) {
    const url = `${BASE_URL}${relativeUrl}`;

    return axios.get(url).then(res => {
        return res.data.person;
    });

}

const PersonType = new GraphQLObjectType({
    name : 'Person2',
    description : '...',
    fields : () => ({
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
        id : { type : GraphQLString },
        friends : {
            type : new GraphQLList(PersonType),
            resolve : (person, args) => person.friends
        }
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
