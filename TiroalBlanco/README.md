Este es un pequeño juego de tiro al blanco utilizando canvas en HTML y javascript. 

El tiempo definido en código es de 10 segundos por partida y la puntuación se establece con base en qué tan certero sea el clic en la diana que se crea de manera aleatoria dentro del área del canvas. 

Para el cálculo de la puntuación se utiliza la distancia entre dos puntos en el plano cartesiano cuya fórmula es la siguiente: 

![Formula](https://www.geometriaanalitica.info/wp-content/uploads/2020/09/geometria-formula-distancia-entre-dos-puntos.png)

En caso de requerir mayor explicación pueden verlo [aquí](https://www.cecyt3.ipn.mx/ibiblioteca/mundodelasmatematicas/DistanciaEntreDosPuntos.html)

La formula implementada podemos verla en el siguiente fragmento de código:

```JavaScript

score = score + (((radius + 20) - (Math.round(Math.sqrt( Math.pow((x-randomX),2)+ Math.pow((y-randomY),2) ))))*10)

```

Una demostración del programa en funcionamiento se puede ver en el [video](/Tiro%20al%20blanco%20.mp4)