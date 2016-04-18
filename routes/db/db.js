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
User table
*/

exports.setup = function(){
	db.run('CREATE TABLE IF NOT EXISTS user(user VARCHAR(255),pwd VARCHAR(255))');
}

exports.addUser = function(data){
	sql = "INSERT INTO user (user, pwd) VALUES (?, ?)";
	runSql(sql,data);
}



exports.deleteUserById =function(RecNo){
	sql = "DELETOE FROM user WHERE RecNo = ?";
	runSql(sql,RecNo);
}

exports.updateUser = function(data){
	sql = "UPDATE user SET user = ?, pwd = ? WHERE RecNo =?";
	runSql(sql,data);
}

exports.loginCheck = function(username,pwd,res){
	sql = "SELECT * FROM user WHERE user = ?";
	db.all(sql,username,function(err,row){
		if(err){
			console.log(err);
		}else{
			if(row[0].pwd == pwd) res.redirect('/home');
			else{
				res.redirect('login');
			}
		}
	});
}

