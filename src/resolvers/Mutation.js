import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId' 
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

// strategy -- take in pwd -> validate pwd -> hash pwd -> Generate auth token 
const Mutation = {
    async createUser(parent, args, {db, prisma}, info) {
        const password = await hashPassword(args.data.password);   

        // note: we can skip the prisma.exists step & let prisma do validation (error handling not as friendly though)
        const emailTaken = await prisma.exists.User({ email: args.data.email })  // returns boolean value 
        if (emailTaken) {
            throw new Error('Email taken.'); 
        }
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,   // e.g. name, email, plain text pwd
                password: password   // overwrites plain text pwd with hashed one generated above
            }  // 2nd param of info is what gets returned to user;  
        }, null) // info)   for custom fields, cannot use info as we cannot select token or user that comes back, just the fields defined in User 

        return {
            user, 
            token: generateToken(user.id)
        }

    }, 
    async login(parent, args, {prisma}, info) {
        const user = await prisma.query.user({ 
            where: {
                email: args.data.email 
            }
        })   
        if (!user) {
            throw new Error('Unable to login'); 
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password);    // user.password is hashed pwd stored  
        if (!isMatch) {
            throw new Error('Unable to login'); 
        }
        return {
            user, 
            token: generateToken(user.id)
        }
    }, 

    async deleteUser(parent, args, {prisma, request }, info) {
        const userId = getUserId(request)   // call to get userId from token;  mods to only allow user to remove themselves
        return prisma.mutation.deleteUser({ 
            where: { id: userId }        
        }, info); 
    }, 

    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)   // call to get userId from token;  
        // checks if password is a string (a value was entered for pwd);  if so, modify args.data.password for prisma db update 
        if (typeof args.data.password === 'string') {   
            args.data.password = await hashPassword(args.data.password);
        }

        return prisma.mutation.updateUser({     // return promise;  makes sure the caller of Node API gets back expected data
            where: { id: userId }, 
            data: args.data     // args.data is an object that contains name or email (see schema.graphql) 
        }, info);         
    }
}

export { Mutation as default }