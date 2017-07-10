// the Web Audio Stuff
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const ch0 = document.querySelector("#ch0")
const ch1 = document.querySelector("#ch1")

const source0 = audioCtx.createMediaElementSource(ch0);
const source1 = audioCtx.createMediaElementSource(ch1);

const gain0 = audioCtx.createGain();
const gain1 = audioCtx.createGain();

let mousePoint = 0;
let faderValue = 5;

function faderMath(faderValue){
  let gainL = Math.abs(faderValue - 10);
  console.log(gainL);
  let gainR = faderValue;
  console.log(gainR);
}

// event handlers
$("#xfader").on("input", function(event){
  faderValue = $("#xfader").val();
  // console.log(faderValue);
  faderMath(faderValue);
})

// listener for the mouseover method
// $("#fader").on("mousemove", function(event){
//   console.log(event.offsetX);
//   mousePoint = event.clientX;
// });
