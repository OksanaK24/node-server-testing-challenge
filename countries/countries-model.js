const db = require("../data/config")

function find() {
    const countries = db("countries").select()
	return countries.map((country) => {
        return {...country, visited: country.visited === 0 ? false : true}
    })
}

function findById(id) {
  return db("countries")
    .where({ id })
    .first()
}

async function insert(country) {
  const ids = await db("countries").insert(country)
  return findById(ids[0])
}

async function update(id, changes) {
  await db("countries")
    .where({ id })
    .update(changes)

  return findById(id)
}

function remove(id) {
  return db("countries")
    .where({ id })
    .del()
}

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
}