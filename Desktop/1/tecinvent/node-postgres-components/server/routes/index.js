var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');

var connectionString = require(path.join( '../', '../', 'config'));
//var connectionString = process.env.DATABASE_URL ||'postgres://altium:RiarenaDBAltium@tinvl02:5432/components';
//----------------------------------------------------------//


router.post('/api/v1/components', function(req, res) {

  var results = [];

  // Grab data from http request
  var data = {schindler_id: req.body.schindler_id, family: req.body.family, value: req.body.value,
    description:
    req.body.description,
    mount: req.body.mount,
    symbol: req.body.symbol,
    footprint: req.body.footprint,
    supplier_1: req.supplier_1,
    supplier_part_number_1: req.body.supplier_part_number_1,
    supplier_2: req.body.supplier_2,
    supplier_part_number_2: req.body.supplier_part_number_2,
    supplier_3: req.body.supplier_3,
    supplier_part_number_3: req.body.supplier_part_number_3,
    supplier_4: req.body.supplier_4,
    supplier_part_number_4: req.body.supplier_part_number_4,
    verified: req.verified,
    symbol_verified: req.body.symbol_verified,
    footprint_verified: req.body.footprint_verified};

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
/*    client.query("UPDATE web_components_suppliers_vw SET schindler_id=($1), family=($2), value=($3), description=($4), mount=($5), symbol=($6), footprint=($7), supplier_1=($8), supplier_part_number_1=($9), supplier_2=($10), supplier_part_number_2=($11), supplier_3=($12), supplier_part_number_3=($13), supplier_4=($14), supplier_part_number_4=($15), verified=($16), symbol_verified=($17), footprint_verified=($18)   WHERE id=($19)",
*/
 // SQL Query > Insert Data
    client.query("INSERT INTO web_components_suppliers_vw (schindler_id, family, value, description, mount,  symbol," +
        "footprint, " +
        "supplier_1, supplier_part_number_1, supplier_2, supplier_part_number_2, supplier_3, supplier_part_number_3," +
        "supplier_4, supplier_part_number_4, verified, symbol_verified, footprint_verified) " +
        "values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18 )",
         [data.schindler_id, data.family, data.value, data.description, data.mount, data.symbols,
           data.footprint, data.supplier_1, data.supplier_part_number_1, data.supplier_2,
            data.supplier_part_number_2, data.supplier_3, data.supplier_part_number_3,
             data.supplier_4, data.supplier_part_number_4, data.verified,
              data.symbol_verified, data.footprint_verified ]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM web_components_suppliers_vw ORDER BY id ASC");
  console.log(query);
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });


  });
});


//----------------------------------------------------------//
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('../', '../', 'client', '../views', 'index.html');

  var pathJoined = path.join(__dirname,'../', '../', 'client', 'views', 'index.html');
 // console.log(pathJoined);
  res.sendFile(pathJoined);
});

module.exports = router;



//----------------------------------------------------------//
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('../', '../', 'client', '../views', 'index.html');

  var pathJoined = path.join(__dirname,'../', '../', 'client', 'views', 'index.html');
  // console.log(pathJoined);
  res.sendFile(pathJoined);
});

module.exports = router;




//----------------------------------------------------------//

router.get('/api/v1/components', function(req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM web_components_suppliers_vw ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });

  });

});






//----------------------------------------------------------//

router.put('/api/v1/components/:component_id', function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.todo_id;

  // Grab data from http request
  var data = {schindler_id: req.body.schindler_id, family: req.body.family, value: req.body.value,
    description: req.body.description, mount: req.body.mount, symbol: req.body.symbol,
    footprint: req.body.footprint, supplier_1: req.supplier_1, supplier_part_number_1: req.body.supplier_part_number_1,
    supplier_2: req.body.supplier_2, supplier_part_number_2: req.body.supplier_part_number_2,
    supplier_3: req.body.supplier_3, supplier_part_number_3: req.body.supplier_part_number_3,
    supplier_4: req.body.supplier_4, supplier_part_number_4: req.body.supplier_part_number_4,
    verified: req.verified, symbol_verified: req.body.symbol_verified,
    footprint_verified: req.body.footprint_verified};



  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).send(json({ success: false, data: err}));
      console.log(res.stringify());
    }

    // SQL Query > Update Data
    // client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

    // *** modify *** SQL Query > Update Data  ***
    client.query("UPDATE web_components_suppliers_vw SET schindler_id=($1), family=($2), value=($3), description=($4), mount=($5)," +
        "symbol=($6), footprint=($7), supplier_1=($8), supplier_part_number_1=($9)," +
        "supplier_2=($10), supplier_part_number_2=($11)," +
        "supplier_3=($12), supplier_part_number_3=($13)," +
        "supplier_4=($14), supplier_part_number_4=($15)," +
        "verified=($16), symbol_verified=($17), footprint_verified=($18)",
         [data.schindler_id, data.family, data.value, data.description, data.mount,
          data.symbol, data.footprint, data.supplier_1, data.supplier_part_number_1,
          data.supplier_2, data.supplier_part_number_2,
           data.supplier_3, data.supplier_part_number_3,
           data.supplier_4, data.supplier_part_number_4,
          data.verified, data.symbol_verified, data.footprint_verified]);

    // // *** modify ***


    // SQL Query > Select Data
    var query = client.query("SELECT * FROM web_components_suppliers_vw ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });

});







//----------------------------------------------------------//

router.delete('/api/v1/component/:component_id', function(req, res) {

  var results = [];

  // Grab data from the URL parameters
  var id = req.params.component_id;


  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Delete Data
    client.query("DELETE FROM web_components_suppliers_vw WHERE id=($1)", [id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM web_components_suppliers_vw ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });

});
//----------------------------------------------------------//



//----------------------------------------------------------//

router.get('/api/v1/families.json', function(req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function (err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT id, name FROM families ORDER BY name ASC");

    // Stream results back one row at a time
    query.on('row', function (row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function () {
      done();
      return res.json(results);

    });

  });

});

router.get('/api/v1/footprints.json', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      // SQL Query > Select Data
      var query = client.query("SELECT id, name FROM footprints ORDER BY name ASC");

      // Stream results back one row at a time
      query.on('row', function(row) {
        results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
        done();
        return res.json(results);

      });

    });

});



router.get('/api/v1/symbols.json', function(req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT id, name FROM symbols ORDER BY name ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);

    });

  });

});


router.get('/api/v1/suppliers.json', function(req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT id, name FROM suppliers ORDER BY name ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);

    });

  });

});



/*
router.get('/api/v1/suppliers.json', function(req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT id, name, adsress, city, zip_code, country, created, last_modified FROM suppliers ORDER BY name ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);

    });

  });

});
 **/


/*
router.get('/api/v1/boms.json', function(req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query("SELECT id, assembled_id, components_id, designator, created, last modified, position FROM boms ORDER BY name ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);

    });

  });

});
*/