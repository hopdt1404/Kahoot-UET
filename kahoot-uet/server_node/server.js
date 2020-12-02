var server = require('http').createServer(function(req,res){

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' || req.method === 'GET' ) {
        res.writeHead(200);
        res.end();
        return;
            }

});
var io = require('socket.io')(server, {
	cors: {
	  origin: '*',
	}
});

console.log('Connected to port 6001')
io.on('error',function(socket){
	console.log('error')
})
io.on('connection',function(socket){
	//console.log('Co nguoi vua ket noi'+socket.id)
})
var Redis = require('ioredis')
var redis = new Redis(1000)
redis.psubscribe("*",function(error,count){
	//
})
redis.on('pmessage',function(partner,channel,message){
	// console.log(channel)
	// console.log(message)
	//console.log(partner)
	
	message = JSON.parse(message)
	io.emit(channel+":"+message.event, message.data.message)
	console.log(message)
	//console.log('Sent')
})
server.listen(6001)