status="";
objects=[];

function setup(){
canvas=createCanvas(480,380);
canvas.position(380,100);
canvas.center;

video=createCapture(VIDEO);
video.hide();
video.size(480,390)
}

function start(){
objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
thing=document.getElementById("object_name").value;
}

function modelLoaded() {
console.log("Model Loaded");
status=true;
}

function draw(){
image(video,0,0,480,380);
if(status!=""){
objectDetector.detect(video, gotResults);

for(h=0;h<objects.length;h++){
document.getElementById("status").innerHTML="Status:- Objects Detected";

fill("red");
percentage=floor(objects[h].confidence*100);
text(objects[h].label+" "+percentage+"%", objects[h].x, objects[h].y);
noFill();
stroke("red");
rect(objects[h].x, objects[h].y, objects[h].width, objects[h].height);
if(objects[h].label==thing){
video.stop();
objectDetector.detect(video, gotResults);
document.getElementById("object_result").innerHTML=thing+" Is Found";
synth=window.speechSynthesis;
utter=new SpeechSynthesisUtterance(thing+"FOUND!!!");
synth.speak(utter);
}
else{
document.getElementById("object_result").innerHTML=thing+" Not Found";
}
}
}
}

function gotResults(error,results) {
if(error){
console.log(error);
}
console.log(results);
objects=results;
}