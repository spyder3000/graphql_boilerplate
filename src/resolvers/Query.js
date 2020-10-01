import { Prisma } from "prisma-binding"
import getUserId from '../utils/getUserId' 

// type Query defined in graphql-prisma\src\schema.graphql 
const Query = {
    // 4 args get passed to all Resolvers (parent, args, ctx, info)   ctx is Context data (e.g. userid of user logged in)
        // 2nd param null would return all scalar fields (so no relational data);  
        // 2nd param of string was used in prisma.js, but have to explicitly define what we need - but query is from client
        // 2nd param of object (e.g. info) is what we want for user from data;  
    users(parent, args, { prisma}, info) {   // db, prisma are both defined for ctx param (param 3) in index.js 
        const opArgs = {
            first: args.first, 
            skip: args.skip, 
            after: args.after, 
            orderBy: args.orderBy
        } 
        if (args.query) {
            opArgs.where = {    // change where property of opArgs
                OR: [{name_contains: args.query}]
            }
        }
        return prisma.query.users(opArgs, info)  // 1st arg is operations arg;  2nd arg is return object; returns promise
        // note:  hardcoded logic as found in db.users removed & saved in 59_Query.js 
    }, 

    // Returns User information for curr user 
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, true)   // true is for requireAuth 
        return prisma.query.user({
            where: {
                id: userId
            }
        })
    }
}

export { Query as default }