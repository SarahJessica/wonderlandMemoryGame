/* global Firebase:true */
'use strict';

$(document).ready(init);

var root, user, cash, symbol, buyAmnt, portfolios;

function init(){
  root = new Firebase('https://stockmarket-app.firebaseio.com/');
  user = root.child('user');
  user.on('value',updateInfo);
  cash = root.child('cash');
  portfolios = root.child('portfolios');
  portfolios.on('child_added',addPortfolio);
  $('#createPortfolio').click(createPortfolio);
  $('#update').click(updateInfo);
  $('#buyStock').on('click','#buy',setSymbol);
  //showPortfolios();
}

function addPortfolio(snapshot){
  var portfolio = snapshot.val();
  var key = snapshot.key();

}

function createPortfolio(){
  debugger;
  var portName = $('#portName').val();
  var portfolio = { name: portName };
  portfolios.push(portfolio);
}

function updatePortfolios(){
  var portfolio = $('#portName').val();
  root.set({portfolios: portfolio});
  //showPortfolios();
}

function setSymbol(){
  symbol = $('#symbol').val();
  console.log(symbol);
  buyAmnt = $('#buyAmnt').val();
  console.log(buyAmnt);
}

function updateInfo(){
  var name = $('#name').val();
  var cash = $('#cash').val();
  root.set({user: name, cash: cash});
  $('#welcome').text('Welcome, '+name);
  $('#showBalance').text('$ '+cash);
}

/*
 in init
$('#get-quote').click(getQuote);
function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?';
  $.getJSON(url, function(response){
    $('#quote').text(JSON.stringify(response));
    console.log(response);
  });
}
*/
