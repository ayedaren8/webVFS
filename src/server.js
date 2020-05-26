var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');


var server = http.createServer(function (req, res) {
	var staticPath = path.join(process.cwd(), '');
	var pathObj = url.parse(req.url, true);
	pathObj.pathname = decodeURI(pathObj.pathname)
	
	if (pathObj.pathname == '/') { //如果没有后缀，默认他显示是index.html
		pathObj.pathname += 'index.html';
	}
	// 异步读取文件数据
	var filePath = path.join(staticPath, pathObj.pathname);
	if (pathObj.pathname.endsWith("mp4")) { //如果没有后缀，默认他显示是index.html
		res.writeHead(200, {
			'Content-Type': 'video/mp4'
		});
		var rs = fs.createReadStream(filePath);
		rs.pipe(res);
		rs.on('end', function () {
			res.end();
			console.log('end call');
		});
	}

	fs.readFile(filePath,'binary',function(err,fileContent){
		if(err){
			res.writeHead(404,"Not Found");
			res.end('<h1>404 Not Found!</h1>')	
		}else{
			res.writeHead(200,'ok');
			res.write(fileContent,'binary');
			res.end();	
		}
	});
});

server.listen(8080);
console.log('服务器已打开, 如需请在地址栏输入 http://localhost:8080');
console.log('具体使用方法请在工程的使用说明文件查看：');