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

const name = process.argv[2];

function printPersons(searchName, results) {
  console.log("Searching ... ");
  console.log("Found " + results.length + " person(s) by the name " + "'" + searchName + "':");
  results.forEach((result, index) => {
    console.log("- " + (index + 1) + " " + result.first_name + " " + result.last_name + ", born " + formatDate(result.birthdate));
  });
}

function formatDate(date) {
  let output = "";
  let dateString = String(date);

  let day = dateString.slice(8,10);
  let month = addZeroPad(date.getMonth() + 1);
  let year = dateString.slice(11,15);

  output = year + "-" + month + "-" + day;

  return output;
}

function addZeroPad(num) {
  let output = String(num);

  if (output.length === 1) {
    output = "0" + output;
  }

  return output;
}

knex.select('first_name', 'last_name', 'birthdate')
  .from('famous_people')
  .where({ first_name: name })
  .orWhere({ last_name: name })
  .asCallback((err, rows) => {
    if (err) {
      console.log(err);
    } else {
      printPersons(name, rows);
    }
    knex.destroy();
  });
