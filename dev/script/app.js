const app = () => {
  const song = document.querySelector(".song"),
    play = document.querySelector(".play"),
    outline = document.querySelector(".moving-outline circle"),
    video = document.querySelector(".vid-container video");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  //get length of outline
  const outlineLength = outline.getTotalLength();
  //Duration
  let fakeDuration = 600;

  //stroke dash array and stroke dash offset
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //Play Sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //select Sound
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //stop and start sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
  //animate time counter
  song.ontimeupdate = () => {
    let currentTime = song.currentTime,
      elapsed = fakeDuration - currentTime,
      seconds = Math.floor(elapsed % 60),
      minutes = Math.floor(elapsed / 60);
    //animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
};

app();
