var game = new JSGame();
game.debug.enabled = true;

var fingers = [];

for(var i = 0; i < 10; i++){
    fingers.push(game.add(new ParticleSystem({
        count: 20,
        speed: {
            x: 5,
            y: 5
        },
        color: {
            r: 255,
            g: 255,
            b: 255,
        },
        glow: true,
        life: 30,
        radius: 0,
        visible: false,
        position: {
            x: -10,
            y: -10
        },
    })));
}

for(var i = 0; i < fingers.length; i++){
    fingers[i].target = {
        x: -10,
        y: -10
    };
}


setInterval(function(){
    for(var i = 0; i < fingers.length; i++){
        if(fingers[i].radius === 0){
            fingers[i].position.x += game.lerp(fingers[i].position.x, fingers[i].target.x, game.deltaTime / 60);
            fingers[i].position.y += game.lerp(fingers[i].position.y, fingers[i].target.y, game.deltaTime / 60);
        }
        if(fingers[i].position.x < 0 && fingers[i].position.x > game.width + fingers[i].width && 
           fingers[i].position.y < 0 && fingers[i].position.y > game.height + fingers[i].height &&
           fingers[i].target.x < 0 && fingers[i].target.y < 0){
            fingers[i].visible = false;
        }
    }
});

game.canvas.addEventListener('touchstart', function(e){
    e.preventDefault();
    var touchobj = e.changedTouches;
    for(var i = 0; i < touchobj.length; i++){
        fingers[i].position.x = touchobj[i].clientX - 50;
        fingers[i].position.y = touchobj[i].clientY - 100;
        /*
        fingers[i].target = {
            x: fingers[i].position.x,
            y: fingers[i].position.y
        };*/
        fingers[i].color = {
            r: Math.floor(Math.random() * 255 - 32) + 32,
            g: Math.floor(Math.random() * 255 - 32) + 32,
            b: Math.floor(Math.random() * 255 - 32) + 32,
        },
        fingers[i].visible = true,
        fingers[i].radius = 50;
    }
}, false)
 
game.canvas.addEventListener('touchmove', function(e){
    e.preventDefault();
    var touchobj = e.changedTouches;
    for(var i = 0; i < touchobj.length; i++){
        fingers[i].position.x = touchobj[i].clientX - 50;
        fingers[i].position.y = touchobj[i].clientY - 100;
    }
}, false)
 
game.canvas.addEventListener('touchend', function(e){
    e.preventDefault();
    var touchobj = e.changedTouches;
    for(var i = 0; i < touchobj.length; i++){
        fingers[i].radius = 0;
        fingers[i].target.x = -10;
        fingers[i].target.y = -10;
    }
}, false)