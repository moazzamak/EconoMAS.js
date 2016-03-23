var _frameX = 800;
var _frameY = 600;
var _sX;
var _sY;
var _pop;

	function setup(){
		createCanvas(_frameX, _frameY);
		createPopulation(1000, 10, 10);
	}

	function draw(){
		background (125);

		updatePopulation();
	}

	function createPopulation(pop, sX, sY){
		_sX = sX;
		_sY = sY;
		_pop = pop;
	}

	function updatePopulation(){
		for (var n = 0; n < _pop; n++){
			rX = random(_frameX/_sX);
			rY = random(_frameY/_sY);
			ellipse(rX * _sX, rY * _sY, _sX, _sY);
		}

	}
