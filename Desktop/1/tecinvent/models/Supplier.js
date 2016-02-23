'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var SuppliersSchema = new mongoose.Schema(
    {
        id: {},
        name: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        zip_code: {type: Number, required: true},
        country: {type: String, required: true},
        created: {type: Date, default: Date.now(), required: false},
        last_modified: {type: Date, default: Date.now(), required: false}
    }, { versionKey: false }
);




mongoose.model('Supplier', SuppliersSchema);