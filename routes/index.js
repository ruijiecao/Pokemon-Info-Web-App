// import RowDataPacket from "mysql";
var path = require('path');
var config = require('../db-config.js');

/* ----- Connects to your oracledb database ----- */

var oracledb = require('oracledb');

var express = require('express');
var router = express.Router();
module.exports = router;

async function run(){
let connection
  try{
    connection = await oracledb.getConnection({
      user: "admin",
      password: "cis550pokemon",
      connectString:"cis550pokemon.ca4mce6zf03f.us-east-1.rds.amazonaws.com:1521/pokemon"
      })
      console.log('success')
      var result = await connection.execute(
        `SELECT * FROM EV WHERE ROWNUM<=5`
      )
      console.log(result.rows)
      
  }catch(err){
    console.error(err)
  }finally{
    if(connection){
      try{
       // await connection.close()
      }catch(err){
        console.error(err)
      }
    }
  }
}
run()


/* ------------------------------------------- */
/* ----- Routers to handle FILE requests ----- */
/* ------------------------------------------- */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
});

/* ----- Q2 (Recommendations) ----- */
router.get('/recommendations', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'recommendations.html'));
});

/* ----- Q3 (Best Of Decades) ----- */
router.get('/bestof', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'bestof.html'));
});

/* ----- Bonus (Posters) ----- */
router.get('/posters', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'posters.html'));
});

router.get('/reference', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/nest', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'nest.html'));
});

router.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});


/* ------------------------------------------------ */
/* ----- Routers to handle data requests ----- */
/* ------------------------------------------------ */

/* ----- Q1 (Dashboard) ----- */

router.get('/genres', function(req, res){
  var query = `
    SELECT * 
    FROM POKEMONNAMETYPE
    WHERE NAME = 'bulbasaur'
    `;
  connection.execute(query, function(err, rows, fields){
    if (err) console.log(err);
    else{
      console.log(rows);
      res.json(rows);
    }
  });
});

router.get('/movies/:genre', function(req, res){
  var inputGenre = req.params.genre;
  var query = `
    SELECT * 
    FROM POKEMONNAMETYPE
    WHERE NAME = 'bulbasaur'
    `;
  connection.execute(query, function(err, rows, fields){
    if (err) console.log(err);
    else{
      console.log(rows);
      res.json(rows);
    }
  });
});

