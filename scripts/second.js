const audioCtx = new AudioContext();
const audio0 = document.querySelector("#ch0");
const audio1 = document.querySelector("#ch1");
const source0 = audioCtx.createMediaElementSource(audio0);
const source1 = audioCtx.createMediaElementSource(audio1);
const tuna0 = new Tuna(audioCtx);
const tuna1 = new Tuna(audioCtx);
let delay0 = new tuna0.Delay({
    feedback: 0.45,    //0 to 1+
    delayTime: 0,    //1 to 10000 milliseconds
    wetLevel: 0.0,    //0 to 1+
    dryLevel: 1.0,       //0 to 1+
    cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
});
let delay1 = new tuna1.Delay({
    feedback: 0.45,    //0 to 1+
    delayTime: 0,    //1 to 10000 milliseconds
    wetLevel: 0.0,    //0 to 1+
    dryLevel: 1.0,       //0 to 1+
    cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
});


var gainNode0 = audioCtx.createGain();
source0.connect(delay0);
delay0.connect(gainNode0);
gainNode0.connect(audioCtx.destination);

var gainNode1 = audioCtx.createGain();
source1.connect(delay1);
delay1.connect(gainNode1);
gainNode1.connect(audioCtx.destination);



let faderValue = 0;
let delayMixFaderValue = 0;
let delayTimeFaderValue = 0;

function faderMath(faderValue){
  gainNode0.gain.value = Math.abs(faderValue - 1);
  // ch0.volume = Math.abs(faderValue - 1);
  gainNode1.gain.value = faderValue;
  // ch1.volume = faderValue;
}

function delayMixFaderMath(delayMixFaderValue){
  delay0.dryLevel = Math.abs(delayMixFaderValue - 1);
  delay0.wetLevel = delayMixFaderValue;
  delay1.dryLevel = Math.abs(delayMixFaderValue - 1);
  delay1.wetLevel = delayMixFaderValue;
}

function delayTimeFaderMath(delayTimeFaderValue){
  delay0.delayTime = delayTimeFaderValue;
  delay1.delayTime = delayTimeFaderValue;
}

// event handlers
$("#xfader").on("input", function(event){
  faderValue = $("#xfader").val();
  faderMath(faderValue);
});

$("#delayMixFader").on("input", function(event){
  delayMixFaderValue = $("#delayMixFader").val();
  delayMixFaderMath(delayMixFaderValue);
});

$("#delayTimeFader").on("input", function(event){
  delayTimeFaderValue = $("#delayTimeFader").val();
  delayTimeFaderMath(delayTimeFaderValue);
});
