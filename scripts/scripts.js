// IFTTT Slottt Machine by Jen Hamon
// jen@ifttt.com
// github.com/jhamon
var wordlist = [
  'dead of winter',
  'robo rally',
  'descent',
  'terraforming mars',
  'battle star galactica',
  'codenames',
  'exploding kittens',
  'skull',
  'coup',
  'mansion of madness',
  'mysterium',
  'captain sonar',
  'hero quest',
  'stone age',
  'carcassone',
  'lords of waterdeep',
  'pandemic',
  'ticket to ride'
];

function buildSlotItem (text) {
  return $('<div>').addClass('slot-machine-item').text(text);
}

function buildSlotContents ($container, wordlist) {
  $items = wordlist.map(buildSlotItem);
  $container.append($items);
}

function popPushNItems ($container, n) {
    $children = $container.find('.slot-machine-item');
    $children.slice(0, n).insertAfter($children.last());

    if (n === $children.length) {
      popPushNItems($container, 1);
    }
}

// After the slide animation is complete, we want to pop some items off
// the front of the container and push them onto the end. This is
// so the animation can slide upward infinitely without adding
// inifinte div elements inside the container.
function rotateContents ($container, n) {
    setTimeout(function () {
      popPushNItems($container, n);
      $container.css({top: 0});
    });
}

function randomSlotttIndex(max) {
  var randIndex = (Math.random() * max | 0);
  return (randIndex > 10) ? randIndex : randomSlotttIndex(max);
}

function animate() {
  var wordIndex = randomSlotttIndex(wordlist.length);
  $wordbox.animate({top: -wordIndex*150}, 1000, 'linear', function () {
			rotateContents($wordbox, wordIndex);
  });
}

$(function () {
	document.querySelector('button').addEventListener('click', function() {
	  $wordbox = $('#wordbox .slot-machine-items-container');
	  buildSlotContents($wordbox, wordlist);
		animate();

		var dice = Math.floor(Math.random() * 9) + 1;
    console.log(dice);
		var diceDOM = document.querySelector('.quotes');
		diceDOM.src = 'quotes-' + dice + '.png';
	})
});
