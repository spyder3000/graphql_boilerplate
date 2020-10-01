import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma' 
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient' 
import { createUser, login, getUsers, getProfile } from './utils/operations'

const client = getClient() 

beforeEach(seedDatabase)

test('Should create a new user', async () => {
    const variables = {
        data: {
            name: 'Alvin', 
            email: 'alvin@example.com', 
            password: 'abc12345'
        }
    }

    const response = await client.mutate({
        mutation: createUser, 
        variables 
    })

    const exists = await prisma.exists.User({
        id: response.data.createUser.user.id   // from gql stmt above
    })
    expect(exists).toBe(true); 
})

test('Should expose public author profiles', async () => {
    const response = await client.query({ query: getUsers })

    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].email).toBe(null)   // not logged in so should not be able to access user email
    expect(response.data.users[0].name).toBe('Lebron')
})

test('Should not login with bad credentials', async () => {
    const variables = {
        data: {
            email:"lebron88@example.com",
            password:"Qwert111"
        }
    }

    await expect(
        client.mutate({ mutation: login, variables })  // variables will be passed to login fn above 
    ).rejects.toThrow()
})

test('Should not create user with invalid/short password', async () => {
    const variables = {
        data: {
            name: 'Oreo3', 
            email: 'oreo3@example.com',
            password: 'abc '           
        }
    }

    await expect(
        client.mutate({ mutation: createUser, variables })  // variables will be passed to login fn above
    ).rejects.toThrow()
})

test('Should fetch user profile (auth)', async () => {
    // if this line is commented, test will use unauthenticated client (above) & test will fail 
    const client = getClient(userOne.jwt)   // client here will be authenticated 
    const { data } = await client.query({ query: getProfile })

    expect(data.me.id).toBe(userOne.user.id)     // verify that id comes back is my id
    expect(data.me.name).toBe(userOne.user.name) 
    expect(data.me.email).toBe(userOne.user.email) 
})