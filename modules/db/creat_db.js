var db = require('./db');
db.connect();
db.userSetup();
db.itemSetup();
db.chapterSetup();
db.blueprintSetup();
db.disconnect();