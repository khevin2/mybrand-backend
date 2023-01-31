import createServer from "./utils/server.js"

const app = createServer()


const PORT = process.env.PORT || 6001
app.listen(PORT, () => console.log(`App running on port ${PORT}`))


