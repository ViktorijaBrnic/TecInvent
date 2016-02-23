'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var SymbolsSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        name: {type: String, required: true},
        created: {type: Date, default: Date.now(), required: false},
        last_modified: {type: Date, default: Date.now(), required: false},
        verified:{type: Boolean, required: true}

    }, { versionKey: false }
);




mongoose.model('Symbol', SymbolsSchema);