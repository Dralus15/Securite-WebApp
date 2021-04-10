var Mock = require('mockjs')
var data = Mock.mock({
    "nom|5-8": /[a-z]/,
    "numero": /\d{4} \d{4} \d{4} \d{4}/,
    "date": /(0[1-9]|1[0-2])\/20\d{2}/,
    "cvv": /\d{3}/
})

module.exports = {
    'Test demo': function (browser) {
        browser // open the page, input data and submit
            .url('http://localhost:3000')
            .assert.visible('.test-class', 'should search input visible')
            .setValue('#nomCarte', data['nom'])
            .setValue('#numeroCarte',data['numero'])
            .setValue('#dateCarte',data['date'])
            .setValue('#codeSecuCarte',data['cvv'])
            //.submit('#card-form')
            .pause(1000);

        browser.click('#submit').pause(1000);

        browser.execute(function () {
            return document.querySelectorAll('.dataObject').length;
        }, function (args) {
            browser.assert.notEqual(args.value, 0, 'should show results')
        });

        browser.end();
    }
};
