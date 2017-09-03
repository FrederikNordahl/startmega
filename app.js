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

document.querySelector('.more').onclick = function() {
	document.querySelector('body').classList.add('active');
}

document.querySelector('.back').onclick = function() {
	document.querySelector('body').classList.remove('active');
}

var audio = document.querySelector('audio');
var loader = document.querySelector('.loader');


var time = 0;

var tickTime = 0;
var countFrom = 0;
var started = false;
var counting = false;

//$start: 32600;
//$between: 2100;
//$load1Start: 2200ms;
//$load2Start: 16500ms;

var between = 2100;
var startOne = 2200;

var blockOne = document.querySelector('.load:not(.load2)');
var blockTwo = document.querySelector('.load2');

var fromOne = 0;
var startedOne = false;

var fromTwo = 0;
var startedTwo = false;

console.log(blockTwo);

function tick(ms) {
	time = parseInt(ms);

	if (counting && countFrom == 0) {
		countFrom = time;
	}

	if (counting && !startedOne && time - countFrom >= startOne) {
		startedOne = true;
		fromOne = time;
	}

	if (startedOne) {
		ourTime = time - fromOne;


		if (ourTime <= between) {
			blockOne.classList.add('active');
			blockOne.childNodes[1].classList.add('active');
		} else if (ourTime >= between && ourTime <= between * 2) {
			blockOne.classList.remove('active');
			blockOne.childNodes[1].classList.remove('active');
			blockOne.childNodes[3].classList.add('active');
		} else if (ourTime >= between * 2 && ourTime <= between * 3) {
			blockOne.classList.add('active');
			blockOne.childNodes[3].classList.remove('active');
			blockOne.childNodes[5].classList.add('active');
		} else {
			blockOne.classList.remove('active');
			blockOne.childNodes[5].classList.remove('active');
		}
	}

	requestAnimationFrame(tick);
}

tick();

setTimeout(function () {
	counting = true;
	video.classList.add('active');
	video.play();
	audio.play();
	loader.classList.add('hide');
}, 3000);

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
