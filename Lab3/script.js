let isRecording = false;
let dbSongs = [];

/**
 * Represents a mapping of keys to corresponding sounds.
 * @type {Object.<string, string>}
 */
const KeyToSound = {
  b: "b",
  c: "c",
  h: "h",
  k: "k",
  o: "o",
  r: "r",
  s: "s",
  t: "t",
  y: "y",
};

document.addEventListener("keypress", event => {
  if(KeyToSound.hasOwnProperty(event.key)){
    const soundElement = document.querySelector(`#${KeyToSound[event.key]}`);
    playSound(soundElement);
    if (isRecording) {
      dbSongs.push({
        time: Date.now(),
        sound: soundElement
      });
    }
  }
});

document.querySelector("#record").addEventListener("click", () => isRecording = true);
document.querySelector("#stop").addEventListener("click", () => isRecording = false);
document.querySelector("#play").addEventListener("click", playRecordedSounds);

function playSound(soundElement) {
  soundElement.currentTime = 0;
  soundElement.play();
}

/**
 * Plays the recorded sounds from the database.
 * 
 * @returns {Promise<void>} A promise that resolves when all the sounds have been played.
 */
async function playRecordedSounds() {
  if (!isRecording && dbSongs.length > 0) {
    for (const song of dbSongs) {
      console.log("timeout");
      await new Promise(resolve => setTimeout(resolve, song.time));
      playSound(song.sound);
    }
  }
}