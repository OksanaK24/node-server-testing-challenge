const express = require("express")
const countriesModel = require("./countries-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
      const countries = await countriesModel.find()
      res.status(200).json(countries)
    } catch (err) {
      next(err)
    }
})
  
router.post("/", async (req, res, next) => {
    try {
        const country = await countriesModel.insert(req.body)
        res.status(201).json(country)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
      const countries = await countriesModel.findById(req.params.id)
      const deleted = await countriesModel.remove(req.params.id)
  
      if (deleted) {
        res.status(204).json({message: `${countries.country} has been deleted`})
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