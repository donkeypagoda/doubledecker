// the Web Audio Stuff
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const ch0 = document.querySelector("#ch0")
const ch1 = document.querySelector("#ch1")

const source0 = audioCtx.createMediaElementSource(ch0);
const source1 = audioCtx.createMediaElementSource(ch1);

const gain0 = audioCtx.createGain();
const gain1 = audioCtx.createGain();

let faderValue = 5;

source0.connect(gain0);
gain0.connect(audioCtx.destination);

source1.connect(gain1);
gain1.connect(audioCtx.destination);


function faderMath(faderValue){
  ch0.volume = Math.abs(faderValue - 1);
  ch1.volume = faderValue;
}

// event handlers
$("#xfader").on("input", function(event){
  faderValue = $("#xfader").val();
  faderMath(faderValue);
});


Napster.init({
  consumerKey: "NjFiOWQ5ODktYmI5OS00YzlmLWIzYmMtMTM4ZWQ5ODIyMzJk"
});
console.log("doggie");
