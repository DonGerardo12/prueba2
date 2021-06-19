const urlParams = new URLSearchParams(window.location.search)
const level = urlParams.get('levels')
const exercise = urlParams.get('exercise')


let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let nivel = niveles.filter( el => el.uid == level )[0]
let play = nivel.ejercicios.filter( i => i.id == exercise )[0].play
let pos = 0

function init() {
  drawLetter()
  drawFinger()
}

function drawLetter(){
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.font = '80px Open Sans'
  context.fillStyle = '#000000'
  context.fillText( play[pos], (canvas.width - 80) / 2, 100 )
}

function drawFinger(){
  if( typeof finger[ play[pos] ] == 'string' ){
    let fingerAttributes = color_finger[ finger[ play[pos] ] ]
    
    context.fillStyle = fingerAttributes.color
    context.fillRect( fingerAttributes.posx, fingerAttributes.posy, fingerAttributes.w, fingerAttributes.h )
  }else{
    finger[ play[pos] ].forEach( f => {
      let fingerAttributes = color_finger[ f ]
    
      context.fillStyle = fingerAttributes.color
      context.fillRect( fingerAttributes.posx, fingerAttributes.posy, fingerAttributes.w, fingerAttributes.h )
    } )
    
  }
}

window.document.addEventListener( 'keydown', function( e ) {
  let arrayLetter = e.code.split('Key')
  let letter = arrayLetter.length == 2 ? arrayLetter[1].toLowerCase() : arrayLetter[0].toLowerCase()

  if( play[pos] == letter ){
    pos++
    drawLetter()
    drawFinger()
  }else{
    console.log( `Tecla incorrecta, presionaste ${letter}` )
  }
} )


init()