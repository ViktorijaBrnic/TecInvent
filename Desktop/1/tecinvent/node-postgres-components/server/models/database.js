var pg = require('pg');
var path = require('path');
// var connectionString = process.env.DATABASE_URL ||'postgres://altium:RiarenaDBAltium@tinvl02:5432/components';
var connectionString = require(path.join(node-postgres-components, '../', '../', 'config'));
var client = new pg.Client(connectionString);
client.connect();
var query = client.query('SELECT * FROM web_components_suppliers_vw');
query.on('end', function() {client.end(); });