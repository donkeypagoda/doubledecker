// the Web Audio Stuff
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// webmedia
const webSource0 = audioCtx.createBufferSource(ch0);
const webSource1 = audioCtx.createBufferSource(ch1);

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
    // console.log(data);

    // making lists of track choices
    let list0 = $("<ul>");
    for (let i = 0; i < data.tracks.length; i++){
      let listItem0 = $("<li>").text(data.tracks[i].name);
      let track0 = $("<source>").prop("src", data.tracks[i].previewURL);
      listItem0.append(track0);
      list0.append(listItem0);
      $("#leftList").append(list0);
    }

    let list1 = $("<ul>");
    for (let j = 0; j < data.tracks.length; j++){
      let listItem1 = $("<li>").text(data.tracks[j].name);
      let track1 = $("<source>").prop("src", data.tracks[j].previewURL);
      listItem1.append(track1);
      list1.append(listItem1);
      $("#rightList").append(list1);
    }

  });
}
getTop();
