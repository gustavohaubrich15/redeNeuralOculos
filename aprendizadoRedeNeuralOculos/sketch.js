let mobilenet;
let video;
let label = '';
let comOculos;
let semOculos;
let treinar;


function modelReady(){
  console.log('model is ready');
}

function videoReady(){
  console.log('video is ready');
}

function treinando(loss){
  console.log(loss)
  if(loss== null){
    console.log('treinamento completo');
    classifier.save();
    classifier.classify(gotResults);
  }
  
}

function gotResults(error, results){
  
  if(error){
    console.error(error);
  } else {
    console.log(results)
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
  
  comOculos = createButton('comOculos');
  comOculos.mousePressed(function(){
    classifier.addImage('Você está usando óculos de proteção')
  });
  
  
   
  semOculos = createButton('semOculos');
  semOculos.mousePressed(function(){
    classifier.addImage('Você não está usando óculos de proteção')
  });
  
  treinar = createButton('treinar');
  treinar.mousePressed(function(){
    classifier.train(treinando);
  });
  
  
}



function draw(){
  background(0);
  image(video,0,0,320,240);
  fill(255);
  textSize(16);
  text(label,20, height - 10);
}



