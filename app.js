var daysHolder = document.querySelector('.days__holder');
var hoursHolder = document.querySelector('.hours__holder');
var minutesHolder = document.querySelector('.minutes__holder');
var secondsHolder = document.querySelector('.seconds__holder');
var video = document.querySelector('video');

video.currentTime = 20;

function setTime() {
	var startDate = new Date();
	var endDate   = new Date('2017-11-17T10:10:00.000Z');
	var delta = (endDate.getTime() - startDate.getTime()) / 1000;

	var days = Math.floor(delta / 86400);
	delta -= days * 86400;

	// calculate (and subtract) whole hours
	var hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;

	// calculate (and subtract) whole minutes
	var minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;

	// what's left is seconds
	var seconds = Math.round(delta % 60);

	var time = days + ' days, ' + hours + 'hours, ' + minutes + ' minutes, ' + Math.round(seconds) + 'seconds';

	daysHolder.innerHTML = days;
	hoursHolder.innerHTML = hours;
	minutesHolder.innerHTML = minutes;
	secondsHolder.innerHTML = seconds;
}

var audio = document.querySelector('audio');

setTime();

setInterval(function () {
	setTime();
	console.log(audio.currentTime);
}, 1000);

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

document.querySelector('.more').onclick = function() {
	document.querySelector('body').classList.add('active');
}

document.querySelector('.back').onclick = function() {
	document.querySelector('body').classList.remove('active');
}
