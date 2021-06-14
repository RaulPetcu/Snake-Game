const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// cream unitatea de masura
const box = 32;

// incarcam imaginile
const ground = new Image();
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio
const dead = new Audio();
const eat = new Audio();
const down = new Audio();
const up = new Audio();
const right = new Audio();
const left = new Audio();

dead.src = "audio/dead.wav";
eat.src="audio/eat.mp3";
left.src="audio/left-right.mp3"
right.src="audio/left-right.mp3"
up.src="audio/up-down.mp3";
down.src="audio/up-down.mp3";

// cream sarpele
let snake = [];
snake[0]={ // head
    x : 9*box,
    y : 10*box
}

// creez mancarea
let food = {
    x : Math.floor(Math.random()*17 + 1) * box,
    y : Math.floor(Math.random()*15 + 3) * box
}

// cream scorul
let score = 0;

// controlam sarpele
document.addEventListener("keydown", direction);
let d;
function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";        
        right.play();
    }else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";        
        down.play();
    }
}

// check collision function 
function collision(head, array){
    for(let i=0; i<array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// desenam pe canvas
function draw(){
    ctx.drawImage(ground, 0, 0);

    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food. y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // ce directie
    if( d == "LEFT" ) snakeX -= box;
    if( d == "UP" ) snakeY -= box;
    if( d == "RIGHT" ) snakeX += box;
    if( d == "DOWN" ) snakeY += box;

    // if the snakes eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;        
        eat.play();
        // new food
        food = {
            x : Math.floor(Math.random()*17 + 1) * box,
            y : Math.floor(Math.random()*15 + 3) * box
        }
    }
    else{
        // remove the tail
        snake.pop();
    }

   // add new head
   let newHead = {
    x : snakeX, 
    y : snakeY
    }
    // game over
    if( snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box
        || collision(newHead,snake) ){            
        clearInterval(game); // nu mai deseneaza
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa One";
    ctx.fillText(score, 2*box, 1.6*box);
}

// apelam draw() la fiecare 100 ms
let game = setInterval(draw, 100);
