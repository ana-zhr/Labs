var Orders = [];
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Name: ", order_info);
    Orders.push(order_info);

    var order = {
        version: 3,
        public_key: "sandbox_i22895913749",
        action: "pay",
        amount: order_info.amount,
        currency: "UAH",
        description: order_info.description,
        order_id: Math.random(),
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1("sandbox_Y9OU230xl6XpLsYC51zPaH2pJvce5BQb2QY8XYkP" + data + "sandbox_Y9OU230xl6XpLsYC51zPaH2pJvce5BQb2QY8XYkP");


    res.send({
        success: true,
        data: data,
        signature: signature
    });
};

function base64(str) {
    return new Buffer(str).toString('base64');
}

var crypto = require('crypto');

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}