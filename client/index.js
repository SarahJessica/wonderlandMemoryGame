'use strict'

$(document).ready(init);

var compare1, stopTimer;

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
  var stopTimer = setInterval(reduceTimer, 1000);
}

function reduceTimer(){
  $('#timer').text(parseInt($('#timer').text()) - 1);
  if($('#timer').text() === 0){
    clearInterval(stopTimer);
  }
}

function setupGame(){
  var shuffledCards = randomizeArray();

  for (var i = 1; i <= 5; i++){
    var $tr = $('<tr>');
    for (var j = 1; j<=4; j++){
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
  if($('.selected').length === 1){
    $(this).addClass('selected');
      $('.selected').addClass('animated flipOutY');
      var compare2 = $(this).data('n');
      if(compare1 === compare2){
        compare1.removeClass('selected animated flipOutY');
        compare2.removeClass('selected animated flipOutY');
      }else{
        setTimeout(dontMatch, 1000);
      }
  } else{
    $(this).addClass('selected');
      compare1 = $(this).data('n');
  }

  //if($('.flipOutY').data('n') === )
}
function dontMatch(){
  console.log('test');
  $('.selected').removeClass('selected flipOutY').addClass('flipInY');
  $('.selected').removeClass('selected flipOutY').addClass('flipInY');
}
