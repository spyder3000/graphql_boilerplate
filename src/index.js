import '@babel/polyfill/noConflict'
import server from './server'

// process.env.PORT will exist when this runs on heroku (defined by heroku)
server.start({ port: process.env.PORT || 4000 }, () => {
    console.log('The server is up'); 
})