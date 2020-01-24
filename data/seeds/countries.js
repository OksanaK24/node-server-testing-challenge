exports.seed = async (knex) => {
  await knex("countries").truncate()

  await knex("countries").insert([
    { country: "Poland", visited: true },
    { country: "Egypt", visited: true },
    { country: "Monaco", visited: true },
    { country: "Spain", visited: true },
    { country: "Turkey", visited: true },
    { country: "Cyprus", visited: false },
    { country: "Japan", visited: false },
    { country: "New Zeland", visited: false },
  ])
}