import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import postRoute from '../routes/posts.routes.js'
import usersRoute from '../routes/users.routes.js'
import loginRoute from '../routes/auth.routes.js'
import './db_conn.js'



const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My Brand API",
            version: "1.0.0",
            description: "Swagger documentation for my brand api"
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 6001}`
            }
        ],
    },
    apis: ['./routes/*.js']
}
const specs = swaggerJSDoc(options)



export default function createServer() {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/documentation', swaggerUI.serve, swaggerUI.setup(specs))
    app.use('/posts', postRoute)
    app.use('/users', usersRoute)
    app.use('/login', loginRoute)


    return app
}