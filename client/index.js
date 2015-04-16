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
  portfolios.on('child_changed',portfolioChanged);
  $('#createPortfolio').click(createPortfolio);
  $('#update').click(updateInfo);
  $('#buyStock').on('click','#buy',setSymbol);
  //showPortfolios();
  $('#buy').click(getQuote);
}

function portfolioChanged(snapshot){
  var key = snapshot.key();
  var portfolio = snapshot.val();
  console.log(portfolios.child(key).val());
}

function addPortfolio(snapshot){
  //var portfolio = snapshot.val();
  var key = snapshot.val();
  console.log(key.name);
  var portName = key.name;
  var $option = '<option class="portfolio">'+portName+'</option>';
  $('.portfolioList').append($option);
  var $div = $('<div class="'+portName+'">');

  $div.addClass('portfolio').append('<h2>'+ portName );
  $('#portfolioViewer').append($div);
}

function createPortfolio(){
  var portName = $('#portName').val();
  var portfolio = { name: portName };
  portfolios.push(portfolio,function(){
    console.log('create', portfolio.name);
  });
}

function updatePortfolios(){
  var portfolio = $('#portName').val();
  root.create({portfolios: portfolio});
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
  root.update({user: name, cash: cash});
  $('#welcome').text('Welcome, '+name);
  $('#showBalance').text('$ '+cash);
}

function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?';
  $.getJSON(url, function(response){
    console.log(response);
    var price = response.LastPrice;
    var amnt = $('#buyAmnt').val();
    var $sym = $('<h3>'+ symbol + ': ' + amnt + '</h3>');
    var $position = $('<h3 class="position"> Position: $' +(price * amnt).toFixed(2) + '</h3>');
    var $selected = '.'+$('.portfolioList').val();
    console.log($($selected));
    $($selected).append($sym);
    $($selected).append($position);
  });
}

//$('#quote').text(JSON.stringify(response));
