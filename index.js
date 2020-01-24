const express = require("express")

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  })
})

if (!module.parent){
  server.listen(port, () => {
    console.log(`\n=> Server up at http://localhost:${port}\n`)
  })
}

module.exports = server