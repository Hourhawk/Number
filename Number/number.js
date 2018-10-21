let canvas, context, sprite_preload, fps, lapseColor, objects = {}, frame = 0;
function Nwarn($msg) {
	console.log('[WARNING]: ' + $msg);
}
function Ndefault($msg) {
	console.log('[DEFAULT]: ' + $msg);
}
function Nerror($msg) {
	console.log('[ERROR]: ' + $msg);
}
let keyMap = {};
function NgetKeyMap() {
	return keyMap;
}
function NkeyDown($func) {
	document.onkeydown = function(event) {
		event = event || window.event;
		keyMap[event.keyCode] = true;
		$func();
	}
}
function NkeyUp($func) {
	document.onkeyup = function(event) {
		event = event || window.event;
		keyMap[event.keyCode] = false;
		$func();
	}
}
let loadedSprites = {};
function NloadSpriteSeries($object) {
	if($object != null) {
		if($object['type'] == 'sprite') {
			if($object['series'] != null) {
				if($object['seriesCount'] != null) {
					for(var i = 0; i < $object['seriesCount']; i++) {
						document.getElementsByTagName('head')[0].innerHTML += '<img src="' + sprite_preload + $object['series'] + i + '.' + $object['seriesType'] + '" id="' + $object['series'] + i + '" style="display: none;">';
					}
					for(var i = 0; i < $object['seriesCount']; i++) {
						loadedSprites[$object['series'] + i] = document.getElementById($object['series'] + i);
					}
				} else {
					Nerror('NloadSpriteSeries => OBJECT -> seriesCount <- is undefined.');
				}
			} else {
				Nerror('NloadSpriteSeries => OBJECT -> series <- is undefined.');
			}
		} else {
			Nerror('NloadSpriteSeries => OBJECT -> type <- is not a sprite.');
		}
	} else {
		Nerror('NloadSpriteSeries => OBJECT is undefined.');
	}
}
function NcreateCanvas($options) {
	canvas = document.getElementById($options['id']);
	if(canvas == null) {
		Nwarn('NcreateCanvas => CANVAS is undefined.');
		return;
	}
	if($options['fps'] == null) {
		Nerror('NcreateCanvas => OPTIONS -> fps <- is undefined.');
		return;
	}
	if($options['sprite-preload'] == null) {
		Nerror('NcreateCanvas => OPTIONS -> sprite-preload <- is undefined.');
		return;
	}
	sprite_preload = $options['sprite-preload'];

	fps = $options['fps'];
	context = canvas.getContext('2d');
	if($options['width'] != null && $options['height'] != null) {
		canvas.width = $options['width'];
		canvas.height = $options['height'];
	} else {
		Nwarn('NcreateCanvas => OPTIONS -> width <- or -> height <- is undefined.');
		Ndefault('NcreateCanvas => OPTIONS setting -> width <- and -> height <- to window width and window height.');
		canvas.width = $(window).width();
		canvas.height = $(window).height();
	}
	if($options['lapseColor'] != null) {
		lapseColor = $options['lapseColor'];
		context.fillStyle = lapseColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
	} else {
		Nwarn('NcreateCanvas => OPTIONS -> lapseColor <- is undefined.');
		Ndefault('NcreateCanvas => OPTIONS setting -> lapseColor <- to #eee.');
		lapseColor = '#eee';
		context.fillStyle = lapseColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
	}
}
function NdefineObj($object) {
	if($object['name'] != null) {
		if($object['type'] != null) {
			if($object['type'] == 'sprite') {
				if($object['series'] == null) {
					Nerror('NdefineObj => OBJECT -> series <- is undefined.');
					return;
				}
				if($object['seriesType'] == null) {
					Nerror('NdefineObj => OBJECT -> seriesType <- is undefined.');
					return;
				}
				if($object['seriesCount'] == null) {
					Nerror('NdefineObj => OBJECT -> seriesCount <- is undefined.');
					return;
				}
				if($object['currentSeries'] == null) {
					Nerror('NdefineObj => OBJECT -> currentSeries <- is undefined.');
					return;
				}
				Ndefault('NdefineObj => OBJECT setting -> color <- to rgba(0,0,0,0).');
				$object['color'] = 'rgba(0,0,0,0)';
				context.fillStyle = $object['color'];
				if($object['posx'] == null || $object['posy'] == null) {
					Nwarn('NdefineObj => OBJECT -> posx <- or -> posy <- is undefined.');
					Ndefault('NdefineObj => OBJECT setting -> posx <- and -> posy <- to 0.');
					$object['posx'] = 0;
					$object['posy'] = 0;
				}
				if($object['sizex'] == null || $object['sizey'] == null) {
					Nwarn('NdefineObj => OBJECT -> sizex <- or -> sizey <- is undefined.');
					Ndefault('NdefineObj => OBJECT setting -> sizex <- and -> sizey <- to canvas width and canvas height.');
					$object['sizex'] = canvas.width;
					$object['sizey'] = canvas.height;
				}
			} else {
				if($object['color'] != null) {
					context.fillStyle = $object['color'];
				} else {
					Nwarn('NdefineObj => OBJECT -> color <- is undefined.');
					Ndefault('NdefineObj => OBJECT setting -> color <- to #000.');
					$object['color'] = '#000';
					context.fillStyle = $object['color'];
				}
				if($object['posx'] == null || $object['posy'] == null) {
					Nwarn('NdefineObj => OBJECT -> posx <- or -> posy <- is undefined.');
					Ndefault('NdefineObj => OBJECT setting -> posx <- and -> posy <- to 0.');
					$object['posx'] = 0;
					$object['posy'] = 0;
				}
				if($object['sizex'] == null || $object['sizey'] == null) {
					Nwarn('NdefineObj => OBJECT -> sizex <- or -> sizey <- is undefined.');
					Ndefault('NdefineObj => OBJECT setting -> sizex <- and -> sizey <- to canvas width and canvas height.');
					$object['sizex'] = canvas.width;
					$object['sizey'] = canvas.height;
				}
			}
		} else {
			Nerror('NdefineObj => OBJECT -> type <- is undefined.');
			return;
		}
		objects[$object['name']] = $object;
	} else {
		Nerror('NdefineObj => OBJECT -> name <- is undefined.');
	}
}
function NdelObj($object) {
	if($object['name'] != null) {
		if(objects[$object['name']] != null) {
			objects[$object['name']] = null;
		} else {
			Nwarn('NdelObj => OBJECT -> name <- was not found.');
		}
	} else {
		Nerror('NdelObj => OBJECT -> name <- is undefined.');
	}
}
function NgetObj($object) {
	if($object['name'] != null) {
		return objects[$object['name']];
	} else {
		Nerror('NgetObj => OBJECT -> name <- is undefined.');
	}
}
function NisCollided($object1, $object2) {
	if($object1 == null || $object2 == null)
		return false
	if($object1['posx'] + $object1['sizex'] <= $object2['posx'])
		return false;
	if($object1['posx'] >= $object2['posx'] + $object2['sizex'])
		return false;
	if($object1['posy'] + $object1['sizey'] <= $object2['posy'])
		return false;
	if($object1['posy'] >= $object2['posy'] + $object2['sizey'])
		return false;
	return true;
}
function NisOffScreen($object) {
	if($object == null)
		return false
	if($object['posx'] + $object['sizex'] <= $object['sizex'])
		return false;
	if($object['posx'] >= canvas.width - $object['sizex'])
		return false;
	if($object['posy'] + $object['sizey'] <= $object['sizey'])
		return false;
	if($object['posy'] >= canvas.height - $object['sizey'])
		return false;
	return true;
}
function NcloneObj($object) {
	return Object.assign({}, $object);
}
function NgetCanvas() {
	return canvas;
}
var spritesLoaded = false;
window.onload = function() {
	spritesLoaded = true;
}
function NspriteLoop($object, $options) {
	if($object != null) {
		if($options != null) {
			if($options['framesForChange'] != null) {
				if($object['type'] == 'sprite') {
					var trackedFrame = 0;
					setInterval(function() {
						trackedFrame++;
						if(trackedFrame >= $options['framesForChange']) {
							trackedFrame = 0;
							var spriteObj = NgetObj($object); 
							spriteObj['currentSeries']++;
							if(character['currentSeries'] >= character['seriesCount']) {
								character['currentSeries'] = 0;
							}
						}
					}, 1000/fps);
				} else {
					Nerror('NspriteLoop => OBJECT -> type <- is undefined.');
				}
			} else {
				Nerror('NspriteLoop => OPTIONS -> framesForChange <- is undefined.');
			}
		} else {
			Nerror('NspriteLoop => OPTIONS is undefined.');
		}	
	} else {
		Nerror('NspriteLoop => OBJECT is undefined.');
	}
}
function NgameLoop($options, $loop, $pre) {
	if($options['logFrame'] == null) {
		Nerror('-> logFrame <- wasn\'t defined in the Game Loop.');
		return;
	}
	$pre();
	setInterval(function() {
		frame++;
		if($options['logFrame']) {
			console.log('[FRAME]: ' + frame);
		}
		// Base //
		canvas.width = $(window).width();
		canvas.height = $(window).height();		
		context.fillStyle = lapseColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		// Base //
		// Draw Frame //
		for(var obj in objects) {
			if(objects[obj] != null) {
				context.fillStyle = objects[obj]['color'];
				if(objects[obj]['type'] == 'box') {
					context.fillRect(objects[obj]['posx'], objects[obj]['posy'], objects[obj]['sizex'], objects[obj]['sizey']);
				}
				if(objects[obj]['type'] == 'circle') {
					//context.fillRect(objects[obj]['posx'], objects[obj]['posy'], objects[obj]['sizex'], objects[obj]['sizey']);
					context.beginPath();
					var radius = objects[obj]['sizex']/2;
			        context.arc(objects[obj]['posx']+objects[obj]['sizex']/2, objects[obj]['posy']+objects[obj]['sizey']/2, radius, 0, 2 * Math.PI, false);
			        context.fill();
			        context.closePath();
			        // context.fillStyle = "#FF0000";
			        // context.fillRect(objects[obj]['posx'], objects[obj]['posy'], objects[obj]['sizex'], objects[obj]['sizey']);
				}
				if(objects[obj]['type'] == 'sprite' && spritesLoaded) {
					context.drawImage(loadedSprites[objects[obj]['series'] + objects[obj]['currentSeries']], objects[obj]['posx'], objects[obj]['posy']);
				}
			}	
		}
		// Draw Frame //
		// $loop //
		$loop();
		// $loop //
		if(frame >= fps) {
			frame = 0;
		}
	}, 1000/fps);
}