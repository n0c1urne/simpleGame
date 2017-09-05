let Vector = require('../lib/Vector.js')

let canvas = document.getElementById('mycanvas')
let ctx = canvas.getContext('2d')

var HOST = location.origin.replace(/^http/, 'ws')
var connection = new WebSocket(HOST + '/ws');


connection.onmessage = function (message) {
  // Zeichenfläche löschen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // TODO Message enthält Positionen der Spieler
  // Zeichnen
  // Beispiel (o ist ein Vektor)
  // ctx.fillRect(o.pos.x, o.pos.y, 10, 10);
  
};

connection.onopen = function () {
  console.log("Connection established");
};

document.addEventListener('keydown', function (e) {
  switch (e.which) {
    case 37: // left
      // TODO Nachricht an Server senden
      break;
    case 39: // right
      // TODO Nachricht an Server senden
      break;
    default: return;
  }
  e.preventDefault();
});