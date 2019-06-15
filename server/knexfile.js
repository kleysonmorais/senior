module.exports = {
  client: 'mysql',
  connection: {
    // host : '127.0.0.1',
    host: '127.0.0.1',
    // user : 'your_database_user',
    user: 'root',
    // password : 'your_database_password',
    password: 'administrador',
    // database : 'myapp_test'
    database: 'senior'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
