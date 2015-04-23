<<<<<<< HEAD
'use strict'

$(document).ready(init);

var $compare1, stopTimer;
var pairsToGameOver = 10;

function init(){
  $('#start').click(startGame);
  $('#cardsholder').on('click', '.card', flipCard);
}

function startGame(){
  startTimer();
  setupGame();
}

function startTimer(){
  $('#timer').text(60);
  stopTimer = setInterval(reduceTimer, 1000);
}

function reduceTimer(){
  $('#timer').text(parseInt($('#timer').text()) - 1);
  if($('#timer').text() <= 0){
    $('#controls').removeClass('animated shake infinite');
    $('#belowcardsholder').addClass('animated bounceOut');
    $('#cardsholder').addClass('animated bounceOut');
    clearInterval(stopTimer);
    $('#start').show();
  }
  else if($('#timer').text() < 5){
    $('#controls').addClass('animated shake infinite');
  }
}

function setupGame(){
  $('#start').hide();
  var shuffledCards = randomizeArray();
  for (var i = 1; i <= 5; i++){
    var $tr = $('<tr>');
    var $secondtr = $('<tr>');
    for (var j = 1; j<=4; j++){
      var $td = $('<td>');
      var $secondtd = $('<td>');
      var cardNum = shuffledCards.pop();
      var cardClass = 'pair' + cardNum;
      $td.attr('data-n', cardNum);
      $secondtd.attr('data-n', cardNum);
      $td.addClass('card').addClass(cardClass);
      $secondtd.addClass('card').addClass(cardClass);
      $tr.append($td);
      $secondtr.append($secondtd);
    }
    $('#cardsholder').append($tr);
    $('#belowcardsholder').append($secondtr);
    console.log(shuffledCards);
  }
}


function randomizeArray(){
  var shuffledCards = [];
  for(var i = 0; i < 10; i++){
    var pairid = i;
    shuffledCards.push(pairid);
    shuffledCards.push(pairid);
  }
    for (var j = 0; j <=35; j++){
    var randomNum = Math.floor(Math.random() * 19);
    var randomCard = shuffledCards.splice(randomNum, 1);
    shuffledCards.push(randomCard[0]);
  }
  return shuffledCards;
}

function flipCard(){
  console.log('selected', $('.selected').length);
  if($('.selected').length === 1){
    $(this).addClass('selected');
      $('.selected').addClass('animated flipOutY');
      var $compare2 = $(this);
      console.log($compare1.data('n'), $compare2.data('n'));
      if($compare1.data('n') === $compare2.data('n')){
        $('.selected').removeClass('selected');
        pairsToGameOver--;
        console.log('pairs to game over:', pairsToGameOver);
      }
      else{
        setTimeout(dontMatch, 750);
      }
  }
  else{
    $(this).addClass('selected');
    $compare1 = $(this);
  }
}

function dontMatch(){
  $('.selected').removeClass('selected flipOutY').addClass('flipInY');
  $('.selected').removeClass('selected flipOutY').addClass('flipInY');
}
=======
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
>>>>>>> 93c466a83d342e00bd63860c9a3fc8dff07812dd
