const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

var mysql=require('mysql');
var con=mysql.createConnection({
    host:"localhost",
    user:"sqluser",
    password:"password",
    database:"nodejs",
    multipleStatements:true
});

readline.question(`Write your query here \n`, name => {
    con.connect(function(err){
        if(err) throw err;
        var sqlQuery=name;
        con.query(sqlQuery,function(err,result) {
            if(err) throw err;
            console.log(result.affectedRows+" rows affected");
            console.log(result);
        });
    });
  readline.close()
})