/* ----- Q2 (Recommendations) ----- */
router.get('/movie/:movieName', function(req, res){
  var submitMovie = req.params.movieName;
  console.log("submitMovie");
  console.log(submitMovie);
  // var query = `SELECT POKEDEXNUMBER,POKEMONNAME, HEIGHT, WEIGHT FROM EV WHERE POKEMONNAME= '${submitMovie}'`;
  if (isNaN(submitMovie)){
    var query =  `WITH Temp1 AS (
    SELECT Count(*) AS num
    FROM PokemonGo pg
    JOIN EV e
    ON pg.pokemonID = e.pokedexnumber
    WHERE pg.urban = 'true' AND LOWER(e.pokemonname) = '${submitMovie}'
    ),
    Temp2 AS (
    SELECT Count(*) AS num
    FROM PokemonGo pg
    JOIN EV e
    ON pg.pokemonID = e.pokedexnumber
    WHERE LOWER(e.pokemonname) = '${submitMovie}'
    ),
    Temp3 AS (SELECT CASE WHEN t2.num <> 0 THEN t1.num/t2.num ELSE NULL END AS SpawnRateUrban
    FROM Temp1 t1, Temp2 t2
    )
    SELECT b.POKEDEXNUMBER, b.pokemonname, p.type1, p.type2, a.abilities, ROUND(b.height, 2) AS height, ROUND(b.weight, 2) AS weight, ROUND(b.SpawnRateUrban, 2) AS SpawnRateUrban
    FROM (
    SELECT * 
    FROM EV e, temp3 t
    WHERE LOWER(e.pokemonname) = LOWER('${submitMovie}')) b 
    JOIN ABILITIES a 
    ON LOWER(b.pokemonname) = LOWER(a.Name) 
    JOIN pokemonnametype p 
    ON LOWER(a.Name) = LOWER(p.name)
`;
  }
  else{
    var query =  `WITH Temp1 AS (
    SELECT Count(*) AS num
    FROM PokemonGo pg
    JOIN EV e
    ON pg.pokemonID = e.pokedexnumber
    WHERE pg.urban = 'true' AND LOWER(e.pokedexnumber) = ${submitMovie}
    ),
    Temp2 AS (
    SELECT Count(*) AS num
    FROM PokemonGo pg
    JOIN EV e
    ON pg.pokemonID = e.pokedexnumber
    WHERE LOWER(e.pokedexnumber) = ${submitMovie}
    ),
    Temp3 AS (SELECT CASE WHEN t2.num <> 0 THEN t1.num/t2.num ELSE NULL END AS SpawnRateUrban
    FROM Temp1 t1, Temp2 t2
    )
    SELECT b.POKEDEXNUMBER, b.pokemonname, p.type1, p.type2, a.abilities, ROUND(b.height, 2) AS height, ROUND(b.weight, 2) AS weight, ROUND(b.SpawnRateUrban, 2) AS SpawnRateUrban
    FROM (
    SELECT * 
    FROM EV e, temp3 t
    WHERE e.pokedexnumber = ${submitMovie}) b 
    JOIN ABILITIES a 
    ON LOWER(b.pokemonname) = LOWER(a.Name) 
    JOIN pokemonnametype p 
    ON LOWER(a.Name) = LOWER(p.name)
`;
  }
  
  console.log(query);
    handleDatabaseOperation( req, res, function (request, response, connection) {
    //yezheng: outFormat https://stackoverflow.com/questions/47054480/how-to-reformat-oracledb-json-output
    var result = connection.execute( query
    , [],{outFormat:  oracledb.OBJECT}, // {
    //outFormat: oracledb.OBJECT // Return the result as Object}, 
    function (err, result) {
    if (err) {
    console.log('Error in execution of select statement'+err.message);
    } else {

      console.log(result.rows);
      var rows= result.rows;//JSON.parse(JSON.stringify(result.rows));
      console.log(rows);
      // response.writeHead(200, {'Content-Type': 'application/json'});
        response.status(200).send(rows);
      }
      doRelease(connection);
      });
    });  
});

/* ----- Q3 (Best Of Decades) ----- */

router.get('/decades', function(req, res) {
    
handleDatabaseOperation( req, res, function (request, response, connection) {
      var query = `SELECT DISTINCT TYPE1 FROM POKEMONNAMETYPE GROUP BY TYPE1`;
        console.log(query);
      //yezheng: outFormat https://stackoverflow.com/questions/47054480/how-to-reformat-oracledb-json-output
      var result = connection.execute( query
      , [],{outFormat:  oracledb.OBJECT}, // {
      //outFormat: oracledb.OBJECT // Return the result as Object}, 
      function (err, result) {
      if (err) {
      console.log('Error in execution of select statement'+err.message);
      } else {
        console.log(result.rows);
        var rows= result.rows;//JSON.parse(JSON.stringify(result.rows));
        console.log(rows);
        response.json(rows);
      }
      doRelease(connection);
      }
      );
  });
});

