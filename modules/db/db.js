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

function create(sql){
	db.run(sql,function(err){
		if(err){
			console.log('fail:'+err);
		}
		
	});
}



/*
user table
*/

exports.userSetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS user(username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), friends TEXT)';
	create(sql);
}

exports.addUser = function(data,res,req){
	//username check
	sql = 'SELECT password FROM user WHERE username = ?';
	db.all(sql,data[0],function(err,row){
		if(err){
			console.log(err);
		}else{
			if(row.length>0){				
				res.redirect('/register');
			}
		}
	});	
	
	sql = 'INSERT INTO user(username, email, password) VALUES (?, ?, ?)';
	runSql(sql,data);
	//add to session
	req.session.username = data[0];
	res.redirect('/home');
}

exports.deleteUser =function(rowid){
	sql = 'DELETE FROM user WHERE rowid = ?';
	runSql(sql,rowid);
}

exports.updateUser = function(data){
	sql = 'UPDATE user SET username = ?, email = ?, password = ? WHERE rowid =?';
	runSql(sql,data);
}

exports.loginCheck = function(username,pwd,res,req){
	sql = 'SELECT password FROM user WHERE username = ?';
	db.all(sql,username,function(err,row){
		if(err){
			console.log(err);
		}else{
			if(row.length==0){
				res.redirect('/register');
			}else{
				if(row[0].password == pwd){
					//add to session
					req.session.username = username;
					res.redirect('/home');
				
				}
				else{
					res.redirect('/login');
				}
			}
		}
	});
}

//username check for ajax
exports.usernameCheck = function(username,res){
	sql = 'SELECT password FROM user WHERE username = ?';
	db.all(sql,username,function(err,row){
		if(err){
			console.log(err);
		}else{
			if(row.length>0)res.send(true);
			else res.send(false);
		}
	});
}


exports.showUser = function(p,count,res,func){
	sql = 'SELECT *,rowid FROM user';
	db.all(sql,function(err,row){
		if(err){
			console.log(err);
		}else{
			if(func=='management')
				res.render('management/user',{title:'user management', data:row});
			if(func=='show')
				res.render('management/showuser',{title:'show user',data:row});
			
		}
	});
}



/*
item table
*/
exports.itemSetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS item(user_id INT, blueprint_id INT)';
	create(sql);
}

exports.addItem = function(data){
	sql = 'INSERT INTO item(user_id, blueprint_id) VALUES (?, ?)';
	runSql(sql,data);
}

exports.deleteItem = function(rowid){
	sql = 'DELETE FROM item WHERE rowid = ?';
	runSql(sql,rowid);
}

exports.updateItem = function(data){
	sql = 'UPDATE item SET user_id = ?, blueprint_id = ? WHERE rowid =?';
	runSql(sql,data);
}

exports.assignItem = function(data){
	sql = 'UPDATE item SET user_id = ? WHERE rowid =?';
	runSql(sql,data);
}

exports.showItem = function(p,count,res){
	sql = 'SELECT *,rowid FROM item';
	db.all(sql,function(err,row){
		if(err){
			console.log(err);
		}else{
			//console.log(row);
			res.render('management/item',{title:'item management', data:row});
			
		}
	});
}

exports.lookupItem = function(rowid,res,func){
	sql = 'SELECT item.rowid,item.*,item_blueprint.* FROM item INNER JOIN item_blueprint ON item.blueprint_id = item_blueprint.rowid AND item.rowid = ?';
	db.all(sql,rowid,function(err,row){
		if(err){
			console.log(err);
		}else{
			//console.log(row);
			res.render('management/itemassign',{title:'assign user', data:row});
			
		}
	});
}


/*
item_blueprint table
*/
exports.blueprintSetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS item_blueprint(name VARCHAR(255), description TEXT, logo TEXT)';
	create(sql);
}


exports.addBlueprint = function(data){
	sql = 'INSERT INTO item_blueprint(name, description, logo) VALUES (?, ?, ?)';
	runSql(sql,data);	
}

exports.updateBlueprint = function(data){
	console.log(data);
	sql = 'UPDATE item_blueprint SET name = ?, description = ?, logo = ? WHERE rowid =?';
	runSql(sql,data);	
}

exports.deleteBlueprint = function(data,res){
	sql = 'DELETE FROM item_blueprint WHERE rowid = ?';
	runSql(sql,data);	
}

exports.lookupBlueprint = function(rowid,res,func){
	
	if(func=='management'){
		sql = 'select *,rowid FROM item_blueprint WHERE rowid = ?';
		db.all(sql,rowid,function(err,row){
			if(err){
				console.log(err);
			}else{
				res.render('management/blueprintupdate',{title:'blueprint update',data:row});
			}
		});
		
	}
}

exports.showBlueprint = function(p,count,res,func){
	sql = 'SELECT *, rowid FROM item_blueprint';
	db.all(sql,function(err,row){
		if(err){
			console.log(err);
		}else{
			if(func=='management')
				res.render('management/blueprint',{title:'blueprint management',data:row});
			if(func=='show')
				res.render('management/showblueprint',{title:'blueprint show',data:row});
		}
	});
}

/*
story_progress table
*/
exports.progressSetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS story_progress(user_id INT, story_id INT, page_index INT)';
	create(sql);
}


/*
story table
*/
exports.storySetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS story(name TEXT)';
	create(sql);
}

/*
page table
*/
exports.pageSetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS page(page_index INT, story_id INT, text TEXT)';
	create(sql);
}

/*
map table
*/
exports.mapSetup = function() {
    var deleteMapSql = 'DROP TABLE IF EXISTS map;';
    var createMapSql = 'CREATE TABLE map(id INTEGER PRIMARY KEY, name VARCHAR(255) NOT NULL, description VARCHAR(255));';
    var deletePointSql = 'DROP TABLE IF EXISTS map_point;';
    var createPointSql = 'CREATE TABLE map_point(id INTEGER PRIMARY KEY, map_id INTEGER NOT NULL, x INTEGER NOT NULL, y INTEGER NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255), FOREIGN KEY(map_id) REFERENCES map(id));';
    runSql(deleteMapSql);
    runSql(createMapSql);
    runSql(deletePointSql);
    runSql(createPointSql);
};
