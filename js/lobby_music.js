const music = new Audio('../assets/untitled_3 v2.mp3');
music.loop = true;

const volumeSlider = document.getElementById('volumeSlider');
const toggleBtn = document.getElementById('lobby_music_toggle');
const icons = toggleBtn.querySelectorAll('.music_button');


let musicState = JSON.parse(localStorage.getItem('musicState')) || {
    playing: false,
    currentTime: 0,
    volume: 0.3
};

console.log('Is Playing:', musicState.playing)
music.currentTime = musicState.currentTime;
music.volume = musicState.volume;
volumeSlider.value = music.volume * 100;

volumeSlider.addEventListener('input', function() {
    music.volume = this.value / 100;
});

function updateButtonState() {
    const isPlaying = !music.paused;
    
    icons.forEach((icon, index) => {
        if ((isPlaying && index === 1) || (!isPlaying && index === 0)) {
            icon.classList.add('active');
            volumeSlider.classList.add('active');
        } else {
            icon.classList.remove('active');
            volumeSlider.classList.remove('active')
        }
    });


}

updateButtonState();

if (musicState.playing) {
    music.play().then(() => {
        updateButtonState();
    })
    .catch(error => {
        console.log('Autoplay bloqueado:', error);
        musicState.playing = false;
        saveAudioState();
        updateButtonState();
    });
};

toggleBtn.addEventListener('click', async function() {
    try {
        if (music.paused) {
            await music.play();
            console.log('Audio iniciado');
            updateButtonState();
        } else {
            music.pause();
            console.log('Audio pausado');
            updateButtonState();
        }
        saveAudioState();

    } catch (error) {
        console.log('Error con el audio:', error);

        musicState.playing = false;
        saveAudioState();
        updateButtonState();

    }
});

function saveAudioState() {
    musicState = {
        playing: !music.paused,
        currentTime: music.currentTime,
        volume: music.volume  
    };
    localStorage.setItem('musicState', JSON.stringify(musicState));
}


setInterval(saveAudioState, 1000);
window.addEventListener('beforeunload', saveAudioState);