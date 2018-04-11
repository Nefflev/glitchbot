//'use strict';
var request = require('request');



function function1(){
  return "shit";
};


  

          
  
//File-Test
var exFile = require('./testfile.js');

//--------------------------------------------------------------------
//Pingt den Bot alle 5min, damit GLitch nicht in den Ruhezustand fährt
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//--------------------------------------------------------------------

//Bot Setup
const Eris = require("eris");

var bot = new Eris(process.env.DISCORD_BOT_TOKEN);
// Replace BOT_TOKEN with your bot account's token

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

bot.on("messageCreate", (msg) => { // When a message is created
  
  var input = msg.content;
  input = input.substring(input.indexOf(" ") + 1);
  
    if(msg.content === "!ping") { // If the message content is "!ping"
        bot.createMessage(msg.channel.id, "Pong!");
        // Send a message in the same channel with "Pong!"
    } else if(msg.content === "!pong") { // Otherwise, if the message is "!pong"
        bot.createMessage(msg.channel.id, "Ping!");
        // Respond with "Ping!"
    } else if(msg.content === "!function1"){
        bot.createMessage(msg.channel.id, function1());
    } else if(msg.content === "!function2"){
        bot.createMessage(msg.channel.id, exFile.data.externalFunction());
    } else if(msg.content === "!gif") { 
      getRandomGif(function (message){
        console.log('Message: ' + message);
        bot.createMessage(msg.channel.id, message);
      });
    } else if(msg.content === "!start") { 
      bot.createMessage(msg.channel.id, "Thanks for subscribing");
      setInterval(function () {getRandomGif(function (message){
        console.log('Message: ' + message);
        bot.createMessage(msg.channel.id, message);
      })}, 10 * 60 * 1000);
    } else if(matchRuleShort(msg.content,"!gif *")) {
      getSearchGif(function (message){
        console.log('Message: ' + message);
        bot.createMessage(msg.channel.id, message);
      }, input);
    } else if(msg.content === "!meme") {
      getMeme(function (message){
        console.log('Message: ' + message);
        bot.createMessage(msg.channel.id, message);
      });
    } else if(matchRuleShort(msg.content,"!location *")) {
      getExplore(function (message){
        console.log('Message: ' + message);
        message = message.toString();
        bot.createMessage(msg.channel.id, message);
      }, input);
    } else if(matchRuleShort(msg.content,"!weather *")) {
      getWeather(function (message){
        console.log('Message: ' + message);
        message = message.toString();
        bot.createMessage(msg.channel.id, message);
      }, input);
    }
});

bot.connect(); // Get the bot to connect to Discord


//FUNCTION DECLARATION -----------------------------------------------------------------------------------

function getRandomGif(callback){
  console.log('apiRequest');
  var url = 'https://api.giphy.com/v1/gifs/random?api_key=' + process.env.GIPHY_TOKEN;
  //Abruf
  request.get({
    url: url,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.GIPHY_TOKEN,
      'Accept': 'application/vnd.api+json'}
  }, (err, res, data) => {
    //Funktion ist asynchron und wird erst bearbeitet, sobald das Ergebnis des Requests zurück kommt
    if (err) {
      console.log('URL: ' + url + ', Error: ' + err);
      return err;
    } else if (res.statusCode !== 200) {
      console.log('URL: ' + url + ', Status:' + res.statusCode);
      return res.statusCode;
    } else {
      // data is already parsed as JSON:
      
      var results = data;
      
      console.log(results.data.url);
      
      var gifUrl = results.data.url;
      
      console.log('URL: ' + url + ', Data: %j', gifUrl);
      
      //return data;
      callback(gifUrl);
    }
  });
};

function getSearchGif(callback, search){
  console.log('apiRequest');
  var url = 'https://api.giphy.com/v1/gifs/search?api_key=' + process.env.GIPHY_TOKEN + '&q=' + search;
  //Abruf
  request.get({
    url: url,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.GIPHY_TOKEN,
      'Accept': 'application/vnd.api+json'}
  }, (err, res, data) => {
    //Funktion ist asynchron und wird erst bearbeitet, sobald das Ergebnis des Requests zurück kommt
    if (err) {
      console.log('URL: ' + url + ', Error: ' + err);
      return err;
    } else if (res.statusCode !== 200) {
      console.log('URL: ' + url + ', Status:' + res.statusCode);
      return res.statusCode;
    } else {
      // data is already parsed as JSON:
      
      var results = data;
      var rndmNr = Math.floor(Math.random() * results.data.length);
      
      console.log(rndmNr);
      console.log(results.data[rndmNr].url);
      
      var gifUrl = results.data[rndmNr].url;
      
      console.log('URL: ' + url + ', Data: %j', gifUrl);
      
      //return data;
      callback(gifUrl);
    }
  });
};

