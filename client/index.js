'use strict';

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
  $('#winner').hide();
}

function startTimer(){
  $('#timer').text(60);
  stopTimer = setInterval(reduceTimer, 1000);
}

function reduceTimer(){
  $('#timer').text(parseInt($('#timer').text()) - 1);
  if(pairsToGameOver === 0){
    clearInterval(stopTimer);
    $('#start').show();
    $('#winner').show();
  }
  if($('#timer').text() <= 0){
    $('#controls').removeClass('animated shake infinite');
    $('#belowcardsholder').addClass('animated bounceOut');
    $('#cardsholder').addClass('animated bounceOut');
    clearInterval(stopTimer);
    $('#start').show();
  }else if($('#timer').text() < 5){
    $('#controls').addClass('animated shake infinite');
  }
}

function setupGame(){
  $('#start').hide();
  var shuffledCards = randomizeArray();
  for (var i = 1; i <= 5; i++){
    var $tr = $('<tr>');
    var $secondtr = $('<tr>');
    for (var j = 1; j <= 4; j++){
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
    shuffledCards.push(i);
    shuffledCards.push(i);
  }
  for (var j = 0; j <= 35; j++){
    var randomNum = Math.floor(Math.random() * 19);
    var randomCard = shuffledCards.splice(randomNum, 1);
    shuffledCards.push(randomCard[0]);
  }
  return shuffledCards;
}

function flipCard(){
  if($('.selected').length === 1){ // second card selected
    $(this).addClass('selected animated flipOutY');
    var $compare2 = $(this);
    if($compare1.data('n') === $compare2.data('n')){
      $('.selected').removeClass('selected');
      pairsToGameOver--;
    }else{
      setTimeout(dontMatch, 750);
    }
  }else{ // first card selected
    $(this).addClass('selected');
    $(this).addClass('animated flipOutY');
    $compare1 = $(this);
  }
}

function dontMatch(){
  $('.selected').removeClass('selected flipOutY').addClass('flipInY');
}
