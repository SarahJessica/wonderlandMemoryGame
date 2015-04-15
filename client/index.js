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
  $('#timer').text(10);
  stopTimer = setInterval(reduceTimer, 1000);
}

function reduceTimer(){
  $('#timer').text(parseInt($('#timer').text()) - 1);
  if($('#timer').text() <= 0){
    $('#controls').removeClass('animated shake infinite');
    $('#belowcardsholder').addClass('animated zoomOutDown');
    $('#cardsholder').addClass('animated zoomOutDown');
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
    for (var j = 1; j<=4; j++){
      var $td = $('<td>');
      var cardClass = 'pair' + cardNum;
      $td.addClass('card').addClass(cardClass);
      $tr.append($td);
    }
    $('#belowcardsholder').append($tr);
  }
  for ( i = 1; i <= 5; i++){
    var $tr = $('<tr>');
    for ( j = 1; j<=4; j++){
      var $td = $('<td>');
      var cardNum = shuffledCards.pop();
      var cardClass = 'pair' + cardNum;
      $td.attr('data-n', cardNum);
      $td.addClass('card').addClass(cardClass);
      $tr.append($td);
    }
    $('#cardsholder').append($tr);
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
