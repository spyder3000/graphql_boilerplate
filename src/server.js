import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma' 

const pubsub = new PubSub()     // want to pass this to all our resolvers via context 

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers,      // e.g. resolvers: resolvers, 
    context(request) {
        // console.log(request.request.headers); 
        return {
            pubsub, 
            prisma, 
            request, 
        }
    }, 
    fragmentReplacements
});

export { server as default }