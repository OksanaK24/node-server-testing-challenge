const express = require("express")
const countriesModel = require("./countries-model")

const router = express.Router()

router.get("/countries", async (req, res, next) => {
    try {
      const countries = await countriesModel.find()
      res.status(200).json(countries)
    } catch (err) {
      next(err)
    }
})
  
router.post("/countries", async (req, res, next) => {
    try {
        const country = await countriesModel.insert(req.body)
        res.status(201).json(country)
    } catch (err) {
        next(err)
    }
})

router.delete("/countries/:id", async (req, res, next) => {
    try {
      const { id } = req.params
      const deleted = await countriesModel.remove(id)
  
      if (deleted) {
        res.status(204)
      } else {
        res.status(404).json({
          message: "Could not find user with given ID",
        })
      }
    } catch(err) {
      next(err)
    }
})

module.exports = router 