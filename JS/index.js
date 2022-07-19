// Game constants
let inputDir={x:0,y:0};
const foodSound=new Audio('song/food.wav');
const gameOverSound=new Audio('song/gameover.wav');
const moveSound=new Audio('song/move.wav');
const musicSound=new Audio('song/music.wav');
let speed=15;
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}
]
let food={x:6,y:7};
let score=0;

// functions of the game 
function main(ctime){
    musicSound.play();
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

}
function isCollide(snake) {
    // collide with its body
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // collide with wall
        if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y<=0){
            return true
        }
}
        
function gameEngine(){
    //update of everything
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press Any key to play again");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score+=1;
        if(score>HighScore){
            hiscoreval=score
            localStorage.setItem("HighScore", JSON.stringify(hiscoreval))
            highScoreBox.innerHTML="HighScore: "+hiscoreval;
        }
        scoreBox.innerHTML="Score:  "+score;
        snakeArr.unshift({x: snakeArr[0].x+ inputDir.x, y: snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};
    }

    //Moving the snake
    for (let i = snakeArr.length-2; i>=0;i--) {
        const element = snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]};
        
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    // display for snake
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the Food 
   
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}

// main Function 
let HighScore=localStorage.getItem("HighScore");
if(HighScore === null){
    hiscoreval=0;
    localStorage.setItem("HighScore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(HighScore);
    highScoreBox.innerHTML="HighScore: "+HighScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir={x:0,y:1} // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
         case "ArrowDown":
          console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
        console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
});