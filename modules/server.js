"use strict";
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
app.get('/scrape', function(req, res) {
    var url = 'http://skillplanner.stoacademy.com/0d16f03fad701e73add775f7b58a60d9';
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = {
                title: ""
            };
            $(document).ready(function() {
                $('#viewHomesub01 h2').filter(function() {
                    var data = $(this);
                    title = data.text();
                    // title = data.children().first().text();
                    // release = data.children().last().children().text();
                    json.title = title;
                });
            });
            console.log(json);
            res.send("woohoo")
        }
    })
})
app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app