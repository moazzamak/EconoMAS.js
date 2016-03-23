var _frameX = 800;
var _frameY = 600;
var _sX;
var _sY;
var _pop;
var _objArr = [];
var _sortedArray = [];
var _honestyMin;
var _maxConnect;
var _count;
var _increment;

	function setup(){
		createCanvas(_frameX, _frameY);
		createPopulation(500, 10, 10, 25, 0.8, 10, 0.01);
		_count = 0;
	}

	function draw(){
		background (125);

		updatePopulation();
		fill(0, 102, 153);
		textSize(32);
		text(_count, _frameX - 100, _frameY - 50);
		_count++;
	}

	function createPopulation(pop, sX, sY, defVal, honestyMin, maxConnect, increment){
		_sX = sX;
		_sY = sY;
		_pop = pop;
		_honestyMin = honestyMin;
		_maxConnect = maxConnect;
		_increment = increment;

		for (var i = 0; i < _pop; i++){
			var tempObj = {
				objID: i,
				objVal: defVal,
				objHonesty: random(_honestyMin, 0.999),
				objTrade: function(i){
					if ( this.objHonesty < random() ){
						// Cheat
						print ("Object " + this.objID + " cheated " + i);
						_objArr[i].swindled();
						this.traded();
					}
				},
				swindled: function(){
					this.objVal = this.objVal - _increment;
				},
				traded: function(){
					this.objVal = this.objVal + _increment;
				}
			};

			_objArr.push(tempObj);
		}
	}

	function updatePopulation(){
		_sortedArray = _objArr.slice();
		_sortedArray = _sortedArray.sort(compareObjs);

		for (var i = 0; i < _pop; i++){
			rX = (_sortedArray[0].objVal - _objArr[i].objVal) / _sortedArray[0].objVal;
			rY = i/_pop;

			for (var n = 0; n < 1 + floor(rX*_maxConnect); n++) {
				_objArr[ _sortedArray[i].objID ].objTrade( _sortedArray[ floor( random(i, _pop-1) ) ].objID );
			}
			fill(color(_objArr[i].objHonesty*255, 0, 0));
			noStroke();
			ellipse(rX * _frameX, rY * _frameY, _sX, _sY);

		}
	}

	function compareObjs(a, b){
		return b.objVal - a.objVal;
	}
