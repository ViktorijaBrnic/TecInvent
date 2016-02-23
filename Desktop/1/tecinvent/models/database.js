var pg = require('pg');
var connectionString = process.env.DATABASE_URL ||'postgres://altium:RiarenaDBAltium@tinvl02:5432/components';
var client = new pg.Client(connectionString);
client.connect();
var query = client.query('SELECT * FROM web_components_suppliers_vw');
query.on('end', function() {client.end(); });