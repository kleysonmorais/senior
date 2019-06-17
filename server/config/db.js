const config = require('../knexfile.js')
const knex = require('knex')(config)
const setupPaginator = require('knex-paginator')
setupPaginator(knex)
knex.migrate.latest([config]) // Create Scheme in Data Base
module.exports = knex