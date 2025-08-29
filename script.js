// ---------------- AUDIO ELEMENT ----------------
let audioElement = new Audio();
let currentSong = null;
let isPlaying = false;

// Bottom controls
const playBtn = document.querySelector(".btn.play");
const progressBar = document.getElementById("Myprogressbar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// ---------------- PLAY SONG FUNCTION ----------------
function playSong(songSrc) {
  if (currentSong === songSrc && isPlaying) {
    audioElement.pause();
    isPlaying = false;
    playBtn.textContent = "▶";  // update bottom play button
  } else {
    audioElement.src = songSrc;
    audioElement.play();
    isPlaying = true;
    currentSong = songSrc;
    playBtn.textContent = "⏸";  // update bottom play button
  }
}

// ---------------- BOTTOM CONTROLS ----------------
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audioElement.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
  } else {
    audioElement.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
  }
});

// ---------------- PROGRESS BAR ----------------
audioElement.addEventListener("timeupdate", () => {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  progressBar.value = progress;

  // update timespan
  currentTimeEl.textContent = formatTime(audioElement.currentTime);
  durationEl.textContent = formatTime(audioElement.duration);
});

// Seek when dragging progress bar
progressBar.addEventListener("input", () => {
  audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});

// ---------------- HELPER: FORMAT TIME ----------------
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
