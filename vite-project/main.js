import './style.css'

/**
 * Existem 3 formas de declarar variáveis no JavaScript
 * - const
 * - let
 * - var
 *
 * const como o nome já diz é para constantes, ou seja, valores que não serão mais alterados no futuro
 *
 * let para variáveis que podem ter o valor alterado, mas a grande diferença entre o let e o var é que
 * o let define escopos de uso, você só pode usar uma variável declarada com let após declará-la
 * o let também determina escopos, se você declara a variável dentro de uma função, ela só
 * pode ser utilizada lá dentro (dentro das chaves funcao() {👉 só aqui dentro  👈} )
 *
 * diferente do var, que não controla nada disso...
 * var é a forma antiga, depreciada/legada e não é mais recomendado o seu uso
 *
 * isso porque usar var e não usar nada quase não faz diferença nenhuma, pois ele
 * controla nada... vc pode declarar a variável com var na última linha mesmo se estiver
 * usando a variável na primeira linha... vc pode declarar dentro de uma função e usar
 * fora da função... isso te dá liberdade pra criar bugs sem perceber
 * pode parecer bom a primeira vista, sensação de liberdade pq não mostra erro
 * mas com o tempo você percebe que o controle que let e const fazem é pro nosso bem
 */
var img = document.querySelector('img')
var video = document.querySelector('video')
var inputs = document.querySelectorAll('input')

// for (var i = 0; i !== inputs.length; ++i) {
//   inputs[i].onchange = handleInput
// }

const inputVideo = document.querySelector('#input-video')
const video2 = document.querySelector('#video2')

if (inputVideo && video2) {
  inputVideo.onchange = () => {
    const [file] = inputVideo.files ?? []
    if (file) {
      video2.src = URL.createObjectURL(file)
    }
  }
}

function handleInput(inputEvent) {
  console.log(inputEvent)
  var files = inputEvent.target.files
  if (files && files.length > 0) {
    var file = (window.file = files[0]) // global scope so visible in console
    console.log('file, files:', file, files)
    var isVideo = file.type.indexOf('video') !== -1
    var displayElement = isVideo ? video : img
    displayElement.classList.remove('hidden')
    try {
      var url = window.URL.createObjectURL(file)
      displayElement.src = url
      // window.URL.revokeObjectURL(url);
    } catch (event) {
      try {
        var fileReader = new FileReader()
        fileReader.onload = function (fileReaderEvent) {
          displayElement.src = fileReaderEvent.target.result
        }
        fileReader.readAsDataURL(file)
      } catch (error) {
        console.log(
          'Neither createObjectURL or FileReader are supported',
          error
        )
      }
    }
  }
}

document.getElementById('start-button').addEventListener('click', () => {
  const resultElement = document.getElementById('result')

  if (!window.EyeDropper) {
    resultElement.textContent =
      'Your browser does not support the EyeDropper API'
    return
  }

  const eyeDropper = new EyeDropper()

  eyeDropper
    .open()
    .then((result) => {
      resultElement.textContent = result.sRGBHex
      resultElement.style.backgroundColor = result.sRGBHex
    })
    .catch((e) => {
      resultElement.textContent = e
    })
})

// document.getElementById('botao').addEventListener('click', () => {
//   const canvas = document.querySelector('canvas')

//   // Optional frames per second argument.
//   const stream = canvas.captureStream(25)
//   const recordedChunks = []

//   console.log(stream)
//   const options = {mimeType: 'video/webm; codecs=vp9'}
//   const mediaRecorder = new MediaRecorder(stream, options)

//   mediaRecorder.ondataavailable = handleDataAvailable
//   mediaRecorder.start()

//   function handleDataAvailable(event) {
//     console.log('data-available')
//     if (event.data.size > 0) {
//       recordedChunks.push(event.data)
//       console.log(recordedChunks)
//       download()
//     } else {
//       // …
//     }
//   }
//   function download() {
//     const blob = new Blob(recordedChunks, {
//       type: 'video/webm',
//     })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     document.body.appendChild(a)
//     a.style = 'display: none'
//     a.href = url
//     a.download = 'test.webm'
//     a.click()
//     window.URL.revokeObjectURL(url)
//   }

//   // demo: to download after 9sec
//   setTimeout((event) => {
//     console.log('stopping')
//     mediaRecorder.stop()
//   }, 9000)
// })

var data = document.querySelector('#data')

function log(message) {
  data.innerHTML = message + '<br />' + data.innerHTML
}

// var target = document.querySelector('#observed')
// target.focus()

function mutationEventCallback(mutations) {
  mutations.forEach(function (mutation) {
    console.log(mutation)
    if (mutation.type === 'characterData') {
      log('Old value: ' + mutation.oldValue)
    } else if (mutation.type === 'childList') {
      log('Added: ' + mutation.addedNodes[0])
    }
  })
}

// var observer = new MutationObserver(mutationEventCallback)

// var config = {
//   characterData: true,
//   characterDataOldValue: true,
//   childList: true,
//   subtree: true, // see crbug.com/134322
// }

// // observer.observe(target, config)

var button = document.querySelector('button')
var input = document.querySelector('input')

const inputNotify = document.querySelector('#input-notify')



var notify = function () {
  
  var options = {
    body: inputNotify.value,
    icon: 'vite.svg',
    tag: 'foo',
    type: 'basic',
    renotify: true,
    requireInteraction: true
  }
  Notification.requestPermission().then(result => {
    if (result === 'granted') {
      var n = new Notification('Greetings from simpl.info!')

    }
    console.log(result);
  })
  // n.onclick = function () {
  //   console.log('Clicked.')
  // }
  // n.onclose = function () {
  //   console.log('Closed.')
  // }
  // n.onshow = function () {
  //   console.log('Shown.')
  // }
}

const buttonNotify = document.querySelector('#notify')

buttonNotify.onclick = function () {
  console.log('notify');
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
    notify()
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission
      }
      if (permission === 'granted') {
        notify()
      }
    })
  }
}
