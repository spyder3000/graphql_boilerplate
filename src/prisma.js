// NOTE:  Many commented examples copied to playground\59_prisma.js  

import { Prisma } from 'prisma-binding'; 
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',    // the type definitions for the endpoint that we're connecting to (e.g. comments, users, etc)
    endpoint: process.env.PRISMA_ENDPOINT,    // the actual URL where the graphQL API resides;  
    secret: process.env.PRISMA_SECRET, 
    fragmentReplacements: fragmentReplacements 
}) 

export { prisma as default }
