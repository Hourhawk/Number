NcreateCanvas({'id':'canvas', 'fps':60, 'sprite-preload':'./img/', 'lapseColor':'#d6d6d6'});
var Ncanvas = NgetCanvas();

var character = {'name':'character', 'type':'sprite', 'color':'#fff', 'posx':Ncanvas.width/2, 'posy':Ncanvas.height/2, 'sizex':90, 'sizey':96, 'speed':5, 'series':'sprite', 'seriesType':'png', 'seriesCount':7, 'currentSeries':0};
var box = {'name':'box', 'type':'box', 'color':'rgb(119, 90, 55, 0.5)', 'posx':Math.random()*Ncanvas.width, 'posy':Math.random()*Ncanvas.height, 'sizex':150, 'sizey': 150};

NdefineObj(box);

NgameLoop({'logFrame':false}, function() {
	NdefineObj(character);
	var keyMap = NgetKeyMap();
	var difx = 0, dify = 0;
	if(keyMap[83] == true) {
		dify += 1;
	}
	if(keyMap[87] == true) {
		dify -= 1;
	}
	if(keyMap[68] == true) {
		difx += 1;
	}
	if(keyMap[65] == true) {
		difx -= 1;
	}
	var ghostCharacter = NcloneObj(character);
	if(difx != 0) {
		ghostCharacter['posx'] += difx*character['speed'];
	}
	if(dify != 0) {
		ghostCharacter['posy'] += dify*character['speed'];
	}
	if(NisOffScreen(ghostCharacter)) {
		character['posx'] += difx*character['speed'];
		character['posy'] += dify*character['speed'];
	}
	if(NgetObj(box) == null) {
		box['posx'] = Math.random()*Ncanvas.width;
		box['posy'] = Math.random()*Ncanvas.height;
		NdefineObj(box);
	}
}, function() {
	NloadSpriteSeries(character);
	NspriteLoop(character, {'framesForChange':120});
});
var canLaser = true;
NkeyDown(function() {
	var laserKeyMap = NgetKeyMap();
	if(laserKeyMap[69] == true && canLaser) {
		canLaser = false;
		var laser = {'name':'laser' + Math.random()*500, 'type':'box', 'color':'rgba(119, 59, 55, 0.5)', 'posx':character['posx']+80, 'posy':character['posy']+character['sizey']/2, 'sizex':30, 'sizey':10};
		var myInterval = setInterval(function() {
			NdefineObj(laser);
			laser['posx']++;
			if(!NisOffScreen(laser)) {
				NdelObj(laser);
				window.clearInterval(myInterval);
			}
			if(NisCollided(laser, NgetObj(box))) {
				NdelObj(laser);
				NdelObj(box);
				window.clearInterval(myInterval);
			}
		}, 2);
		setTimeout(function() {
			canLaser = true;
		}, 2000);
	}
});
NkeyUp(function() {});