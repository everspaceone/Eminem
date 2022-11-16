// go
const goBlock = document.querySelectorAll('.go-block')
const box = document.querySelector('.go-box')
const audio = document.querySelector('.audio');
const play = document.querySelector('.go__play');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const duration = document.querySelector('.go-duration');
const line = document.querySelector('.go-line');
const volume = document.querySelector('.go-volume input');
const volumeIcon = document.querySelector('.go__volume-icon');
const title = document.querySelector('.go-title');
const songs = ['Eminem - The Real Slim Shady','Eminem - Venom','Eminem - Lose Yourself','Eminem - Mockingbird','Eminem - Stan','Eminem - Without Me','Eminem - Till I Collapse','Eminem - Rap God','Eminem - The Monster','Eminem - Godzilla','Eminem - My Name Is',"Eminem - When I'm Gone",'Eminem - From the D 2 the LBC','Eminem - Not Afraid','Eminem - Killshot','Eminem - Forever','Eminem - The Way I Am','Eminem - Beautiful',"Eminem - You Don't Know",'Eminem - Superman'];

for (let i = 0; i < goBlock.length; i++) {
    goBlock[i].addEventListener('click', function () {
        for (let j = 0; j < goBlock.length; j++) {
            goBlock[j].classList.remove('active')
        }
        goBlock[i].classList.add('active')
    })
}
let songIndex = 0;
function loadAudio(song) {
    title.innerHTML = song
    audio.src = `music/${song}.mp3`
}
loadAudio(songs[songIndex])
play.addEventListener('click', () =>{
    const isplaying = box.classList.contains('play')
    if (isplaying) {
        pauseAudio()
    } else {
        playAudio()
    }
    playPause()
    endTime()
    startTime()
})
function playPause() {play.classList.toggle('active')}
function playAudio() {
    box.classList.add('play')
    audio.play()
}
function pauseAudio() {
    box.classList.remove('play')
    audio.pause()
}
function nextAudio() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadAudio(songs[songIndex])
    playAudio()      
}
next.addEventListener('click', nextAudio)
function prevAudio() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadAudio(songs[songIndex])
    playAudio()      
}
prev.addEventListener('click', prevAudio)
const volumeClass = ['mute','off','down','normal','up']
audio.onvolumechange = ()=>{
    for (let i = 0; i < volumeClass.length; i++) {volumeIcon.classList.remove(volumeClass[i])}
    let volume = audio.volume * 100
    if (volume.muted) {volumeIcon.classList.add('mute')
    }else if (volume > 75) {volumeIcon.classList.add('up')
    }else if (volume > 45) {volumeIcon.classList.add('normal')
    }else if (volume > 15) {volumeIcon.classList.add('down')
    }else if (volume > 0) {volumeIcon.classList.add('off')
    }else if (volume == 0) {volumeIcon.classList.add('mute')
    }
}
volumeIcon.addEventListener('click',function() {audio.muted ? audio.muted = false : audio.muted = true})
volume.addEventListener('click',function (e) {audio.volume = e.target.value / 100})
function startTime() {
    setInterval(() => {
        start.innerHTML = formatTime(audio.currentTime)
    }, 1000);
}
function endTime() {end.innerHTML = formatTime(audio.duration)}
function formatTime(num) {
    const noll = (time)=> time < 10 ? '0'+time : time
    let hour = Math.trunc(num / 3600)
    num -= (hour * 3600)
    let min = Math.trunc(num / 60)
    num -=(min * 60)
    num = Math.trunc(num)
    return `${noll(min)}:${noll(num)}`
}
duration.addEventListener('click',function (e) {
    console.log(duration.clientWidth);
    let audioTime = (e.offsetX / duration.clientWidth) * audio.duration
    audio.currentTime = audioTime
})
audio.addEventListener('timeupdate',function () {
    let lineWidth = (audio.currentTime / audio.duration)
    line.style.width = lineWidth * 100 + '%'
})

