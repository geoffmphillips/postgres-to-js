const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'development',
    password : 'development',
    database : 'test_db',
    port: '5432',
    ssl: 'true'
  }
});

const data = process.argv.slice(2,5);

console.log(data);

knex.insert({first_name: data[0], last_name: data[1], birthdate: data[2]})
  .into('famous_people')
  .asCallback((err, rows) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Success");
    }
    knex.destroy();
  });
