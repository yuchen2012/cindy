var sqlite3 = require('sqlite3').verbose();
var db = undefined;
/*exports.ALERT = function(){
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}*/

exports.connect = function(){
	db = new sqlite3.Database('cindy.db',function(err){
		if(err){
			console.log('fail:'+err);
		}
	});
}

exports.disconnect = function(){
	db.close();
}

function runSql(sql,data){
	db.run(sql,data,function(err){
		if(err){
			console.log('fail:'+err);
		}
	});	
}




/*
user table
*/

exports.userSetup = function(){
	db.run('CREATE TABLE IF NOT EXISTS user(username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), friends TEXT)');
}

exports.addUser = function(data){
	sql = 'INSERT INTO user(username, email, password) VALUES (?, ?, ?)';
	runSql(sql,data);
}



exports.deleteUserById =function(RecNo){
	sql = 'DELETE FROM user WHERE RecNo = ?';
	runSql(sql,RecNo);
}

exports.updateUser = function(data){
	sql = 'UPDATE user SET username = ?, email = ?, password = ? WHERE RecNo =?';
	runSql(sql,data);
}

exports.loginCheck = function(username,pwd,res){
	sql = 'SELECT password FROM user WHERE username = ?';
	db.all(sql,username,function(err,row){
		if(err){
			console.log(err);
		}else{
			if(row[0].password == pwd) res.redirect('/home');
			else{
				res.redirect('login');
			}
		}
	});
}

exports.usernameCheck = function(username,res){
	
}

/*
item table
*/
exports.itemSetup = function(){
	db.run('CREATE TABLE IF NOT EXISTS item(owner INT, blueprintId INT)');
}

exports.addItem = function(data){
	sql = 'INSERT INTO item(owner, blueprintID) VALUES (?, ?)';
	runSql(sql,data);
}

exports.showItem = function(p,count,res){
	sql = 'SELECT * FROM item';
	db.all(sql,function(err,row){
		if(err){
			console.log(err);
		}else{
			res.render('management/item',{title:'item management', data:row});
			
		}
	});
}


/*
blueprint table
*/
exports.blueprintSetup = function(){
	db.run('CREATE TABLE IF NOT EXISTS blueprint(name VARCHAR(255) description TEXT, logo TEXT)');
}

exports.showBlueprint = function(p,count,res){
	sql = 'SELECT * FROM blueprint';
	db.all(sql,function(err,row){
		if(err){
			console.log(err);
		}else{
			res.render('blueprint',{title:'blueprint management', data:row});
			
		}
	});
}

/*
progress table
*/

/*
chapter table
*/
exports.chapterSetup = function(){
	db.run('CREATE TABLE IF NOT EXISTS chapter(name VARCHAR(255), txt TEXT)');
}

