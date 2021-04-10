var express = require('express');
var Mock = require('mockjs')
var app = express();
var data = Mock.mock({
    "card|1-10":[{
        "nom|5-8": /[a-z]/,
        "numero": /\d{4} \d{4} \d{4} \d{4}/,
        "date": /(0[1-9]|1[0-2])\/20\d{2}/,
        "cvv|100-1000": 100
    }]
})

app.get('/mock', function (req,res) {
    res.send(JSON.stringify(data));
});
var server = app.listen(8001, function(){

});
