var resizeTimeout;

window.addEventListener('resize', function() {
	clearTimeout(resizeTimeout);

	resizeTimeout = setTimeout(function () {
		pixels();
	}, 200);
});

function pixels() {
	var bodyH = document.body.offsetHeight;
	var bodyW = document.body.offsetWidth;
	var vert = document.querySelector('.grid-vertical');
	var hor = document.querySelector('.grid-horizontal');

	if (document.querySelectorAll('.grid-vertical-item')) {
		var removes = document.querySelectorAll('.grid-vertical-item');

		for (var i = 0; i < removes.length; i++) {
			removes[i].remove();
		}
	}

	if (document.querySelectorAll('.grid-horizontal-item')) {
		var removes = document.querySelectorAll('.grid-horizontal-item');

		for (var i = 0; i < removes.length; i++) {
			removes[i].remove();
		}
	}

	for (var i = 0; i < bodyH / 2; i++) {
		var span = document.createElement('span');
		span.classList.add('grid-item');
		span.classList.add('grid-vertical-item');
		vert.appendChild(span);
	}

	for (var i = 0; i < bodyW / 2; i++) {
		var span = document.createElement('span');
		span.classList.add('grid-item');
		span.classList.add('grid-horizontal-item');
		hor.appendChild(span);
	}
}

pixels();

var video = document.querySelector('video');

video.currentTime = 20;



var muteBtn = document.querySelector('.sound');
var more = document.querySelector('.more');

more.onclick = function() {
	document.querySelector('body').classList.add('active');
}

muteBtn.onclick = function() {
	if (muteBtn.classList.contains('active')) {
		audio.volume = 1;
		muteBtn.classList.remove('active');
	} else {
		audio.volume = 0;
		muteBtn.classList.add('active');
	}
}

document.querySelector('.back').onclick = function() {
	document.querySelector('body').classList.remove('active');
}

var audio = document.querySelector('audio');
var loader = document.querySelector('.loader');


audio.currentTime = 42;

var time = 0;

var tickTime = 0;
var countFrom = 0;
var started = false;
var counting = false;

//$start: 32600;
//$between: 2100;
//$load1Start: 2200ms;
//$load2Start: 16500ms;

var between = 2300;
var startOne = 6200;
var startTwo = 18000;
var startThree = 34400;

var blockOne = document.querySelector('.load:not(.load2)');
var blockTwo = document.querySelector('.load2');
var blockThree = document.querySelector('.info');

var fromOne = 0;
var startedOne = false;

var fromTwo = 0;
var startedTwo = false;

var fromThree = 0;
var startedThree = false;

var lastVidChange = 0;

var ended = false;

var startBlur = 4700;

function tick(ms) {
	time = parseInt(ms);

	if (!counting && window.isReady && time > 3000) {
		counting = true;
		video.classList.add('active');
		video.play();
		audio.play();
		loader.classList.add('hide');
	}

	if (counting && countFrom == 0) {
		countFrom = time;
	}

	if (counting && !startedOne && time - countFrom >= startOne) {
		startedOne = true;
		fromOne = time;
	}

	if (counting && !startedTwo && time - countFrom >= startTwo) {
		startedTwo = true;
		fromTwo = time;
	}

	if (counting && !startedThree && time - countFrom >= startThree) {
		startedThree = true;
		fromThree = time;
	}

	if (counting && time - countFrom >= startBlur) {
		video.classList.add('blur');
	}

	if (startedOne) {
		var ourTime = time - fromOne;

		if (ourTime <= between) {
			blockOne.classList.add('active');
			blockOne.childNodes[1].classList.add('active');
		} else if (ourTime >= between && ourTime <= between * 2) {
			blockOne.classList.remove('active');
			blockOne.childNodes[1].classList.remove('active');
			blockOne.childNodes[3].classList.add('active');
			blockOne.childNodes[3].classList.add('blink');
		} else if (ourTime >= between * 2 && ourTime <= between * 3) {
			blockOne.classList.add('active');
			blockOne.childNodes[3].classList.remove('active');
			blockOne.childNodes[5].classList.add('active');
		} else {
			blockOne.classList.remove('active');
			blockOne.childNodes[5].classList.remove('active');
		}
	}

	if (startedTwo) {
		var ourTime2 = time - fromTwo;

		if (ourTime2 <= between) {
			blockTwo.classList.add('active');
			blockTwo.childNodes[1].classList.add('active');
		} else if (ourTime2 >= between && ourTime2 <= between * 2) {
			blockTwo.classList.remove('active');
			blockTwo.childNodes[1].classList.remove('active');
			blockTwo.childNodes[3].classList.add('active');
		} else if (ourTime2 >= between * 2 && ourTime2 <= between * 3) {
			blockTwo.classList.add('active');
			blockTwo.childNodes[3].classList.remove('active');
			blockTwo.childNodes[5].classList.add('active');
			blockTwo.childNodes[5].classList.add('blink');

			document.querySelector('.overlay').classList.add('yellow');
		} else {
			blockTwo.classList.remove('active');
			blockTwo.childNodes[5].classList.remove('active');
		}
	}

	if (startedThree) {
		var ourTime3 = time - fromThree;

		if (ourTime3 <= between) {
			blockThree.childNodes[1].classList.add('active');
		} else if (ourTime3 >= between && ourTime3 <= between * 2) {
			blockThree.childNodes[1].classList.remove('active');
			blockThree.childNodes[3].classList.add('active');

		} else if (ourTime3 >= between * 2 && ourTime3 <= between * 3) {
			blockThree.childNodes[3].classList.remove('active');
			blockThree.childNodes[5].classList.add('active');

		} else if (ourTime3 >= between * 3 && ourTime3 <= between * 4) {
			blockThree.childNodes[5].classList.remove('active');
			blockThree.childNodes[7].classList.add('active');

		} else if (ourTime3 >= between * 4 && ourTime3 <= between * 5) {
			blockThree.childNodes[7].classList.remove('active');
			blockThree.childNodes[9].classList.add('active');

		} else {
			blockThree.childNodes[9].classList.remove('active');
			more.classList.add('active');



			if (!ended) {
				video.classList.remove('active');
				loader.classList.add('rerun');

				var volume = 1;

				var int = setInterval(function () {
					volume -= .02;

					if (volume < .02) {
						volume = 0;
						clearInterval(int);
					}

					audio.volume = volume;
				}, 100);

				setTimeout(function () {
					video.pause();
				}, 3000);

				ended = true;
			}
		}
	}

	requestAnimationFrame(tick);
}

tick();

var body = document.querySelector('body');
var content = document.querySelector('.content');

var deactivatedTimer = 0;
var deactivated = false;

body.addEventListener('mousewheel', function(e) {
	if (deactivated) {
		return;
	}

	if (body.classList.contains('active')) {
		if (content.scrollTop == 0 && e.deltaY < -20) {
			body.classList.remove('active');

			clearTimeout(deactivatedTimer);

			deactivated = true;

			deactivatedTimer = setTimeout(function () {
				deactivated = false;
			}, 1000);
		}
	} else {
		if (e.deltaY > 20) {
			body.classList.add('active');

			clearTimeout(deactivatedTimer);

			deactivated = true;

			deactivatedTimer = setTimeout(function () {
				deactivated = false;
			}, 1000);
		}
	}
});
