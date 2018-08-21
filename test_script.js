const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function getPersons(personName, cb) {
  client.query("SELECT CONCAT(first_name || ' ' || last_name || ', born ' || to_char(birthdate, 'YYYY-MM-DD')) FROM famous_people WHERE first_name = $1 OR last_name = $1", [personName], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } else {
      cb(personName, result.rows);
    }
    client.end((err) => {
      console.log('client has disconnected')
      if (err) {
        console.log('error during disconnection', err.stack)
      }
    });
  });
}

function printPersons(searchName, results) {
  console.log("Searching ... ");
  console.log("Found " + results.length + " person(s) by the name " + "'" + searchName + "':");
  results.forEach((result, index) => {
    console.log("-", index + 1, result.concat);
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  } else {
    getPersons(name, printPersons,);
  }
});
