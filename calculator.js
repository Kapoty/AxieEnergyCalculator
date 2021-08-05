var round, energy, energyVariation, _history;
var roundEl = document.getElementById("round");
var energyEl = document.getElementById("energy");
var energyVariationEl = document.getElementById("energyVariation");
var historyEl = document.getElementById("history");
var calculator = document.getElementById("calculator");
var ad = document.getElementById("ad");
var ad_cookie = getCookie("ad");
var adfly = "https://fumacrom.com/1ZhTW";

function _clear(next) {
	round = 1;
	energy = 3;
	energyVariation = 0;
	_history = [];
	energyEl.value = energy;
	energyVariationEl.value = energyVariation;
	roundEl.innerHTML = "Round " + round;
	generateHistory();
	if (next) gtag('event', 'New Match', {
      'event_category': 'Match',
      'event_label': 'New Match'
    });
}

function usedEnergy() {
	energyVariation--;
	energyVariationEl.value = energyVariation;
}

function generatedEnergy() {
	energyVariation++;
	energyVariationEl.value = energyVariation;
}


function endOfTheRound() {
	round++;
	energy = parseInt(energyEl.value);
	_history.push({energy: energy, energyVariation: energyVariation});
	energy = energy + energyVariation + 2;
	energyVariation = 0;
	energyEl.value = energy;
	energyVariationEl.value = energyVariation;
	roundEl.innerHTML = "Round " + round;
	generateHistory();
}

function generateHistory() {
	historyEl.value = "";
	_history.forEach((h, i) => {
		historyEl.value += `Round ${i+1} - Had ${h.energy} Used/Generated ${h.energyVariation} Has ${h.energy +  h.energyVariation + 2}\n`;
	});
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function checkAd() {
	if (ad_cookie == "2") return;
	if (ad_cookie == "1" && getParameterByName('unlock')=="true") {
		gtag('event', 'Unlocked', {
	      'event_category': 'Unlock',
	      'event_label': 'Unlocked'
	    });
		setCookie("ad", "2", new Date(new Date().getTime() + 24*60*60000));
		window.location.href = "./";
	} else {
		calculator.style.display = "none";
		ad.style.display = "block";
	}
}

function openAd() {
	gtag('event', 'Open Ad', {
	      'event_category': 'Unlock',
	      'event_label': 'Open Ad'
	    });
	setCookie("ad", "1", new Date(new Date().getTime() + 2*60000));
	window.location.href = adfly;
}

_clear(false);
checkAd();