router.get('/bestof/:decade', function(req, res){ 
  var type1 = req.params.decade; 
  var type2 =type1.toLowerCase();

  handleDatabaseOperation( req, res, function (request, response, connection) {
  
  var query1 =  `
  WITH temp1 AS ( SELECT abilities, 1/against AS against, ROWNUM AS row_a FROM (SELECT DISTINCT a.abilities, a.Against_${type2} AS against 
  FROM Abilities a JOIN EV e ON a.name = e.PokemonName WHERE a.Against_${type2} <= 1 AND a.Against_${type2} > 0
  ORDER BY Against_${type2} ASC) WHERE ROWNUM <= 10
  ),
  temp2 AS (SELECT abilities, 1/against AS against, ROWNUM AS row_b FROM (SELECT DISTINCT a.abilities, a.Against_${type2} AS against 
  FROM Abilities a JOIN EV e ON a.name = e.PokemonName 
  WHERE a.Against_${type2} >= 2 ORDER BY Against_${type2} DESC) WHERE ROWNUM <= 10
  )
  SELECT t1.abilities AS a1, ROUND(t1.against,2) AS a2, t2.abilities AS a3, t2.against AS a4
  FROM temp1 t1
  full JOIN temp2 t2
  ON t1.row_a = t2.row_b`;
  console.log('[/bestof/:decade] QUERY1');
  console.log(query1);
  var query2=
  `SELECT * FROM (SELECT p.Name, e.AttackBaseStat+e.SpecialAttackBaseStat AS tot_attack, e.DEFENSEBASESTAT+e.SPECIALDEFENSEBASESTAT AS tot_defense, e.SPEEDBASESTAT FROM EV e JOIN PokemonNameType p ON LOWER(e.PokemonName) = LOWER(p.Name) WHERE p.type1 = '${type1}' ORDER BY tot_attack DESC, tot_defense DESC, SPEEDBASESTAT DESC) a WHERE ROWNUM<=10`;
  console.log('[/bestof/:decade] QUERY2');
  console.log(query2);
   var query3= `SELECT CASE WHEN t2.num <> 0 THEN ROUND(t1.num/t2.num, 3) ELSE 0 END AS SpawnRateUrban FROM (SELECT Count(*) AS num FROM PokemonGo pg JOIN EV e ON pg.pokemonID = e.pokedexnumber WHERE pg.urban = 'true' AND e.primarytype = '${type1}') t1, (SELECT Count(*) AS num FROM PokemonGo pg JOIN EV e ON pg.pokemonID = e.pokedexnumber WHERE e.primarytype = '${type1}') t2`;
   // var query3 = `SELECT DISTINCT 1 AS SPAWNRATEURBAN FROM PokemonGo`;
    console.log("'[/bestof/:decade] QUERY3'");
    console.log(query3);
  var resultjson = [null,null,null];//{};
   var result3 = connection.execute( query3, [],{outFormat:  oracledb.OBJECT}, 
    function (err, result) {
    if (err) {
    console.log('Error in execution of select statement'+err.message);
    } else {
      resultjson[2] = result.rows;
      console.log(resultjson);
    }
    });
  var result1 = connection.execute( query1, [],{outFormat:  oracledb.OBJECT}, 
    function (err, result) {
    if (err) {
    console.log('Error in execution of select statement'+err.message);
    } else {
      // console.log(res);
      resultjson[0] = result.rows;
    }
    });
    var result2 = connection.execute( query2, [],{outFormat:  oracledb.OBJECT}, 
    function (err, result) {
    if (err) {
    console.log('Error in execution of select statement'+err.message);
    } else {
      resultjson[1] = result.rows;
      console.log("result.rows res (after query1 query2)");
      console.log(resultjson);

  response.json(resultjson);
    }
    doRelease(connection);
    });
  });

});

router.get('/movieid', function (req, res) {
  var n=Math.round(Math.random()*5+10);
  var query = "SELECT imdb_id FROM Movies ORDER BY rand() Limit "+n+";"
  console.log(query)
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {     
    console.log(rows);
      res.json(rows);      
    }
  });
});


router.get('/:mvid', function(req, res) {

var http = require('http');
var mvid = req.params.mvid;

var options = {
   host: 'www.omdbapi.com',
   port: '80',
   path: '/?apikey=e59d84dc&i='+mvid  
};

var callback = function(response){
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      console.log(body);
      res.json(body);
   });
}
var req = http.request(options, callback);
req.end();
});


function handleDatabaseOperation( request, response, callback) {

response.setHeader('Access-Control-Allow-Origin', '*');
response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
response.setHeader('Access-Control-Allow-Credentials', true);
 

console.log('Handle request: '+request.url);



oracledb.getConnection({
      user: "admin",
      password: "cis550pokemon",
      connectString:"cis550pokemon.ca4mce6zf03f.us-east-1.rds.amazonaws.com:1521/pokemon"
      },
function(err, connection)
{
if (err) {
console.log('Error in acquiring connection ...');
return;
};
// do with the connection whatever was supposed to be done
console.log('Connection acquired ; go execute ');
callback(request, response, connection);
});
console.log("yezheng handleDatabaseOperation "+request.method + ":" + request.url );
}//handleDatabaseOperation


function doRelease(connection)
{
  connection.release(
  function(err) {
  if (err) {
    console.error(err.message);
    }
  });
}