// Set up MySQL connection.
var mysql = require("mysql");

var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.send.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "lgg2gx1ha7yp2w0k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "l4n74qw6ehr8f8zw",
    password: "e3agnebpfd4a8jva",
    database: "qurps1kmg9a1dnlp"
  })
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;