import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import cors from 'cors';
import postRoute from '../routes/posts.routes.js'
import usersRoute from '../routes/users.routes.js'
import loginRoute from '../routes/auth.routes.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerJSON = require('./../swagger.json')


// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "My Brand API",
//             version: "1.0.0",
//             description: "Swagger documentation for my brand api"
//         },
//         servers: [
//             {
//                 url: `http://localhost:${process.env.PORT || 6001}`
//             }
//         ],
//     },
//     apis: ['./routes/*.js']
// }
const specs = swaggerJSDoc(swaggerJSON)



export default function createServer() {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({ extended: true }))
    app.use('/documentation', swaggerUI.serve, swaggerUI.setup(specs))
    app.use('/posts', postRoute)
    app.use('/users', usersRoute)
    app.use('/login', loginRoute)


    return app
}