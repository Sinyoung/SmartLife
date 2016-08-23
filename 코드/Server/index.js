
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var https = require('https');
var router = express.Router();
var path = __dirname + '/views/';
var bodyParser = require('body-parser');
var cookieParser= require('cookie-parser');
var session = require('express-session');
var mysql = require('mysql');

app.use(bodyParser());
app.use(cookieParser());

/***********************
	global variables
 ***********************/
var PORT=8080;
var userdata="";
var istrue = false;
var memory="";
var userId="";
/***********************
	router & app
 ***********************/


app.get("/",function(req,res){
        res.sendFile(path + "index.html");
            
            
/***********************
	DataBase
 ***********************/
            var connection = mysql.createConnection({
                                                    host    :'localhost', //db ip address
                                                    user : 'root', //db id
                                                    password : '1234', //db password
                                                    database:'user' //db schema name
                                                    });
            
        
            //var select_id_query = "SELECT * FROM users;"
            
            var memoryUsage = "SELECT * FROM processinfo;"

            //var select_id_query ="SELECT * FROM users WHERE id = '"+id+"';";
            
            
            
            connection.connect(function(err) {
                               if (err) {
                                console.error('mysql connection error');
                                console.error(err);
                               throw err;
                               }else{
                               console.log("연결에 성공하였습니다.");
                               }
                               });

           
        
            connection.query(memoryUsage, function(err, results, fields){
                             console.log("1");
                             if(!err){
                        
                             console.log("2");
                             
                                for (var i in results){
                             console.log("3");
                                memory += results[i].ProcessName+":"+results[i].UserTime+":"+results[i].KernelTime+"\n";
                             
                                    }
                             
                               console.log(memory);
                             
                             }
                });

            
            
            
            
        });

/***********************
	server & socket
 ***********************/
http.listen(PORT, function(){
            console.log('Http is listening on *:'+PORT);
            });


io.sockets.on('connection', function(socket){
              
              
              socket.emit('processData',memory );
              
              
    });
