

console.log("welcome to js");
//variables
let songindex = 0;
let audioElement = new Audio('./song/1.mp3');
let masterplay = document.getElementById('masterplay');
let songitemplay = document.getElementsByClassName('songitemplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songname: "Neffex", filepath: "./song/1.mp3", coverpath: "./cover/cover1.jpg" },
    { songname: "Rxm-look at me", filepath: "./song/2.mp3", coverpath: "./cover/cover2.jpg" },
    { songname: "Raude-high for a minute", filepath: "./song/3.mp3", coverpath: "./cover/cover3.jpg" },
    { songname: "Drowning-Bloom", filepath: "./song/4.mp3", coverpath: "./cover/cover4.jpg" },
    { songname: "Dreamer-Alan walker- B and H remix", filepath: "./song/5.mp3", coverpath: "./cover/cover5.jpg" },
    { songname: "immortal-citywlkr-ft joshua", filepath: "./song/6.mp3", coverpath: "./cover/cover6.jpg" },
    { songname: "Overdrive ftellersie , millbrook", filepath: "./song/7.mp3", coverpath: "./cover/cover7.jpg" },
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})
// audioElement.play();
//play/pause
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        
        audioElement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause')
        gif.style.opacity = 1;
        
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play')
        gif.style.opacity = 0;
       
    }
})
//listen events

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {

    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0){
        console.log(e.target);
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `song/${songindex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        mastersongname.innerText = songs[songindex-1].songname;
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play')
            gif.style.opacity = 0;
           
        }

    })

})

document.getElementById('next').addEventListener('click', () => {
    if (songindex > 7) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.src = `song/${songindex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    mastersongname.innerText = songs[songindex-1].songname;
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = `song/${songindex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    mastersongname.innerText = songs[songindex-1].songname;
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})
let currentime = document.getElementById('currenttime')
let endtime = document.getElementById('endtime')

audioElement.addEventListener('timeupdate',()=>{
    let musiccurr = audioElement.currentTime;
    let musicdur = audioElement.duration;
    let min1 = Math.floor(musicdur/60);
    let sec1 = Math.floor(musicdur%60);
    // console.log(min1);
    if(sec1 < 10){
        sec1 = `0${sec1}`;
    }
    endtime.innerText =`${min1}:${sec1}`;

    let min2 = Math.floor(musiccurr/60);
    let sec2 = Math.floor(musiccurr%60);
    if(sec2 < 10){
        sec2 = `0${sec2}`;
    }
    currentime.innerText = `${min2}:${sec2}`;
})
let volumebutton = document.getElementById('volumebutton');
let vol = document.getElementById('vol');

vol.addEventListener('change',()=>{

    if(vol.value == 0){

        volumebutton.classList.remove('fa-volume-high');
        volumebutton.classList.remove('fa-volume-low');
        volumebutton.classList.add('fa-volume-off');
    }
    if(vol.value >0){
        volumebutton.classList.remove('fa-volume-high');
        volumebutton.classList.add('fa-volume-low');
        volumebutton.classList.remove('fa-volume-off');
    }
    if(vol.value >50){
        volumebutton.classList.add('fa-volume-high');
        volumebutton.classList.remove('fa-volume-low');
        volumebutton.classList.remove('fa-volume-off');
    }
    let vol_a = vol.value;
    audioElement.volume = vol_a/100;
})


//upcoming fixes

// songitemplay.addEventListener('click', () => {
//     if (audioElement.paused || audioElement.currentTime <= 0) {
//         audioElement.play();
//         songitemplay.classList.remove('fa-play');
//         songitemplay.classList.add('fa-pause')
//         gif.style.opacity = 1;
//     }
//     else {
//         audioElement.pause();
//         songitemplay.classList.remove('fa-pause');
//         songitemplay.classList.add('fa-play')
//         gif.style.opacity = 0;
//     }
// })