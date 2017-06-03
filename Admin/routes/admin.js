var router = require('express').Router();
var mongojs = require('mongojs');
var db = mongojs('user1:user1@ds145677.mlab.com:45677/sampleapp');
console.log('Inside Admin');
var user = db.collection('customerlist');
var item = db.collection('itemlist');

//Get Item List
router.get('/itemlist', function (req, res) {
    console.log('I received a GET Item request');
    item.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

//Get Item List with Id
router.get('/itemlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    item.findOne({itemName: req.params.id}, function (err, doc) {
        res.json(doc);
    });
});

//Create Items
router.post('/itemlist', function (req, res) {
    console.log('Inside Itemlist'+req.body);
    item.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

//Update Item
router.put('/itemlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    item.findAndModify({
            query: {itemName: req.params.id},
            update: {$set:
            {itemName: req.body.itemName, itemType: req.body.itemType, itemDescription: req.body.itemDescription,
                itemPrice: req.body.itemPrice, itemQnty: req.body.itemQnty, itemManufacturer: req.body.itemManufacturer,
                itemRoom: req.body.itemRoom, itemPath: req.body.itemPath}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

//Delete Item
router.delete('/itemlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    item.remove({itemName: req.params.id}, function (err, doc) {
        res.json(doc);
    });
});

//Get Customer Details
router.get('/customer', function (req, res) {
    console.log('I received a GET User request');
    user.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

//Get Customer with Id
router.get('/customer/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    user.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

//Create Customer
router.post('/customer', function (req, res) {
    console.log('Inside Userlist '+req.body);
    user.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

//Update Customer
router.put('/customer/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    user.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set:
            {name: req.body.name, address: req.body.address, city: req.body.city,
                state: req.body.state, zip: req.body.zip, phonenumber: req.body.phonenumber,
                email: req.body.email, username: req.body.username, password: req.body.password}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

//Delete Customer
router.delete('/customer/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    user.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});


module.exports = router;

