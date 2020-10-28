// set  to true to test without having to login
let loggedIn= false;

var mysql = require('mysql');
var bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(bodyParser.json({
    limit: "10mb"
    
}));
app.use(bodyParser.urlencoded({
    limit: "10mb",
    extended: false
}));


// server on port:4000.
app.listen( 4000, function(){console.log("It is working");})
//Anything placed in this folder is accessible by ANYONE:
app.use(express.static('text2server'));

 // SQL DB Connection BoilerPlate:
 var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'admin',
	database : 'nodelogin'
});
// default route when you open localhost:4000:
app.get('/', (req, res, next) => {
    res.sendFile( __dirname + "/public/" + "index.html");
  
});

// route to registration page:
app.get('/reg', (req, res, next) => {
    res.sendFile( __dirname + "/text2server/" + "/reg.html");
  
});


// this will add your details to the database:
app.post('/regs', function (req, res) {
 
  let username=(req.body.email);
  let password=(req.body.psw);
   
connection.query("INSERT INTO accounts (username,password,email) VALUES (?,?,?)", [username,password,username]);

console.log("Inserting credentials into database");
res.sendFile( __dirname + "/text2server/" + "index.html");  
    alert("Now login with your new credentials!")//No email validation
                                                 //4testing purposes.
  // Testing:
 //        res.send(req.body);
//         console.log(req.body);
});


// the code below--> 
//Will check your credentials in the database;
//And if valid, send you back to the home page.
 app.post('/login', function (req, res) {
          let username1=(req.body.uname);
          let password1=(req.body.psw);
// This code query below is vunerable to SQL inejction.
        connection.query("SELECT * FROM accounts WHERE username = ? AND password = ?", [username1, password1], 
        function (err,results,field) 
        {   
             
           // should change to a truthy statement:
           if(results[0]!=undefined){
                 if( (results[0].username=username1) && (results[0].password=password1) ){
           
                    res.sendFile( __dirname + "/home.html");      
                                                                                             
                 loggedIn= true;     
            }
        }else{
               res.send("Incorrect Credentials you may try once more");
              }
      
         });
                                    
                         });

 
// route to login page:
app.get('/login', (req, res, next) => {
    res.sendFile( __dirname +"/text2server"+ "/login.html");   
 
      
    });


  // connecting to a different database:
    var customers = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database : 'customers'
    });
    
   
    
//The code below-->
//will only send the customers page if: 
//loggedIn is set to true: 
                                    
   app.get('/table.html', (req, res, next) => {
    if(loggedIn){
        res.sendFile( __dirname + "/table.html");
   
        }else{
            res.send("Please login to view");

        }



});
//The code below--> 
// this inserts the data into the customer page:
    app.post('/pop', function (req, res) {
        
        console.log(req.body.lname);
        console.log(req.body.email);
        
        
        
        let fname=  req.body.fname;
           let lname = req.body.lname;
           let email = req.body.email;
           let phone = 5555;
           let aptdate= 20200331;
       
        customers.query("INSERT INTO customers (fname,lname,email,phone,aptdate) VALUES (?,?,?,?,?)", [fname,lname,email,phone,aptdate])
            
           console.log("It is inserting customer information");
           
           
        res.send(lname+'<br/>'+ fname+'<br/>'+ email);
           
    

    });

            // sends all data from the DB to the customer as RAW JSON can be formatted easily.            
    app.post('/display', function (req, res) {

        customers.query("SELECT * FROM customers", function(err, results, fields){
            res.send(results);
            let data=results;
            })
    
                    app.get('/display', (req,res)=>{

                        res.json({test:123});
                    })
                
    
    
    
    });


//The code below--> 
// Searches DB with all results that contain firstname of entered: 
    app.post('/find', function (request, res) {
        let usernameF=(request.body.fname);
        customers.query("SELECT * FROM customers WHERE fname=? ",[usernameF],function(err, results, fields){
        res.send(results);
        })
    });


    

 