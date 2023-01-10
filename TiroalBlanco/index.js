let screen = document.querySelector("canvas");
let pencil = screen.getContext("2d");
pencil.fillStyle = "lightgrey";
pencil.fillRect(0,0,1000,600);

let radius = 20;
let randomX;
let randomY;
let score = 0;
let remainingTime = 0;
let beginGame = document.getElementById("beginGame");
let lbScore = document.getElementById("score");
let lbTime = document.getElementById("remainingTime");
let divCanva = document.getElementById("divCanva");
let highScore = document.getElementById("highscore");
let isGameOver = false;
screen.onclick = shoot;

/**
 * Crea la figura geométrica del circulo
 * @param {int} x 
 * @param {int} y 
 * @param {int} radius 
 * @param {color} color 
 */
function createCircle(x,y,radius,color){
    pencil.fillStyle = color;
    pencil.beginPath();
    pencil.arc(x,y,radius,0,(2*Math.PI));
    pencil.fill();
}

/**
 * Limpia el canva volviendo a definirlo desde cero
 */
function clearScreen(){
    pencil.clearRect(0,0,1000,600);
    pencil.fillStyle = "lightgrey";
    pencil.fillRect(0,0,1000,600);
}

/**
 * Crea la diana en una ubicación x,y dada
 * @param {int} x 
 * @param {int} y 
 */
function createTarget(x,y){
    createCircle(x,y,radius + 20,"red");
    createCircle(x,y,radius + 10,"white");
    createCircle(x,y,radius - 5,"red");
}

/**
 * Se encarga de generar un número aleatorio de 0 al max proporcionado
 * @param {int} max 
 * @returns {int}
 */
function randomizePosition(max){
    return Math.floor(Math.random() * max);
}

/**
 * En esta función se realiza la principal carga del programa, pues se encarga de actualizar la pantalla, además de validar si el juego sigue y de ir mostrando el tiempo restante, así como el score actual
 */
function updateScreen(){
    
    if (remainingTime === 0){
        isGameOver = true;
    }

    /**
     * Se valida el estado del juego, en caso de terminar el tiempo se muestra un prompt y se valida si el score actual es superior al score obtenido anteriormente
     */
    if (isGameOver){
        clearScreen();
        alert("Se terminó el tiempo.");

        if (highScore.value === undefined){
            highScore.innerHTML = score;
            highScore.value = score;
        }else if (highScore.value<=score){
            highScore.innerHTML = score;
            highScore.value = score;
        }
    /**
     * En caso de que el juego NO haya terminado, se genera una nueva diana cada segundo en un punto aleatorio, disminuyendo el tiempo y mostrandolo en el label correspondiente
     */
    }else{
        clearScreen();
        randomX = randomizePosition(1000);
        randomY = randomizePosition(600);
        createTarget(randomX,randomY);
        remainingTime = remainingTime - 1;
        lbTime.innerHTML = remainingTime
        setTimeout(() => {
            updateScreen();
        }, 1000);
    }
    
}

/**
 * Captura la posición del clic en la pantalla y evalua si dio o no dentro del blanco
 * @param {event} event 
 */
function shoot(event){
    var x = event.pageX - screen.offsetLeft;
    var y = event.pageY - screen.offsetTop;

    if ((x < randomX + (radius + 20)) && 
        (x > randomX - (radius + 20)) &&
        (y < randomY + (radius + 20)) &&
        (y > randomY - (radius + 20)) ) 
    /**
     * Utilizando la formula de distancia entre dos puntos en el plano, obtiene la distancia entre el centro y el clic para calcular la puntuación obtenida. Mientras más cerca, más puntos se obtienen
     */
    {
        score = score + (((radius + 20) - (Math.round(Math.sqrt( Math.pow((x-randomX),2)+ Math.pow((y-randomY),2) ))))*10)
        lbScore.innerHTML = score;
    }
}

/**
 * Reinicia todas las variables del juego a su valor inicial, salvo por la puntación más alta
 */
function restartGame(){
    divCanva.innerHTML = '<canvas width="1000" height="600"></canvas>';
    screen = document.querySelector("canvas");
    pencil = screen.getContext("2d");
    pencil.fillStyle = "lightgrey";
    pencil.fillRect(0,0,1000,600);
    score = 0;
    isGameOver = false;
    screen.onclick = shoot;
    lbScore.innerHTML = score;
}

/**
 * Clic que inicia todos los eventos del juego.
 */
beginGame.addEventListener("click",function e(){
    if(isGameOver){
        restartGame();
    }
    remainingTime = 10;
    updateScreen();
});
