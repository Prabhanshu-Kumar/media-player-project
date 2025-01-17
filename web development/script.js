console.log("welcome to SunteyRho");
// initialize the variables

let songIndex = 0;

let audioElement = new Audio("Song/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Kar Har Maidaan Fateh",
    filepath: "Song/1.mp3",
    coverPath: "covers/11.jpg",
    artist: "Artist 1" 
  },
  {
    songName: "Saiyan Bhailu",
    filepath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
    artist: "Artist 2" 
  },
  {
    songName: "Jiyara Ke Jari Rha",
    filepath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
    artist: "Artist 3" 
  },
  {
    songName: "Dilwa Me Sama Gaila",
    filepath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
    artist: "Artist 4" 
  },
  {
    songName: "Thana Diwana Ba",
    filepath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
    artist: "Artist 5" 
  },
  {
    songName: "Senura Lagave Aaja",
    filepath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
    artist: "Artist 6" 
  },
  {
    songName: "Dahej Me Du NAli Ke Dimand Kaile Bada",
    filepath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
    artist: "Artist 7" 
  },
  {
    songName: "Kamar Me December",
    filepath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
    artist: "Artist 8" 
  },
    
 
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// AudioElement.play();

// Function to update the song ifo display  

const updateSongInfo = (index) => {
  document.getElementById("currentSongName").innerText = songs[index].songName;
  document.getElementById("gif").src = songs[index].coverPath;  // Update the cover image
};

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    updatePlayIcon(songIndex, false);  
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    updatePlayIcon(songIndex, true);  
  }
});



// Function to update the play icon for the current song
const updatePlayIcon = (index, isPaused) => {
  const songItems = document.getElementsByClassName("songItemPlay");
  if (isPaused) {
      songItems[index].classList.remove("fa-circle-pause");
      songItems[index].classList.add("fa-circle-play");
  } else {
      songItems[index].classList.remove("fa-circle-play");
      songItems[index].classList.add("fa-circle-pause");
  }
};


// Listen to events
audioElement.addEventListener("timeupdate", () => {
  // update seekbar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

updateSongInfo(songIndex);

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element, i) => {
    element.addEventListener("click", (e) => {
      console.log(e.target);
      makeAllPlays();
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = songs[i].filepath;
      audioElement.currentTime = 0;
      audioElement.play();

      updateSongInfo(i);  

      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;

      updatePlayIcon(i, false);  
      songIndex = i;  
    });
  }
);

// Forward button functionality
document.querySelector('.fa-forward-fast').addEventListener('click', ()=>{
  if(songIndex >= songs.length-1){
      songIndex = 0;
  }
  else{
      songIndex += 1;
  }
  audioElement.src = songs[songIndex].filepath;
  audioElement.currentTime = 0;
  audioElement.play();

  // Update the song info
  updateSongInfo(songIndex);

  makeAllPlays();  

  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  gif.style.opacity = 1;

  updatePlayIcon(songIndex, false);  
});

// Backward button functionality
document.querySelector('.fa-backward-fast').addEventListener('click', ()=>{
  if(songIndex <= 0){
      songIndex = songs.length - 1;
  }
  else{
      songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filepath;
  audioElement.currentTime = 0;
  audioElement.play();

  // Update the song info
  updateSongInfo(songIndex);

  makeAllPlays();  

  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
  gif.style.opacity = 1;

  updatePlayIcon(songIndex, false);  
});

