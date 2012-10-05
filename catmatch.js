var cm = (function() {
  var cm={};

  var deck = null;
  var apikey = null; 
  var numPairs = 6;
  var firstTurned = null;
  var pairsFound = 0;

  cm.init = function() {
    $('#welcome').fadeIn('fast');
    $('a').click( playGame );
  }

  function playGame() {
    $('#welcome').fadeOut('fast');
    $('#again').fadeOut('fast');
    $('#loading').fadeIn('fast')
    dealCards();
    return false;
  }

  function dealCards() {
    if (deck == null) {
      loadCards();
    } else {
      var cards = selectCards();
      shuffle(cards);
      layout(cards);
      firstTurned = null;
      pairsFound = 0;
      $('#loading').fadeOut('fast', function() {
        $('#game').fadeIn();
      });
    }
  }

  function loadCards() {
    dki.apikey = apikey;
    dki.fetchImages({caption: 'cat', keywords: 'feline', limit: 100}, function(data) {
      deck = data.images;
      dealCards();
    });
  }

  function selectCards() {
    var cards = [];
    while (cards.length < numPairs * 2) {
      var card = deck[Math.floor(Math.random() * deck.length)];
      if (cards.indexOf(card) == -1) {
        cards.push(card, $.extend({}, card));
      }
    }
    return cards;
  }

  function shuffle(cards) {
    for (var i in cards) {
      cards[i].order = Math.random();
    }
    cards.sort( function (a,b) {
      return a.order - b.order;
    });
  }

  function layout(cards) {
    var cardsHtml = ich.cards({cards: cards});
    $('#board').empty();
    $('#board').html(cardsHtml);
    $('li').click(turnCard);
  }

  function turnCard(evtObj) {
    var card = evtObj.currentTarget;
    $(card).toggleClass('flipped');
    setTimeout( function() {
      checkTurned(card); },
      500
    );
  }

  function checkTurned(card) {
    if (firstTurned == null) {
      firstTurned = card;
    } else if (firstTurned == card) {
      firstTurned = null;
    } else {
      checkMatch(card);
    }
  }

  function checkMatch(card) {
    if ($(card).data('imageid') == $(firstTurned).data('imageid')) {
      $(card).toggleClass('dissolve');
      $(firstTurned).toggleClass('dissolve');
      pairsFound++;
      if (pairsFound == numPairs) {
        $('#game').fadeOut();
        $('#again').fadeIn();
      }
    } else {
      $(card).toggleClass('flipped');
      $(firstTurned).toggleClass('flipped');
    }
    firstTurned = null;
  }

  return cm;
})();
