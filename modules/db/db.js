var sqlite3 = require('sqlite3').verbose();
var db = undefined;


/*****
basic functions start
*****/

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

/*****
basic functions end
*****/


/*****
user table start
*****/

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
			}else{
				//new user
				sql = 'INSERT INTO user(username, email, password) VALUES (?, ?, ?)';
				db.serialize(function() {
					runSql(sql,data);
					//add to session
					sql = 'SELECT rowid,username FROM user WHERE username = ?';
					db.all(sql,data[0],function(err,row){
						req.session.username = row[0].username;
						req.session.userid = row[0].rowid;
						sql = 'INSERT INTO story_progress(user_id, story_id, page_index, progress) VALUES (?, ?, ?, ?)';
						db.run(sql,[row[0].rowid,1,1,''],function(err){
			
							res.redirect('/'+row[0].rowid);
						});
		
					});
				});
				
				
			}
		}
	});	
	
	
	
	
	
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
	sql = 'SELECT rowid,password FROM user WHERE username = ?';
	db.all(sql,username,function(err,row){
		if(err){
			console.log(err);
		}else{
			if(row.length==0){
				res.redirect('/register');
			}else{
				if(row[0].password == pwd){
					//add to session
					req.session.userid = row[0].rowid;
					req.session.username = username;
					res.redirect('/'+row[0].rowid);
				
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

/*****
user table end
*****/


/*****
item table start
*****/
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
/*****
item table end
*****/

/*****
item_blueprint table start
*****/
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
/*****
item_blueprint table end
*****/



/*****
story_progress table start
*****/
exports.progressSetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS story_progress(user_id INT, story_id INT, page_index INT, progress TEXT)';
	create(sql);
}

exports.addProgress = function(data){
	sql = 'INSERT INTO story_progress(user_id, story_id, page_index, progress) VALUES (?, ?, ?, ?)';
	runSql(sql,data);
}

exports.updateProgress = function(data){
	sql = 'UPDATE story_progress SET story_id = ?, page_index = ? ,progress = ? WHERE user_id =?';
	runSql(sql,data);
}

exports.deleteProgress = function(data){
	sql = 'DELETE FROM story_progress WHERE rowid = ?';
	runSql(sql,data);
}

exports.lookupProgress = function(data,res){
	sql = 'SELECT rowid FROM story_progress WHERE user_id =?';
	db.all(sql,data,function(err,row){
		if(err){
			console.log(err);
		}else{
			if(row.length==0){
				res.redirect('/');
			}else{
				res.redirect('/'+data);
			}
		}
	});
}

exports.showProgress = function(data,res,func){
	var sql;
	if(func=='game'){
		sql = 'SELECT story_progress.user_id, story_progress.story_id, story_progress.page_index, story.name, page.text FROM story_progress '+
		'INNER JOIN story ON story_progress.story_id = story.rowid '+
		'INNER JOIN page ON story_progress.story_id = page.story_id AND story_progress.page_index = page.page_index '+
		'WHERE story_progress.user_id = ?';
		db.all(sql,data,function(err,row){
			if(err){
				console.log(err);
			}else{
				
				if(row.length==0)res.send('No more story!');
				else res.render('story',{title:'story',data:row});
				
			}
		});
	}else if(func=='management'){
		sql = 'SELECT rowid,* FROM story_progress';
		db.all(sql,function(err,row){
			if(err){
				console.log(err);
			}else{
				
				res.render('management/progress',{title:'Progress management',data:row});
				
			}
		});
	}
}





var story = require('../story/story');




exports.nextProgress = function(data,res){
	sql = 'SELECT progress FROM story_progress WHERE user_id =?';
	db.all(sql,data[0],function(err,row){
		var progress = {};
		//console.log(row[0].progress);
		if(row[0].progress.length!=0){ 
			progress = JSON.parse(row[0].progress);
			if(progress[String(data[1])] == null){
				progress[String(data[1])] = {};
				progress[String(data[1])][String(data[2])] = data[3];
			
			}else{
				progress[String(data[1])][String(data[2])] = data[3];
			}
		}
		else{
			progress[String(data[1])] = {};
			progress[String(data[1])][String(data[2])] = data[3];
		}
		
		
		strProgress = JSON.stringify(progress);
		sql1 = 'UPDATE story_progress SET progress = ? WHERE user_id =?';
		db.run(sql1,[strProgress,data[0]],function(err){
			if(err){
				console.log(err);
			}else{
				story.findNext(data[0],progress,res);
			}
		});
		
		
		
		
		
	});
}

/*****
story_progress table end
*****/


/*****
story table start
*****/

exports.storySetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS story(name TEXT)';
	create(sql);
}

exports.addStory = function(data){
	sql = 'INSERT INTO story(name) VALUES (?)';
	runSql(sql,data);
}

exports.updateStory = function(data){
	sql = 'UPDATE story SET name = ? WHERE rowid =?';;
	runSql(sql,data);
}

exports.deleteStory = function(data){
	sql = 'DELETE FROM story WHERE rowid = ?';
	runSql(sql,data);
}

exports.showStory = function(res,func){
	sql = 'SELECT *,rowid FROM story';
	db.all(sql,function(err,row){
		if(func=='management')res.render('management/story',{title:'Story Management',data:row});
	});
}

exports.lookupStory = function(data,res,func){
	sql = 'SELECT *,rowid FROM story WHERE rowid = ?';
	db.all(sql,data,function(err,row){
		if(func=='management')res.render('management/storyupdate',{title:'Story Update',data:row});
	});
}
/*****
story table end
*****/

/*****
page table start
*****/
exports.pageSetup = function(){
	sql = 'CREATE TABLE IF NOT EXISTS page(page_index INT, story_id INT, text TEXT)';
	create(sql);
}

exports.addPage = function(data){
	sql = 'INSERT INTO page(page_index, story_id, text) VALUES (?,?,?)';
	runSql(sql,data);
}

exports.updatePage = function(data){
	sql = 'UPDATE page SET page_index = ?, story_id = ?, text = ? WHERE rowid =?';;
	runSql(sql,data);
}

exports.deletePage = function(data){
	sql = 'DELETE FROM page WHERE rowid = ?';
	runSql(sql,data);
}

exports.showPage = function(res,data,func){
	if(func=='all'){
		sql = 'SELECT *,rowid FROM page';
		db.all(sql,function(err,row){
			res.render('management/page',{title:'Page Management',storyid:0,data:row});
		});
	}else if(func=='storyid'){
		sql = 'SELECT *,rowid FROM page WHERE story_id = ?';
		db.all(sql,data,function(err,row){
			res.render('management/page',{title:'Page Management',storyid:data,data:row});
		});
	}
}

exports.lookupPage = function(res,data,func){
	if(func=='management'){
		sql = 'SELECT *,rowid FROM page WHERE rowid = ?';
		db.all(sql,data,function(err,row){
			res.render('management/pageupdate',{title:'Page Update',data:row});
		});
	}
}

/*****
page table end
*****/