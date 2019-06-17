module.exports = {
  client: 'mysql',
  connection: {
    // host : '127.0.0.1',
    user: 'root', // user : 'your_database_user'
    password: 'administrador', // password : 'your_database_password'
    database: 'senior' // database : 'myapp_test'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
