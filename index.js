import createServer from "./utils/server.js"
import './utils/db_conn.js'

const app = createServer()


const PORT = process.env.PORT || 6001
app.listen(PORT, () => console.log(`App running on port ${PORT}`))


