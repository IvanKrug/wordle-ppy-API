let url = 'https://random-word-api.herokuapp.com/word?length=5&lang=es'
let PALABRA;

fetch(url) 
.then((res) => res.json())
.then((res) => { 
  PALABRA = res[0].toUpperCase();
  console.log(PALABRA);
})

let cantIntentos = 6;
document.getElementById("attempts-remaining").innerText = `Intentos restantes: ${cantIntentos}`;

const BUTTON = document.getElementById("guess-button");
const GRID = document.getElementById("grid");

BUTTON.addEventListener("click", () => {
  const INTENTO = leerIntento();
  if (INTENTO.length < 5) {
    terminar("<h2>La palabra debe contener 5 letras</h2>");
  } else {
    console.log(PALABRA);
    let row = document.createElement("div");
    row.className = "row";
    for (let i in PALABRA) {
      if (PALABRA[i] === INTENTO[i]) {
        let cuadroLetra = armarLetra(INTENTO[i], "green");
        row.appendChild(cuadroLetra);
      } else if (PALABRA.includes(INTENTO[i])) {
        let cuadroLetra = armarLetra(INTENTO[i], "yellow");
        row.appendChild(cuadroLetra);
      } else {
        let cuadroLetra = armarLetra(INTENTO[i], "grey");
        row.appendChild(cuadroLetra);
      }
    }
    GRID.appendChild(row);
    if (INTENTO === PALABRA) {
      BUTTON.disabled = true;
      terminar(
        '<h2>Has acertado!</h2><button class="btnReiniciar" onclick="location.reload()">Jugar de Nuevo</button>'
      );
    } else {
      cantIntentos--;
      document.getElementById("attempts-remaining").innerText = `Intentos restantes: ${cantIntentos}`;
    }

    if (cantIntentos === 0) {
      BUTTON.disabled = true;
      terminar(
        '<h2>Perdiste</h2><button class="btnReiniciar" onclick="location.reload()">Jugar de Nuevo</button>'
      );
    }
  }
});

function leerIntento() {
  return document.getElementById("guess-input").value.toUpperCase();
}

function terminar(mensaje) {
  document.getElementById("mensaje").innerHTML = mensaje;
}

function armarLetra(Letra, color) {
  let span = document.createElement("span");
  span.className = "letter";
  span.innerHTML = Letra;
  span.style.backgroundColor = color;
  return span;
}
