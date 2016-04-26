/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t; },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t; },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t); },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t; },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t; },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1; },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t; },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t; },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t; },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t; },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
};

var SCROLL_DURATION = 1120;
var TIMESTEP = 16;

var scrollIntervalId;
var chooseTreasureIntervalId;

var main = document.getElementById("main");

window.addEventListener("focus", function() {
	currAudio.play();
});
window.addEventListener("blur", function() {
	currAudio.pause();
});

var turnPageAudio = new Audio("turn_page.wav");
var chimesAudio = new Audio("chimes.wav");

var pageElems = document.getElementsByClassName("page");
var currPage = 0;
var currAudio = new Audio("wind.wav");
currAudio.loop = true;
currAudio.play();

function scroll(dir) {

	clearInterval(scrollIntervalId);
	var elapsed = 0;
	var startScrollY = main.scrollTop;
	var currScrollY = startScrollY;

	currPage += dir;
	if (pageElems[currPage].dataset.audio) {
		currAudio.pause();
		currAudio = new Audio(pageElems[currPage].dataset.audio);
		currAudio.loop = true;
		currAudio.play();
	}

	scrollIntervalId = setInterval(function() {
		var easet = EasingFunctions.easeOutCubic(elapsed/SCROLL_DURATION);
		currScrollY = startScrollY + (easet * 600 * dir);
		main.scrollTop = currScrollY;

		elapsed += TIMESTEP;
		if (elapsed >= SCROLL_DURATION) {
			clearInterval(scrollIntervalId);
		}
	}, TIMESTEP);
}

var pageBackElems = document.getElementsByClassName("page-back");
Array.prototype.forEach.call(pageBackElems, function(pageBackElem) {
	pageBackElem.onclick = function() {
		scroll(-1);
		turnPageAudio.play();
	};
});

var pageActionElems = document.getElementsByClassName("page-action");
Array.prototype.forEach.call(pageActionElems, function(pageActionElem) {
	pageActionElem.onclick = function() {
		scroll(1);
		if (pageActionElem.dataset.audio) {
			var audio = new Audio(pageActionElem.dataset.audio);
			audio.play();
		}
		else turnPageAudio.play();
	};
});

document.getElementById("register").onsubmit = function() {
	scroll(1);
	turnPageAudio.play();
	return false;
};

var FADE_DURATION = 38400;
var treasureElems = document.getElementsByClassName("treasure");
Array.prototype.forEach.call(treasureElems, function(treasureElem) {
	treasureElem.onclick = function() {
		chimesAudio.play();

		clearInterval(chooseTreasureIntervalId);
		var elapsed = 0;

		chooseTreasureIntervalId = setInterval(function() {
			var opacity = 1 - EasingFunctions.easeOutQuint(elapsed/FADE_DURATION);
			Array.prototype.forEach.call(treasureElems, function(treasureElem2) {
				if (treasureElem2 == treasureElem) {
					var treasureImg = treasureElem2.getElementsByTagName("img")[0];
					treasureImg.style.opacity = opacity;
				} else {
					treasureElem2.style.opacity = opacity;
				}
				elapsed += TIMESTEP;
				if (elapsed >= FADE_DURATION) {
					clearInterval(chooseTreasureIntervalId);
					scroll(1);
					turnPageAudio.play();
				}
			}, TIMESTEP);
		});
	};
});