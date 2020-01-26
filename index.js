const express = require("express")
const countriesRouter = require("./countries/countries-router")


const server = express()
const port = process.env.PORT || 5000

server.use(express.json())
server.use("/api/countries", countriesRouter)

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  })
})

server.use((err, req, res, next) => {  
    res.status(500).json({
      message: "Something went wrong",
    })
})

if (!module.parent){
  server.listen(port, () => {
    console.log(`\n=> Server up at http://localhost:${port}\n`)
  })
}

module.exports = server