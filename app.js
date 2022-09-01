; (function () {
  var palabras = [
    "ALURA",
    "CASA",
    "PROGRAMAR",
    "FELICIDAD",
    "AMOR",
    "NOSTALGIA"
  ]
 
  //variable que almacena la configuración actual
  var juego = null
  //para no mostrar mas alertas
  var finalizado = false
  var $html = {
    cuerpo: document.getElementById("cuerpo"),
    acierto: document.querySelector(".acierto"),
    errado: document.querySelector(".errado")

  }
  function dibujo(juego) {
    //para cambiar la imagen a medida que transcurre el juego
    var $elem
    $elem = $html.cuerpo
    var estado = juego.estado
    if (estado === 8) {
      estado = juego.previo

    }
    $elem.src = "./img/0" + estado + ".png"

    //creación de las letras adivinadas
    var palabra = juego.palabra
    var acierto = juego.acierto
    $elem = $html.acierto
    //para eliminar elementos previos
    $elem.innerHTML = ""
    for (let letra of palabra) {
      let $span = document.createElement("span")
      let $txt = document.createTextNode("")
      if (acierto.indexOf(letra) >= 0) {
        $txt.nodeValue = letra
      };
      $span.setAttribute("class", "letraA")
      $span.appendChild($txt)
      $elem.appendChild($span)
    }
    //creación de letras erradas
    var errado = juego.errado
    $elem = $html.errado
    $elem.innerHTML = ""
    for (let letra of errado) {
      $span = document.createElement("span")
      $txt = document.createTextNode(letra)
      $span.setAttribute("class", "letraE")
      $span.appendChild($txt)
      $elem.appendChild($span)
    }

  }

  function adivinar(juego, letra) {
    var estado = juego.estado
    if (estado === 1 || estado === 8) {
      return

    }
    var acierto = juego.acierto
    var errado = juego.errado
    if (acierto.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
      return

    }
    var palabra = juego.palabra
    if (palabra.indexOf(letra) >= 0) {
      let ganado = true
      for (let l of palabra) {
        if (acierto.indexOf(l) < 0 && l != letra) {
          ganado = false
          juego.previo = juego.estado
          break
        }
      }
      if (ganado) {
        juego.estado = 8

      }
      acierto.push(letra)
    } else {
      juego.estado--
      errado.push(letra)
    }
  }

  window.onkeypress = function adivinarLetra(e) {
    var letra = e.key
    letra = letra.toUpperCase()
    if (/[^A-ZÑ]/.test(letra)) {
      return
    }
    adivinar(juego, letra)
    var estado = juego.estado
    if (estado === 8 && !finalizado) {
      setTimeout(alertGanado, 500)
      finalizado = true

    } else if (estado === 1 && !finalizado) {
      setTimeout(alertPerdido, 500)
      finalizado = true
    }
    dibujo(juego)
  }

  window.nuevoJuego = function nuevoJuego() {
    var palabra = palabraAleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.acierto = []
    juego.errado = []
    dibujo(juego)
    finalizado = false
  }

  function palabraAleatoria() {
    var index = ~~(Math.random() * palabras.length)
    return palabras[index]
  }
  function alertGanado() {
    alert("Felicidades...GANASTE!!!")
  }

  function alertPerdido() {
    alert("Ooppss...PERDISTE!! ")
  }
  nuevoJuego()
  console.log(juego)
}())