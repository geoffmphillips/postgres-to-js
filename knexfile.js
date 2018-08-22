module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'test_db',
      password: 'development',
      user: 'development',
      port: '5432',
      ssl: 'true'
    }
  }

};
