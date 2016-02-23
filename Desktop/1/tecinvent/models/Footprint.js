'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var FootprintsSchema = new mongoose.Schema(
    {
        id:{type: Number, required: true},
        name:{type: String, required: true},
        created:{type: Date, default: Date.now(), required: false},
        last_modified:{type: Date, default: Date.now(), required: false},
        verified:{type: Boolean, required: false},
        description: {type: String, required: false}

    }, { versionKey: false }
);




mongoose.model('Footprint', FootprintsSchema);