// important!!!!!!!!!!!!!!!!
//demo is the order of the pages 
//write your own logic here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('cindy.db');

exports.findNext = function(user_id,progress,res){
	var story = 0;
	for(var i in progress){
		story = Math.max(story,parseInt(i));
	}
	
	console.log(story);
	
	var page = 0;
	
	for(var i in progress[String(story)]){
		page = Math.max(page,parseInt(i));
	}
	
	sql = 'SELECT page_index FROM page WHERE page_index > ? AND story_id = ? LIMIT 1';
	db.all(sql,[page,story],function(err,row1){
		if(err){
			console.log(err);
		}else{
			//console.log(row1);
			//console.log(page);
			if(row1.length>0){
				sql1 = 'UPDATE story_progress SET page_index = ? WHERE user_id =?';
				db.run(sql1,[row1[0].page_index,user_id],function(err){
					if(err){
						console.log(err);
					}else{
						res.redirect('/'+user_id);
					}
				});
			}else{
				sql2 = 'SELECT story_id, page_index FROM page WHERE story_id > ? ORDER BY story_id, page_index ASC LIMIT 1';
				db.all(sql2,story,function(err,row2){
					if(row2.length>0){
						
						sql3 = 'UPDATE story_progress SET story_id = ?, page_index = ? WHERE user_id =?';
						db.run(sql3,[row2[0].story_id,row2[0].page_index,user_id],function(err){
							if(err){
								console.log(err);
							}else{
								res.redirect('/'+user_id);
							}
						});
					}else{
						res.send('No more story!');
					}
				});
			}
		}
	});
}