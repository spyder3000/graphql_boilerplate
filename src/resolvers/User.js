import getUserId from '../utils/getUserId'

// set up Resolver Method for User field that links to Posts (the User object is the 'parent' arg)

const User =  {
    // for this resolver, will return a string, an email, or null;  parent is User object  
    email: {
        // userId is just a var name (not used below);  'id' is captured from User & used in parent.id below;  'id is captured whether 
        //   the request includes the id field or not  
        fragment: 'fragment userId on User { id }',   
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false)  // false = not requiring auth user; 
            // console.log(parent);  // can trigger via posts() query in playground;  includes parent.id, parent.name, parent.email, parent.posts,etc 
            if (userId && userId === parent.id) {
                return parent.email
            }
            else {
                return null
            }
        }
    }
}

export { User as default } 
