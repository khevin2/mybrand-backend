import express from 'express'
import postRoute from './routes/posts.routes.js'
import usersRoute from './routes/users.routes.js'
import './utils/db_conn.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 6001
app.listen(PORT, () => console.log(`App running on port ${PORT}`))


app.use('/posts', postRoute)
app.use('/users', usersRoute)

