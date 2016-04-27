# JS Game

JS Game is a 2D game engine written in JavaScript.
It provides built-in objects and functions, to make it easier to write HTML5 games.

JS Game works by providing a main class (JSGame), a GameObject class, and an InputManager class.
Every other graphics class is derrived from GameObject.

Every GameObject is a "child" of JSGame. Each frame, JSGame loops through each of its children, and runs their _tick() function, and then their _render() function.

_tick() and _render() is passed the JSGame instance, and can use it's methods and properties.

JSGame can be passed a options object on construction, it isn't required though. If a canvas object is not provided, JSGame will create a new canvas, and append it to the document body.

## *class* ***JSGame***
Options for JSGame:

* **autoResize**, *(*default:* **true**)*
* **canvas**, *(*default:* **new HTMLCanvasElement**)*
* **debug**
	* **enabled**, *(*default:* **false**)*
	* **font**, *(*default:* **"Arial"**)*
	* **fontsize**, *(*default:* **16**)*
	* **color**, *(*default:* **"#f00"**)*
* **fpsAccuracy**, *(*default:* **10**)*
* **fpsSampleTime**, *(*default:* **100**)*
* **height**, *(*default:* **window.innerHeight**)*
* **preserveContent**, *(*default:* **false**)*
* **width**, *(*default:* **window.innerWidth**)*

Properties in JSGame:

* **children** *(child objects)*
* **deltaTime** *(time since last rendered frame in ms)*
* **fps** *(current framerate)*
* **height** *(current height)* 
* **width** *(current width)*

Methods in JSGame:

* ***lerp**(number **origin**, number **target**, number **time**)* ***returns*** *number*

## *class* ***GameObject***
Options for GameObject:

* **alpha**, *(*default:* **1.0**)*
* **height**, *(*default:* **0**)*
* **position**
	* **x**, *(*default:* **0**)*
	* **y**, *(*default:* **0**)*
* **shadow**
	* **enabled**, *(*default:* **false**)*
	* **color** *(*default:* **"#000"**)*
	* **x** *(*default:* **0**)*
	* **y** *(*default:* **0**)*
	* **blur** *(*default:* **0**)*
* **render**, *(*default:* **true**)*
* **rotation**, *(*default:* **0.0**)*
* **visible**, *(*default:* **true**)*
* **width**, *(*default:* **0**)*
* **_render**, *(*default:* **function(){return;}**)*
* **_tick**, *(*default:* **function(){return;}**)*

Properties in JSGame:

* **alpha** *(objects transparency)*
* **height** *(objects height)*
* **position** *(position object)*
* **shadow** *(shadow object)* 
* **render** *(should this object be rendered)*
* **rotation** *(rotation of object in degrees)*
* **visible** *(is the object visible. If false, only _tick() will be called during render)*
* **width** *(objects width)*

Methods in JSGame:

* ***_render**(JSGame)*
* ***_tick**(JSGame)*