function getMeme(callback){
  console.log('apiRequest');
  var url = 'https://api.imgflip.com/get_memes';
  //Abruf
  request.get({
    url: url,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': '',
      'Accept': 'application/vnd.api+json'}
  }, (err, res, data) => {
    //Funktion ist asynchron und wird erst bearbeitet, sobald das Ergebnis des Requests zurück kommt
    if (err) {
      console.log('URL: ' + url + ', Error: ' + err);
      return err;
    } else if (res.statusCode !== 200) {
      console.log('URL: ' + url + ', Status:' + res.statusCode);
      return res.statusCode;
    } else {
      // data is already parsed as JSON:
      
      var results = data;
      var rndmNr = Math.floor(Math.random() * results.data.memes.length);      
      
      console.log(results.data.memes[rndmNr].url);
      
      var memeUrl = results.data.memes[rndmNr].url;
      
      console.log('URL: ' + url + ', Data: %j', memeUrl);
      
      //return data;
      callback(memeUrl);
    }
  });
};

function getExplore(callback, search){
  console.log('apiRequest');
  var url = 'https://api.foursquare.com/v2/venues/explore?client_id=' + process.env.FS_CLIENTID + '&client_secret=' + process.env.FOURSQUARE_TOKEN + '&v=20180323&near=' + search;
  //Abruf
  request.get({
    url: url,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.FOURSQUARE_TOKEN,
      'Accept': 'application/vnd.api+json'}
  }, (err, res, data) => {
    //Funktion ist asynchron und wird erst bearbeitet, sobald das Ergebnis des Requests zurück kommt
    if (err) {
      console.log('URL: ' + url + ', Error: ' + err);
      return err;
    } else if (res.statusCode !== 200) {
      console.log('URL: ' + url + ', Status:' + res.statusCode);
      return res.statusCode;
    } else {
      // data is already parsed as JSON:
      
      var results = data;
      //var rndmNr = Math.floor(Math.random() * results.data.memes.length);      
      
      console.log(results.response.groups[0].items[0].venue.name);
      
      var venueName = [];
      
      for (var i=0; i<results.response.groups[0].items.length; i++) {
            venueName.push(results.response.groups[0].items[i].venue.name);
        }
      
      console.log('URL: ' + url + ', Data: %j', venueName);
      
      //return data;
      callback(venueName);
    }
  });
};

function getWeather(callback, search){
  console.log('apiRequest');
  var url = 'http://api.openweathermap.org/data/2.5/weather?&appid=' + process.env.WEATHER_TOKEN + '&q=' + search;
  //Abruf
  request.get({
    url: url,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.WEATHER_TOKEN,
      'Accept': 'application/vnd.api+json'}
  }, (err, res, data) => {
    //Funktion ist asynchron und wird erst bearbeitet, sobald das Ergebnis des Requests zurück kommt
    if (err) {
      console.log('URL: ' + url + ', Error: ' + err);
      return err;
    } else if (res.statusCode !== 200) {
      console.log('URL: ' + url + ', Status:' + res.statusCode);
      return res.statusCode;
    } else {
      // data is already parsed as JSON:
      
      var results = data;
      var temp_min = results.main.temp_min - 273.15;
      var temp_max = results.main.temp_max - 273.15;
      
      
      var weather = '```Zusammenfassung: ' + results.weather[0].main + ', Beschreibung: ' + results.weather[0].description + ', Temperatur Minimum: ' + temp_min + ' Grad Celsius, Temperatur Maximum: ' + temp_max + ' Grad Celsius```';
      
      console.log('URL: ' + url + ', Data: %j', weather);
      
      //return data;
      callback(weather);
    }
  });
};

function matchRuleShort(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

