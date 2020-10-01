import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    // request.request only exists for Queries & mutations;  otherwise use Authorization for subscriptions
    const header = request.request ?  request.request.headers.authorization    // grab header from request (for Query, Mutations)
                    :  request.connection.context.Authorization  // for subscriptions

    if (header) {
        const token = header.replace('Bearer ', '')         // remove 'Bearer so just token remains
        const decoded = jwt.verify(token, process.env.JWT_SECRET)      // token verification based on secret from Mutation.js
        return decoded.userId       // return userid of authenticated user      
    }

    if (requireAuth) {
        throw new Error('Authentication required');     // stop if no header
    }
    
    return null   // means not Authenticated, but Auth not required 
}

export { getUserId as default }