// the Web Audio Stuff
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const ch0 = document.querySelector("#ch0")
const ch1 = document.querySelector("#ch1")

// local media
// const source0 = audioCtx.createMediaElementSource(ch0);
// const source1 = audioCtx.createMediaElementSource(ch1);

// webmedia
const webSource0 = audioCtx.createBufferSource(ch0);
const webSource1 = audioCtx.createBufferSource(ch1);

const gain0 = audioCtx.createGain();
const gain1 = audioCtx.createGain();

let faderValue = 5;

webSource0.connect(gain0);
// source0.connect(gain0);
gain0.connect(audioCtx.destination);

webSource0.connect(gain0);
// source1.connect(gain1);
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

let trackList = [];

function getTop(){
  const url = "https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm"
  const xhr = $.getJSON(url);

  xhr.done(function(data) {
    if (xhr.status !== 200) {
      return;
    }
    console.log(data);
    console.log(data.tracks[0].previewURL);
    // for (let i = 0; )
    console.log($("#src0"));
    let source0 = $("<source>")
    source0.prop("src", data.tracks[0].previewURL);
    source0.prop("type", "audio/mpeg");
    $("#ch0").append(source0);
    let source1 = $("<source>")
    source1.prop("src", data.tracks[1].previewURL);
    source1.prop("type", "audio/mpeg");
    $("#ch1").append(source1);


  });
};
getTop();
