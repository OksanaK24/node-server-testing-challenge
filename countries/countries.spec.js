const db = require("../data/config")
const supertest = require("supertest")
const countriesModel = require("./countries-model")
const server = require("../index")

beforeEach(async () => {
    await db.seed.run()
})

describe("testing countries database", () =>{
    test("all countries", async () => {
        const res = await countriesModel.find()
        expect(res).toHaveLength(8)
    })

    test("findById", async() => {
        const res = await countriesModel.findById(7)
        expect(res.country).toMatch(/japan/i)
    })

    test("findById - visited", async() => {
        const res = await countriesModel.findById(3)
        expect(res.visited).toBe(1)
    })

    test("insert", async () => {
        await countriesModel.insert({ country: "Germany", visited: 1})
        const countries = await db("countries").select()
        expect(countries.length).toBeGreaterThan(8)
    })

    test("update", async() => {
        await countriesModel.update(8, { country: "France", visited:1})
        const country = await countriesModel.findById(8)
        expect(country.country).toMatch(/france/i)
        expect(country.visited).toBe(1)
    })

    test("remove", async() =>{
        await countriesModel.remove(3)
        const countries = await countriesModel.find()
        expect(countries).toHaveLength(7)
    })

    test("get countries list", async () => {
        const res = await supertest(server).get("/api/countries")
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBe(8)
        expect(res.body[0].id).toBe(1)
        expect(res.body[0].country).toMatch(/poland/i)
    })
    
    test("create country", async () => {
        const res = await supertest(server)
            .post("/api/countries")
            .send({ country: "Canada", visited: 0 })
        expect(res.status).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body).toEqual({ id: 9, country: "Canada", visited: 0 })
    })

    test("delete country", async () => {
        const res = await supertest(server)
            .delete("/api/countries/8")
        expect(res.status).toBe(204)
    })
})