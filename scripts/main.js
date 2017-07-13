
const audioCtx = new AudioContext();
const ch0 = document.querySelector("#ch0");
const ch1 = document.querySelector("#ch1");





// INTERFACE BULLSHIT
let faderValue = 0;
let delayFaderValue = 0;

function faderMath(faderValue){
  ch0.volume = Math.abs(faderValue - 1);
  ch1.volume = faderValue;
}

// event handlers
$("#xfader").on("input", function(event){
  faderValue = $("#xfader").val();
  faderMath(faderValue);
});

let leftPick = "";
let sourceTag0 = $("<source>");
$("#leftList").on("click", function(event){
  leftPick = $(event.target).find("source").attr("src");
  // console.log(leftPick);
  changeAudio0(leftPick);
});

function changeAudio0(sourceUrl) {
    let audio = $("#ch0");
    audio.empty();
    let sourceTag0 = $("<source>");
    sourceTag0.prop("src", sourceUrl)
    sourceTag0.prop("type", "audio/mpeg");
    sourceTag0.prop("id", "src0");
    $("#ch0").append(sourceTag0);
    audio[0].pause();
    audio[0].load();
    audio[0].oncanplaythrough = audio[0].play();
}

let rightPick = "";
let sourceTag1 = $("<source>");
$("#rightList").on("click", function(event){
  rightPick = $(event.target).find("source").attr("src");
  // console.log(rightPick);
  changeAudio1(rightPick);
});

function changeAudio1(sourceUrl) {
    let audio = $("#ch1");
    audio.empty();
    let sourceTag1 = $("<source>");
    sourceTag1.prop("src", sourceUrl);
    sourceTag1.prop("type", "audio/mpeg");
    sourceTag1.prop("id", "src1");
    $("#ch1").append(sourceTag1);
    audio[0].pause();
    audio[0].load();
    audio[0].oncanplaythrough = audio[0].play();
}



// THIS IS THE NON-OAUTH METHOD FOR 30SECOND SAMPLES FROM NAPSTER
function getTopTracks(){
  const url = "https://api.napster.com/v2.1/tracks/top?apikey=" + coniferNapsterKey;
  const xhr = $.getJSON(url);

  xhr.done(function(data) {
    if (xhr.status !== 200) {
      return;
    }

    let sourceTag0 = $("<source>")
    sourceTag0.prop("src",data.tracks[1].previewURL)
    sourceTag0.prop("type", "audio/mpeg");
    sourceTag0.prop("id", "src0");
    $("#ch0").append(sourceTag0);

    let sourceTag1 = $("<source>")
    sourceTag1.prop("src", data.tracks[2].previewURL)
    sourceTag1.prop("type", "audio/mpeg");
    sourceTag1.prop("id", "src1");
    $("#ch1").append(sourceTag1);


    // making lists of track choices0
    let list0 = $("<ul>");
    for (let i = 0; i < data.tracks.length; i++){
      let butty0 = $("<button>");
      let listItem0 = $("<li>").text(data.tracks[i].name);
      let track0 = $("<source>").prop("src", data.tracks[i].previewURL);
      listItem0.append(track0);
      butty0.append(listItem0);
      list0.append(butty0);
      $("#leftList").append(list0);
    }
    // making lists of track choices1
    let list1 = $("<ul>");
    for (let j = 0; j < data.tracks.length; j++){
      let butty1 = $("<button>");
      let listItem1 = $("<li>").text(data.tracks[j].name);
      let track1 = $("<source>").prop("src", data.tracks[j].previewURL);
      listItem1.append(track1);
      butty1.append(listItem1);
      list1.append(butty1);
      $("#rightList").append(list1);
    }

  });
}
getTopTracks();
