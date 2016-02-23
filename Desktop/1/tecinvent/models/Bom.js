'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var BomsSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        assambled_id: { type: String, default: "rock" },
        components_id: {type: [ObjectId], required: true, ref: 'Components'},
        designator: { type: String },
        created: { type: [ObjectId], ref: 'Track'},
        last_modified: { type: Date, default: Date.now },
        position: { type: Date, default: Date.now }
    }, { versionKey: false }
);




mongoose.model('Bom', BomsSchema);