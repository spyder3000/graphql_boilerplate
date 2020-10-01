// In charge of getting resolvers object built -- copy from index.js 
import { extractFragmentReplacements } from 'prisma-binding' 
import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import User from './User'

const resolvers = {   // Resolvers for our API (a set of functions - e.g. where we query data) 
    Query, 
    Mutation, 
//    Subscription, 
    User
}

// a list of all GraphQL fragment definitions (in our case, just the ones in User.js);  goes through all of our resolvers (including User) 
//      & returns fragments found in fragmentReplacements
const fragmentReplacements = extractFragmentReplacements(resolvers)     

export { resolvers, fragmentReplacements } 