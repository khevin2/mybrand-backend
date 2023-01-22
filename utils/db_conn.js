
import env from 'dotenv'
env.config({ path: './.env' })


import mongoose from "mongoose";
mongoose.set('strictQuery', false)
const { connect } = mongoose

const conn = connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connected..'))
    .catch((err) => { console.error(err) })

export default conn