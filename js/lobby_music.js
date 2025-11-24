const music = new Audio('../assets/elements/untitled_3 v2.mp3');
music.loop = true;

const toggleBtn = document.getElementById('lobby_music_toggle');
const icons = toggleBtn.querySelectorAll('.music_button');


let musicState = JSON.parse(localStorage.getItem('musicState')) || {
    playing: false,
    currentTime: 0
};

console.log(musicState.playing)
music.currentTime = musicState.currentTime;


if (musicState.playing) {
    music.play().catch
};

toggleBtn.addEventListener('click', async function() {
    icons.forEach(icon => {
        icon.classList.toggle('active');
    });
    
    try {
        if (music.paused) {
            await music.play();
            console.log('Audio iniciado');
        } else {
            music.pause();
            console.log('Audio pausado');
        }
        saveAudioState();

    } catch (error) {
        console.log('Error con el audio:', error);

        musicState.playing = false;
        saveAudioState();

    }
});

function saveAudioState() {
    musicState = {
        playing: music.paused,
        currentTime: music.currentTime
    };
    localStorage.setItem('musicState', JSON.stringify(musicState));
}


setInterval(saveAudioState, 1000);
window.addEventListener('beforeunload', saveAudioState);