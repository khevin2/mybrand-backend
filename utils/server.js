import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import cors from 'cors';
import postRoute from '../routes/posts.routes.js'
import usersRoute from '../routes/users.routes.js'
import loginRoute from '../routes/auth.routes.js'
import messagesRoute from "../routes/messages.routes.js"
import skillsRoute from "../routes/skills.routes.js"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerJSON = require('./../swagger.json')


const specs = swaggerJSDoc(swaggerJSON)



export default function createServer() {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({ extended: true }))
    app.use('/documentation', swaggerUI.serve, swaggerUI.setup(specs))
    app.use('/posts', postRoute)
    app.use('/users', usersRoute)
    app.use('/skills', skillsRoute)
    app.use('/messages', messagesRoute)
    app.use('/login', loginRoute)


    return app
}