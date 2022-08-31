var juego = {
    palabra: "ALURA",
    estado: 1,
    acierto: ["A", "L"],
    errado: ["B", "J", "K", "C"]

}
var $html = {
    cuerpo: document.getElementById("cuerpo"),
    acierto: document.querySelector(".acierto"),
    errado: document.querySelector(".errado")

}
function dibujo(juego) {
    //para cambiar la imagen a medida que transcurre el juego
    var $elem
    $elem = $html.cuerpo
    $elem.src = "./img/0" + juego.estado + ".png"

    //creación de las letras adivinadas
    var palabra = juego.palabra
    var acierto = juego.acierto
    $elem = $html.acierto
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
     for (let letra of errado){
        $span = document.createElement("span")
        $txt = document.createTextNode(letra)
        $span.setAttribute("class", "letraE")
        $span.appendChild($txt)
        $elem.appendChild($span)
     }

}

dibujo(juego)