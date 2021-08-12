const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _und = require('underscore');
const path = require('path');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "appwrk"
});

app.use(express.urlencoded({extended :true}))
app.use(express.json());



var port = process.env.PORT || 8080;
var router = express.Router();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

router.post('/inserttransaction', (req,res) => {
    var bal=0;
    var newbal;

    const des=req.body.description;
    const amnt=req.body.amount;
    const type=req.body.type;

    function setvalue(gdata){
        bal = gdata
        //console.log(bal)
        if(type==="1"){
            // console.log(result);
            newbal=parseFloat(bal)+parseFloat(amnt)
            console.log(newbal);
    
        }else{
            newbal=parseFloat(bal)-amnt
        }
        insertData(newbal)
        

    }

    function insertData(newbalance){
        con.query("insert into transactions(description,amount,type,balance) values (?,?,?,?)",[des,amnt,type,newbalance],  (err, result, fields) => {
            if (err) throw err;
            let message={status:100,msz:"Save Successfully"}
            res.json(message);
        });
    }
    
    con.query("SELECT balance FROM transactions order by id desc limit 1",  (err, balceresult) => {
        if (err) throw err;
        
        bal=balceresult[0].balance
        //console.log(bal);
        setvalue(bal)
        
    });

    
   
    
    
    
    
});

router.get('/getalltransaction', (req,res) => {
    con.query("SELECT * FROM transactions order by id desc",  (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    });
    
});

app.use('/api',router);
app.listen(port);


