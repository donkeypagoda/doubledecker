// event handlers

let mousePoint = 0;
let faderValue = 5;

$("#xfader").on("input", function(event){
  console.log($("#xfader").val());
})

// listener for the mouseover method
// $("#fader").on("mousemove", function(event){
//   console.log(event.offsetX);
//   mousePoint = event.clientX;
// });

// the Web Audio Stuff
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const ch0 = document.querySelector("#ch0")
const ch1 = document.querySelector("#ch1")

const source0 = audioCtx.createMediaElementSource(ch0);
const source1 = audioCtx.createMediaElementSource(ch1);

const gain0 = audioCtx.createGain();
const gain1 = audioCtx.createGain();
