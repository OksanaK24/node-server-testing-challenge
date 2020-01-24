const db = require("./data/config")

const supertest = require("supertest")
const server = require("./index")

beforeEach(async () => {
    await db.seed.run()
})

test("welcome route", async () => {
    const res = await supertest(server).get("/")
    expect(res.status).toBe(200)

    expect(res.type).toBe("application/json")

    expect(res.body.message).toMatch(/welcome/i)
})