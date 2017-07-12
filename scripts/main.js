// the Web Audio Stuff
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const ch0 = document.querySelector("#ch0");
const ch1 = document.querySelector("#ch1");

// local media
// const source0 = audioCtx.createMediaElementSource(ch0);
// const source1 = audioCtx.createMediaElementSource(ch1);

// webmedia
const webSource0 = audioCtx.createBufferSource(ch0);
const webSource1 = audioCtx.createBufferSource(ch1);

const gain0 = audioCtx.createGain();
const gain1 = audioCtx.createGain();
const tuna = new Tuna(audioCtx);

const delay = new tuna.Delay({
    feedback: 0.45,    //0 to 1+
    delayTime: 750,    //1 to 10000 milliseconds
    wetLevel: 0.85,    //0 to 1+
    dryLevel: 0.2,       //0 to 1+
    cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
});

// source0.connect(gain0);
webSource0.connect(delay);
// gain0input.connect(delay);
delay.connect(gain0);
gain0.connect(audioCtx.destination);

// source1.connect(gain1);
webSource1.connect(gain1);
gain1.connect(audioCtx.destination);


// INTERFACE BULLSHIT
let faderValue = 0.5;

function faderMath(faderValue){
  ch0.volume = Math.abs(faderValue - 1);
  ch1.volume = faderValue;
}

// event handlers
$("#xfader").on("input", function(event){
  faderValue = $("#xfader").val();
  faderMath(faderValue);
});

$("#delay").on("input", function(event){
  delayValue = $("#delay").val();
});


// THIS IS THE NON-OAUTH METHOD FOR 30SECOND SAMPLES FROM NAPSTER
function getTop(){
  const url = "https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm"
  const xhr = $.getJSON(url);

  xhr.done(function(data) {
    if (xhr.status !== 200) {
      return;
    }
    let source0 = $("<source>")
    source0.prop("src", data.tracks[1].previewURL);
    source0.prop("type", "audio/mpeg");
    $("#ch0").append(source0);
    let source1 = $("<source>")
    source1.prop("src", data.tracks[2].previewURL);
    source1.prop("type", "audio/mpeg");
    $("#ch1").append(source1);


  });
};
getTop();
