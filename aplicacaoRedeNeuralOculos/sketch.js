let mobilenet;
let video;
let label = '';
let comOculos;
let semOculos;
let treinar;
var elemento = document.getElementById("button");

var resposta = document.getElementById("resposta");

var acesso = document.getElementById("acesso");


function modelReady() {
  console.log('model is ready');
  classifier.load('model.json', customModel)
}

function customModel() {
  console.log('model is loaded');
  classifier.classify(gotResults)
}

function videoReady() {
  console.log('video is ready');
}


function gotResults(error, results) {

  if (error) {
    console.error(error);
  } else {
    label = results[0].label;
    classifier.classify(gotResults)
  }

}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

}

elemento.addEventListener("click", function (event) {
  event.preventDefault();
  resposta.innerHTML = label

  if (label !== 'Você não está usando óculos de proteção') {
    acesso.style.backgroundColor = 'green'
    acesso.innerHTML = 'Acesso Liberado'
    setTimeout(() => { acesso.style.backgroundColor = 'red'
    acesso.innerHTML = 'Acesso negado'
    resposta.innerHTML = 'Clique no botão verificar para acessar a metalúrgica'
  }, 5000);
    
  }

});

function draw() {
  background(0);
  image(video, 0, 0, 320, 270);
  fill(255);
}



