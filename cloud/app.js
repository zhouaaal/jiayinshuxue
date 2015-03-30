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
	var query = new AV.Query(vote);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('index',{ votename: votename, votenum: votenum, votetotal: votetotal, votes: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

function renderQuery(res,votename,votenum,votetotal){
	var query = new AV.Query(vote);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('query',{ votename: votename,votenum:votenum, votetotal:votetotal,votes: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

function renderSuccess(res,votename,votenum,votetotal){
	var query = new AV.Query(vote);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('success',{ votename: votename,votenum:votenum, votetotal:votetotal,votes: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

app.get('/query',function(req,res){
	var name=req.query.votename;
	var phone=req.query.votenum;
	var weixin=req.query.votetotal;
	renderQuery(res,votename,votenum,votetotal);
});

app.get('/', function(req, res){
	var name = 'AVOS Cloud';
	
	renderIndex(res, votename);
});

app.get('/vote',function(req,res){
			
});

app.post('/',function(req, res){
	var votename = req.body.name;
	var votenum=req.body.votenum;
	var votetotal=req.body.votetotal;
	var studyStatus=req.body.study;
	var license=req.body.license;
	var haveCar=req.body.haveCar;
	var fulltime=req.body.fulltime;
	if(name && name.trim() !=''){
		//Save visitor
		var vote = new vote();
		vote.set('votename', votename);
		vote.set('votenum', votenum);
		vote.set('votetotal', votetotal);
		
		vote.save(null, {
			success: function(gameScore) {
				renderSuccess(res,votename,votenum,votetotal);
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
