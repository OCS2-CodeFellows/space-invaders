'use strict'
let shipCtx = document.querySelector('.spaceship-canvas').getContext('2d');

shipCtx.fillStyle = '#2424aa'
drawRect(0, 4, 11, 3);
drawRect(1, 3, 9, 1);
drawRect(4, 1, 3, 2);
drawPixel(5, 0);



function drawRect(x, y, width, height, color) {
  const xScaled = x * 5;
  const yscaled = y * 5;
  const widthScaled = width * 5;
  const heightScaled = height * 5;
  shipCtx.fillRect(xScaled, yscaled, widthScaled, heightScaled)
}
function drawPixel(x, y, color) {
  const xScaled = x * 5
  const yScaled = y * 5
  shipCtx.fillRect(xScaled, yScaled, 5, 5);
}




