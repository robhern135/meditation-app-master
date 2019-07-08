"use strict";

var app = function app() {
  var song = document.querySelector(".song"),
    play = document.querySelector(".play"),
    outline = document.querySelector(".moving-outline circle"),
    video = document.querySelector(".vid-container video"); //sounds

  var sounds = document.querySelectorAll(".sound-picker button"); //Time display

  var timeDisplay = document.querySelector(".time-display");
  var timeSelect = document.querySelectorAll(".time-select button"); //get length of outline

  var outlineLength = outline.getTotalLength(); //Duration

  var fakeDuration = 600; //stroke dash array and stroke dash offset

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength; //Pick different sounds

  sounds.forEach(function(sound) {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  }); //Play Sound

  play.addEventListener("click", function() {
    checkPlaying(song);
  }); //select Sound

  timeSelect.forEach(function(option) {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = ""
        .concat(Math.floor(fakeDuration / 60), ": ")
        .concat(Math.floor(fakeDuration % 60));
    });
  }); //stop and start sounds

  var checkPlaying = function checkPlaying(song) {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  }; //animate time counter

  song.ontimeupdate = function() {
    var currentTime = song.currentTime,
      elapsed = fakeDuration - currentTime,
      seconds = Math.floor(elapsed % 60),
      minutes = Math.floor(elapsed / 60); //animate the circle

    var progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress; //animate the text

    timeDisplay.textContent = "".concat(minutes, ":").concat(seconds);

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
};

app();
