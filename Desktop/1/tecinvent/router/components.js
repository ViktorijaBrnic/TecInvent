

var express = require('express');

var router = express.Router();

var pg = require('pg');

var connectionString = require(path.join(node-postgres-components, '../', '../', 'config'));

require('../models/Component');
var Component = mongoose.model('Component');

router.get('/', function(req, res){

    console.log('something');
    Album.find({}, function (err, found) {
        if (err) throw (err);
        res.json(found);
    });

});
router.get('/:id', function(req, res){
    // Album.findById(req.params.id, function (err, found) {
    Component.findById(req.params.id, function (err, found) {
        if(err){
            res.status(404).end()}

        if(found){
            res.json(found)}
        else{
            res.status(404).end()
        }
    });

});

router.delete("/:id", function(req, res){
    Component.findById(req.params.id, function (err, found){
        if(err){
            res.status(404).end()
        }
        else{
            if(found){
                found.remove();
                res.status(204).end()
            }
            else{
                res.status(404).end()
            }
        }
    })
});



//POST
router.post('/', function(req, res) {
    var mComponent = new Component(
        req.body
    );
    mComponent.save( function (err, found) {
        if(err){res.status(400).end()}
        res.send(found);
    })
});

/*
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

 */

//PUT
router.put('/:id', function(req, res){
    req.body._id = req.params.id;
    Component.findById(req.params.id, function(err, found){
        if(found){
            found.family_id = req.body.family_id;
            found.symbol_id = req.body.symbol_id;
            found.footprint_id = req.body.footprint_id;
            found.mounting_id = req.body.mounting_id;
            found.description = req.body.description;
            found.created = req.body.created;
            found.last_modified = req.body.last_modified;
            found.supplier_1 = req.body.supplier_1;
            found.part_number1 = req.body.part_number1;
            found.supplier_2 = req.body.supplier_2;
            found.part_number2 = req.body.part_number2;
            found.supplier_3 = req.body.supplier_3;
            found.part_number3 = req.body.part_number3;
            found.supplier_4 = req.body.supplier_4;
            found.part_number4 = req.body.part_number4;
            found.value = req.body.value;
            found.verified = req.body.verified;
            found.sch_id = req.body.sch_id;
            found.save(function (err, found) {
                if(err){return res.status(400).end()
                }
                res.status(204);
                res.send(found);
            })
        }
        else{
            var mComponent = new Component(
                req.body
            );
            mComponent.save( function (err, found) {
                if(err){res.status(400).end()}
                res.send(found);
            })
        }
    });
});


module.exports = router;
