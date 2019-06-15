const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config]) // Create Scheme in Data Base
module.exports = knex