import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma' 

const userOne = {
    input: {
        name: 'Lebron', 
        email: 'lebron@example.com', 
        password: bcrypt.hashSync('Qwert111')
    }, 
    user: undefined, 
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'Simon', 
        email: 'simon@example.com', 
        password: bcrypt.hashSync('abc12345')
    }, 
    user: undefined, 
    jwt: undefined
}

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyUsers() 

    // Create user one 
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)
    
    // Create user two 
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)
}

export { seedDatabase as default, userOne, userTwo }