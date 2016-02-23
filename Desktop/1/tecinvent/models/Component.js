'use strict';
var pg = require('pg');


var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
var pgClient = new pg.Client(connectionString);
pgClient.connect();


var ObjectId = mongoose.Schema.Types.ObjectId;
var ComponentsSchema = new mongoose.Schema(
    {
        id: {type: [ObjectId], required: true},
        family_id: {type:[ObjectId],required: true, ref: 'Families'},
        symbol_id: {type:[ObjectId],required: true, ref: 'Symbols'},
        footprint_id: {type: [ObjectId],required: true, ref: 'Footprints'},
        mounting_id: {type:[ObjectId],required: true, ref: 'Mounting'},
        description: {type: String, required: true},
        created: {type: Date, default: Date.now(), required: true},
        last_modified: {type: Date, default: Date.now(), required: true},
        supplier_1: {type: String, required: false},
        part_number1: {type: Number, required: false},
        supplier_2: {type: String, required: false},
        part_number2: {type: Number, required: false},
        supplier_3: {type: String, required: false},
        part_number3: {type: Number, required: false},
        supplier_4: {type: String, required: false},
        part_number4: {type: Number, required: false},
        value: {type: String, required: true},
        verified: {type: Boolean, required: true},
        sch_id: {type: [ObjectId], required: true}
    }, { versionKey: false }
);




mongoose.model('Component', ComponentsSchema);