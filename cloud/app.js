// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var name = require('cloud/name.js');
var avosExpressHttpsRedirect = require('avos-express-https-redirect');


// App全局配置
//设置模板目录
if(__production)
	app.set('views', 'cloud/views');
else
	app.set('views', 'cloud/dev_views');
app.set('view engine', 'ejs');    // 设置template引擎
app.use(avosExpressHttpsRedirect()); //启用HTTPS
app.use(express.bodyParser());    // 读取请求body的中间件

//使用express路由API服务/hello的http GET请求
app.get('/hello', function(req, res) {
	res.render('hello', { message: 'Congrats, you just set up your app!' });
});

var vote = AV.Object.extend('vote');
function renderIndex(res, name){
	var query = new AV.Query(Vote);
	query.skip(0);
	query.limit(10);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('index',{ name: name, vote: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

function renderQuery(res,name,phone,weixin){
	var query = new AV.Query(Vote);
	query.skip(0);
	query.limit(10);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('query',{votename:name,votenum:num,votetotal:total});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}


function renderSuccess(res,name,phone,weixin){
	var query = new AV.Query(Visitor);
	query.skip(0);
	query.limit(10);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('success',{ name: name,phone:phone, weixin:weixin,visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}



function tpseerwm(ab){

	var votename = req.body.(ab+_01);
	var votenum = req.body.(ab+_02);
	var votetotal = req.body.(ab+_03);
	
	if(name && name.trim() !=''){
		//Save visitor
		var vote = new Vote();
		visitor.set('votename', votename);
		visitor.set('votenum', votenum);
		visitor.set('votetotal', votetotal);
		visitor.save(null, {
			success: function(gameScore) {
				renderSuccess(res,name,phone,weixin);
			},
			error: function(gameScore, error) {
				res.render('500', 500);
			}
		});
	}else{
		res.redirect('/');
	}
	});
}


app.get('/query',function(req,res){
	var name=req.query.name;
	var phone=req.query.phone;
	var weixin=req.query.weixin;
	renderQuery(res,name,phone,weixin);
});

app.get('/', function(req, res){
	var name = req.query.name;
	if(!name)
		name = 'AVOS Cloud';
	renderIndex(res, name);
});

app.get('/vote',function(req,res){
			
});

app.post('/',function(req, res){
	var votename = req.body.name;
	var votenum=req.body.num;
	var votetotal=req.body.total;
	
	if(name && name.trim() !=''){
		//Save visitor
		var vote = new Vote();
		visitor.set('votename', name);
		visitor.set('votenum', num);
		visitor.set('votetotal', total);
		visitor.save(null, {
			success: function(gameScore) {
				renderSuccess(res,name,phone,weixin);
			},
			error: function(gameScore, error) {
				res.render('500', 500);
			}
		});
	}else{
		res.redirect('/');
	}
});

// This line is required to make Express respond to http requests.
app.listen();
