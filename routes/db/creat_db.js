var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('cindy.db');

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS user(user VARCHAR(255),pwd VARCHAR(255))');
  db.run('CREATE TABLE IF NOT EXISTS inventory(name VARCHAR(255),tag VARCHAR(255))');
});

db.close();